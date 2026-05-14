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
const TEST_REGNO = "20251BAE0001";
const DELAY_MS = 500;
const OUTPUT_FILE = "src/app/coe_audit_pubapi_results.json";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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

async function fetchEndpoint(action, token, params = {}) {
    const url = `${BASE_URL}?a=${action}&univcode=${UNIV_CODE}`;
    
    // The backend expects an array of objects
    const postData = JSON.stringify([params]);

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData),
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    };

    return new Promise((resolve) => {
        const req = https.request(url, options, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ action, params, status: "SUCCESS", data: json });
                } catch (e) {
                    resolve({ action, params, status: "FAILURE", error: "Not JSON", raw: data.substring(0, 500) });
                }
            });
        });
        
        req.on('error', (err) => {
            resolve({ action, params, status: "ERROR", error: err.message });
        });

        req.write(postData);
        req.end();
    });
}

async function runAudit() {
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
    const metadata = {
        regno: TEST_REGNO,
        subject: "PSY1001",
        school: "SCHOOL OF LIBERAL ARTS AND SCIENCES",
        term: "S1",
        programLevel: "UG",
        batchStartYear: "2025",
        assessmentType: "3. End-Term Exam",
        assessmentInstance: "End-Term Exam"
    };

    console.log(`Starting POST array payload audit of ${ACTIONS.length} pubapi endpoints...`);

    for (let i = 0; i < ACTIONS.length; i++) {
        const action = ACTIONS[i];
        process.stdout.write(`[${i + 1}/${ACTIONS.length}] Auditing: ${action}... `);
        
        // Pass metadata as the object to be array-wrapped
        const result = await fetchEndpoint(action, token, metadata);

        results.push(result);
        console.log(result.status);

        if ((i + 1) % 5 === 0) {
            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
        }

        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`\nAudit complete! Results saved directly to ${OUTPUT_FILE}`);
}

runAudit();
