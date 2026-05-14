const fs = require('fs');
const https = require('https');

const ACTIONS = [
    "loadControlDet", "saveFeedback", "getFeedbackDesc", "getFeedbackOpen", "getQpCodeOnBoardDeggrp", 
    "getBoardOnDeggrp", "getYearMode", "getQpCodeValDetails", "saveScriptReceivedata", "getYearModeWithDeggrp", 
    "getScriptRecieveData", "getQpReceivedData", "signinotpteach", "signin", "signinlogintype", 
    "signinnewteach", "getvalscripts", "getteachperinfo", "getteachvalqpcode", "getteachworkdone", 
    "rejectbatch", "getallotevalsate", "saveteachdetdashboard", "getreviewerteamdetails", "getreviewerteachval", 
    "getevalimage", "getValAnswerBookLet", "getevalpartsstate", "checkToken", "getUnivDetails", 
    "validateTeacherCode", "sendOtpTeacherRegistration", "teacherRegistration", "getYearModeOnQpcode", "checkScriptRecieve", 
    "uploadScripts", "getuploadedScriptsDet", "loadUploadedQpcode", "deleteUploadedScripts", "adminsignin", 
    "menuinfo", "get-deggrp-stat", "get-deggrp", "get-panelboard", "get-val-cntr", 
    "save-val-cntr", "getTdvsMasmenu", "get-teach-det", "get-create-teach-college", "save-createteach", 
    "getDashboardActivity", "tdvs_getQpNotStartedReprot", "getboarddeggrp", "updateBoard", "viewBoardDetails", 
    "delateBoard", "getTeachInfoData", "directSignInAdmin", "get-answerbooklet", "get-panelqpcode", 
    "get_deggrpval", "get-valstats-board", "get-valMarks-deg", "get-qpstats", "get-dayscripttab", 
    "saveCreateExam", "viewDegreeGroupsData", "getDeggrpData", "getDegree", "getBoard", 
    "saveSubjectDetails", "viewSubjectDetails", "getSubjectDetail", "get-workdone-board", "get-workdone-QPcode", 
    "push-workdone", "get-view-masrev", "purge-scripts", "get-upd-qpcodes", "get-upd-det-scripts", 
    "del-script", "del-reject-script", "getSubjectMappingDetails", "saveSubjectMappingDetails", "val-cntr", 
    "getNAMismatchData", "get-create-teach-details", "get-board-option", "getQpTemplate", "get-tempqp-data", 
    "save-tempqp-det", "get-qppattern-details", "check-tempcode", "saveparthead", "save-enable-teach", 
    "get-direct-load", "get-year-examtype", "get-qp-filedata", "pattern-check", "save-directmaserv", 
    "del-view-panel", "view-qp-scheme", "allot-additional-batch", "get-panel", "del-panel", 
    "get-panelrev", "get-paneltable", "save-paneltab", "get-dashboard-det", "get-valno", 
    "download-front-Sheet", "get-qppaneltable", "save-qppaneltab", "save-qp-scheme-temp", "get-eval-marks-state", 
    "getNaDummyNo", "getEvalNaPartsState", "tdvs_dashboard", "saveEvaluationNaMarks", "getEvalNaMarks", 
    "saveEvaluationMarks", "updtshowboard", "getboardtable", "deleteBoardRow", "tdvs_getDeviationCount", 
    "tdvs_createDevaition", "tdvs_getDeggrpData", "createExamTab", "tdvs_getDegrees", "tdvs_saveSubjectCreation", 
    "tdvs_getSubjectDetails", "tdvs_deleteSubCreation", "tdvs_getDegree", "tdvs_getSubjectDet", "tdvs_saveSubDet", 
    "tdvs_verify_qp_pattern", "tdvs_getCenters", "tdvs_getValuationCenter", "tdvs_saveCenterForTeacher", "tdvs_getTeacher", 
    "tdvs_get_mail_data", "saveCreateUser", "getTdvsUserMenu", "getMenuAndTeachDet", "change_tdvs_user_pwd", 
    "tdvs_getBatchRejectScripts", "tdvs_viewDetailedData", "tdvs_saveBatchReject", "tdvs_changePwd", "getDegrGrp", 
    "scriptBoardDet", "qpRecjDet", "getRejScrCheck", "uploadNewScript", "restRejScr", 
    "getRVPCAnsView", "tdvsValRecalucate", "getTDVSBoardDetails", "getTdvsQPDetails", "getTDVSQpPdfDet", 
    "getTDVSStudentDeatils", "saveTDVSDecoding", "getTdvsAnsBookDet", "getTDVSRegCode", "updateRegCode", 
    "saveMissedRegcode", "getTotalDecodedScripts", "getNameRegNo", "saveUpdatedRegNo", "saveUpdatedRegAnsNo", 
    "getQPVerificationDet", "verifyRegcode", "decodingData", "saveVerifyDecode", "getDecodeDiff", 
    "getTdvsCountData", "releaseDecodeData", "upldUUCMSFile", "getUUCMSDeggr", "getQPCodeVal", 
    "getUUCMSQPData", "getQPVrfyData", "saveUUCMSVrfyData", "uucmsPacketNO", "saveNewRegNo", 
    "tdvs_getTeacherValDet", "getValuationCount", "getValuationCountDetails", "getPhotoCopyDet", "getRegcodeDetails", 
    "tdvs_getTeachDet", "tdvs_getYearModeDet", "tdvs_getDeggreeGroup", "getTdvsYearModeOnQpcode", "tdvs_getTeacherCode", 
    "TDVS_getTeacherValuationDetails", "loaddeggrpexamcentre", "loaddeggrpnotif", "loadsubjectexamcentre", "loadallexamcentre", 
    "loadalldate", "loadtableexamcentre", "loadmastersdeg", "loadsubrptsem", "getVerfyData", 
    "saveVerifyNotifi", "loadtdvssubject", "loadtdvssubj", "loadtdvsdate", "loadtdvsstats", 
    "loadqpdetails", "loadalldata", "loadtdvsdegree", "loadQPDet", "totUploadAnsBookDet", 
    "getYearModeData", "getScriptUpdCount", "tdvs_yearmode", "tdvs_getPergeValCount", "tdvs_saveTdvsPergeVal", 
    "tdvs_getDevDet", "tdvs_deleteTemplateCode", "Generate_Bill_New", "getTdvsBills", "tdvs_getBillDetails", 
    "tdvs_resetBill", "tdvsTeachersList", "getQpStatsReport", "tdvsmarkslist", "generateworkdonereport", 
    "generatebill", "generatebill_new", "generatebill_acu", "generatetadabill", "generatebillDwonload", 
    "revaluationReport", "tdvsQpPatranTest", "qppatternreport", "getPanelViewReport", "digitalPhotoCopyDownload", 
    "getTDVSDecodeReport", "getTDVSDecodeReportExcel", "getTDVSValuationStatusReport", "tdvs_deviationdet", "tdvs_TeachValReport", 
    "TDVS_getTeacherValuationDetailsReport", "tdvs_studentMarksReport", "tdvs_studentMarksReportNew", "tdvs_studentMarksReportCOWise", "getPanelViewReportExcel", 
    "reviewercodeData", "submitReview", "getAnsBookImagesTrans", "getTemplateReference", "getTemplateCodesData", 
    "getScannedScriptsForDecoding", "generateStudentValdet", "getQpcodeForReportDet", "getDecodingCountQpwise", "checkScriptsForDecoding", 
    "getDecodeImage", "saveDecodedData", "getModerationInstruction", "getevalimagevips", "getEvalState", 
    "getQpEvalDet", "saveevalreject", "getYearmodeforfqpcode", "onscreenMarksingVal", "getQpDeggrp", 
    "getTeahcerData", "getQpDegree", "getTeachValDet", "saveTeachValDet", "getTeachBills", 
    "GenerateBillReport", "getStudentName", "releaseDecodeQp", "checkIsNa", "coentry_view", 
    "coentry_save", "getTeacher", "getTeacherdata", "tdvs_getSem", "getDegreeList", 
    "getSubjectByDegree", "getCoEntryTable", "getCOList", "saveCoEntry", "getModerationData", "getQpOnBoard"
];

const BASE_URL = "https://universitysolutions.in/tdvs-php/app.php";
const UNIV_CODE = "064";
const DELAY_MS = 500;
const OUTPUT_FILE = "audit_results.json";

// Bypass SSL verification for unstable university servers
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

async function fetchEndpoint(action) {
    const url = `${BASE_URL}?a=${action}&univcode=${UNIV_CODE}`;
    return new Promise((resolve) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                try {
                    const json = JSON.parse(data);
                    resolve({ action, status: "SUCCESS", data: json });
                } catch (e) {
                    // If not JSON, save the raw text/error
                    resolve({ action, status: "FAILURE", error: "Not JSON", raw: data.substring(0, 500) });
                }
            });
        }).on('error', (err) => {
            resolve({ action, status: "ERROR", error: err.message });
        });
    });
}

async function runAudit() {
    const results = [];
    console.log(`Starting audit of ${ACTIONS.length} endpoints...`);

    for (let i = 0; i < ACTIONS.length; i++) {
        const action = ACTIONS[i];
        process.stdout.write(`[${i + 1}/${ACTIONS.length}] Auditing: ${action}... `);
        
        const result = await fetchEndpoint(action);
        results.push(result);
        
        console.log(result.status);

        // Save progress every 10 requests
        if ((i + 1) % 10 === 0) {
            fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
        }

        // Delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2));
    console.log(`\nAudit complete! Results saved to ${OUTPUT_FILE}`);
}

runAudit();
