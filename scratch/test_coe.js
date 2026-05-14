const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const BASE_URL = "https://coe.pgi-intraconnect.in/pubapi/app.php";

async function runTest() {
    const tokenUrl = `${BASE_URL}?a=genrateTokennew&univcode=064&regno=20251BAE0001`;
    const token = await new Promise((resolve) => {
        https.get(tokenUrl, (res) => {
            let data = ''; res.on('data', d => data += d);
            res.on('end', () => resolve(JSON.parse(data).data.token));
        });
    });

    const payloadArray = JSON.stringify([
        {
            regno: "20251BAE0001",
            subject: "PSY1001",
            school: "SCHOOL OF LIBERAL ARTS AND SCIENCES",
            term: "S1",
            programLevel: "UG"
        }
    ]);

    await new Promise((resolve) => {
        const req = https.request(`${BASE_URL}?a=getStudentProfile&univcode=064`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Length': payloadArray.length 
            }
        }, (res) => {
            let data = ''; res.on('data', d => data += d);
            res.on('end', () => { console.log("Response array:", data.substring(0, 500)); resolve(); });
        });
        req.write(payloadArray); req.end();
    });
}
runTest();
