function doGet() {
    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return htmlOutput;
}

function getSheet(name){
    // SSIDからスプレッドシートの取得
    var ssId = '1oH0emVlJX4MwYbd1gzXWfPmNs1h8lql12jCLCxfoj8s';
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
