const actions = [
    "checkTeacherAssigned", "checkStudentBarcodeDetails", "saveAnswerBookletDetails", "getRoomDetails", 
    "getBarcodeScannedDetails", "saveMPDetails", "deleteScannedBarcode", "getSessionForBarcodeScan", 
    "getAbsentEntryDetails", "saveAbsentDetails", "loadControlDet", "saveFeedback", "getFeedbackDesc", 
    "getFeedbackOpen", "getQpCodeOnBoardDeggrp", "getBoardOnDeggrp", "getYearMode", "getQpCodeValDetails", 
    "saveScriptReceivedata", "getYearModeWithDeggrp", "getScriptRecieveData", "getQpReceivedData", 
    "signinotpteach", "signin", "signinlogintype", "signinnewteach", "getvalscripts", "getteachperinfo", 
    "getteachvalqpcode", "getteachworkdone", "rejectbatch", "getallotevalsate", "saveteachdetdashboard", 
    "getreviewerteamdetails", "getreviewerteachval", "getevalimage", "getValAnswerBookLet", "getevalpartsstate", 
    "checkToken", "getUnivDetails", "validateTeacherCode", "sendOtpTeacherRegistration", "teacherRegistration", 
    "getYearModeOnQpcode", "checkScriptRecieve", "uploadScripts", "getuploadedScriptsDet", "loadUploadedQpcode", 
    "deleteUploadedScripts", "adminsignin", "menuinfo", "get-deggrp-stat", "get-deggrp", "get-panelboard", 
    "get-val-cntr", "save-val-cntr", "getTdvsMasmenu", "get-teach-det", "get-create-teach-college", 
    "save-createteach", "getDashboardActivity", "tdvs_getQpNotStartedReprot", "getboarddeggrp", "updateBoard", 
    "viewBoardDetails", "delateBoard", "getTeachInfoData", "directSignInAdmin", "get-answerbooklet", 
    "get-panelqpcode", "get_deggrpval", "get-valstats-board", "get-qpstats", "get-dayscripttab", "saveCreateExam", 
    "viewDegreeGroupsData", "getDeggrpData", "getDegree", "getBoard", "saveSubjectDetails", "viewSubjectDetails", 
    "getSubjectDetail", "get-workdone-board", "get-workdone-QPcode", "push-workdone", "get-view-masrev", 
    "purge-scripts", "get-upd-qpcodes", "get-upd-det-scripts", "del-script", "del-reject-script", 
    "getSubjectMappingDetails", "saveSubjectMappingDetails", "val-cntr", "getNAMismatchData", 
    "get-create-teach-details", "get-board-option", "getQpTemplate", "get-tempqp-data", "save-tempqp-det", 
    "get-qppattern-details", "check-tempcode", "saveparthead", "save-enable-teach", "get-direct-load", 
    "get-year-examtype", "get-qp-filedata", "pattern-check", "save-directmaserv", "savedirectmail", 
    "del-view-panel", "view-qp-scheme", "allot-additional-batch", "get-panel", "del-panel", "get-panelrev", 
    "get-paneltable", "save-paneltab", "get-dashboard-det", "get-valno", "download-front-Sheet", 
    "get-qppaneltable", "save-qppaneltab", "save-qp-scheme-temp", "get-eval-marks-state", "getNaDummyNo", 
    "getEvalNaPartsState", "tdvs_dashboard", "saveEvaluationNaMarks", "getEvalNaMarks", "updtshowboard", 
    "getboardtable", "deleteBoardRow", "tdvs_getDeviationCount", "tdvs_createDevaition", "tdvs_getDeggrpData", 
    "createExamTab", "tdvs_getDegrees", "tdvs_saveSubjectCreation", "tdvs_getSubjectDetails", 
    "tdvs_deleteSubCreation", "tdvs_getDegree", "tdvs_getSubjectDet", "tdvs_saveSubDet", 
    "tdvs_verify_qp_pattern", "tdvs_getCenters", "tdvs_getValuationCenter", "tdvs_saveCenterForTeacher", 
    "tdvs_getTeacher", "tdvs_get_mail_data", "saveCreateUser", "getTdvsUserMenu", "getMenuAndTeachDet", 
    "change_tdvs_user_pwd", "tdvs_getBatchRejectScripts", "tdvs_viewDetailedData", "tdvs_saveBatchReject", 
    "tdvs_changePwd", "getDegrGrp", "scriptBoardDet", "qpRecjDet", "getRejScrCheck", "uploadNewScript", 
    "restRejScr", "getTDVSBoardDetails", "getTdvsQPDetails", "getTDVSQpPdfDet", "getTDVSStudentDeatils", 
    "saveTDVSDecoding", "getTdvsAnsBookDet", "getTDVSRegCode", "updateRegCode", "saveMissedRegcode", 
    "getTotalDecodedScripts", "getNameRegNo", "saveUpdatedRegNo", "saveUpdatedRegNo", "saveUpdatedRegAnsNo", 
    "getQPVerificationDet", "verifyRegcode", "decodingData", "saveVerifyDecode", "getDecodeDiff", 
    "getTdvsCountData", "releaseDecodeData", "upldUUCMSFile", "getUUCMSDeggr", "getQPCodeVal", 
    "getUUCMSQPData", "getQPVrfyData", "saveUUCMSVrfyData", "uucmsPacketNO", "saveNewRegNo", 
    "tdvs_getTeacherValDet", "getValuationCount", "getValuationCountDetails", "getPhotoCopyDet", 
    "getRegcodeDetails", "tdvs_getTeachDet", "tdvs_getYearModeDet", "tdvs_getDeggreeGroup", 
    "getTdvsYearModeOnQpcode", "tdvs_getTeacherCode", "TDVS_getTeacherValuationDetails", 
    "loaddeggrpexamcentre", "loaddeggrpnotif", "loadsubjectexamcentre", "loadallexamcentre", "loadalldate", 
    "loadtableexamcentre", "loadmastersdeg", "loadsubrptsem", "getVerfyData", "saveVerifyNotifi", 
    "loadtdvssubject", "loadtdvssubj", "loadtdvsdate", "loadtdvsstats", "loadqpdetails", "loadalldata", 
    "loadtdvsdegree", "loadQPDet", "totUploadAnsBookDet", "getYearModeData", "getScriptUpdCount", 
    "tdvs_yearmode", "tdvs_getPergeValCount", "tdvs_saveTdvsPergeVal", "tdvs_getDevDet", "tdvs_deleteTemplateCode", 
    "Generate_Bill_New", "getTdvsBills", "tdvs_getBillDetails", "tdvs_resetBill", "tdvsTeachersList", 
    "getQpStatsReport", "tdvsmarkslist", "generateworkdonereport", "generatebill", "generatebill_new", 
    "generatebill_acu", "generatetadabill", "generatebillDwonload", "revaluationReport", "tdvsQpPatranTest", 
    "qppatternreport", "getPanelViewReport", "digitalPhotoCopyDownload", "getTDVSDecodeReport", 
    "getTDVSDecodeReportExcel", "getTDVSValuationStatusReport", "tdvs_deviationdet", "tdvs_TeachValReport", 
    "TDVS_getTeacherValuationDetailsReport", "tdvs_studentMarksReport", "tdvs_studentMarksReportNew", 
    "tdvs_studentMarksReportCOWise", "getPanelViewReportExcel", "reviewercodeData", "getFinaledValScripts", 
    "resetValScript", "getQPTeachData", "tdvs_getpwdstatus", "getTdvsValType", "getEvaluationImages", 
    "getAnsBookImagesTrans", "saveEvalReject", "getEvalMarksStatus", "finalEvalMarks", "getRVPCAnsView", 
    "tdvsValRecalucate", "saveEvaluationMarks", "tdvsEPCETModData", "tdvsmarksListReportPdf", "tdvsuploadqp", 
    "tdvsuploadscheme", "getTdvsSubjects", "getTemplateReference", "getTemplateCodesData", 
    "getDecodingCountQpwise", "getDecodeImage", "checkScriptsForDecoding", "saveDecodedData", 
    "getStudentName", "releaseDecodeQp", "getevalimagevips", "getEvalState", "getQpEvalDet", "saveevalreject", 
    "getYearmodeforfqpcode", "tdvs_saveScriptDraft", "tdvs_saveScript", "saveEvaluationMarksAgain", 
    "createRevl", "createPhotoCopy", "onscreenMarksingVal", "getevalimageStud", "extendLastDate", 
    "PrintApplicationFormNETBANKINGPUB", "PrintRevaluationApplicationForm", "applyQnRv", "getRVDetails", 
    "getTimer", "checkOnlinePreparedQp", "updateAcceptOrReject"
];

const fs = require('fs');

async function scan() {
    console.log(`\nStarting Discovery Scan on ${actions.length} vectors...\n`);
    const results = [];

    for (const action of actions) {
        try {
            const url = `http://localhost:3000/api/teacher?action=${action}&fteachcode=1&fbarcode=1&fmobile=9876543210&fyear=2024`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.status === 'success' || (data.data && !data.error)) {
                // Get a snippet of the data for the terminal
                const snippet = JSON.stringify(data.data || data).substring(0, 150);
                console.log(`[\u2705 SUCCESS] Action: ${action}`);
                console.log(`   \u21B3 DATA: ${snippet}...\n`);
                
                results.push({ action, status: 'OPEN', response: data });
            } else {
                const msg = data.data?.msg || data.error || 'Unknown';
                if (!msg.includes('undefined action')) {
                    console.log(`[\u26A0\uFE0F VULNERABLE] Action: ${action} -> ${msg}`);
                    results.push({ action, status: 'RESTRICTED', error: msg });
                }
            }
        } catch (e) {
            // Ignore connection errors/timeouts
        }
    }

    // Save the full report to a file
    fs.writeFileSync('leak_report.json', JSON.stringify(results, null, 2));
    
    console.log('\n--- SCAN COMPLETE ---');
    console.log(`Found ${results.filter(r => r.status === 'OPEN').length} OPEN endpoints.`);
    console.log(`Detailed report saved to: leak_report.json`);
}

scan();
