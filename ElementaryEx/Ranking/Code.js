function doGet() {
    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return htmlOutput;
}

function getSheet(name){
    // SSIDからスプレッドシートの取得
    //https://docs.google.com/spreadsheets/d/1dfcCOZR6rf_7V0yAPtDtVMk9MbrtewrA1b7_PN4KtCQ/edit?usp=sharing
    var ssId = '1dfcCOZR6rf_7V0yAPtDtVMk9MbrtewrA1b7_PN4KtCQ';
    var ss = SpreadsheetApp.openById(ssId);
    // 指定されたシート名からシートを取得して返却
    var sheet = ss.getSheetByName(name);
    return sheet;
}

function getData(name) {
    // 指定したシートからデータを取得
    var values = getSheet(name).getDataRange().getValues();
    return values;
}
