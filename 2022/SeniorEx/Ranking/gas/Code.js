function doGet() {
    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return htmlOutput;
}

function getSheet(name){
    // SSIDからスプレッドシートの取得
    //https://docs.google.com/spreadsheets/d/1yx_MdZquMbDgQTdLdCzGDAl9PTQAOrstxAbOxj0DDb4/edit#gid=0
    var ssid = '1yx_MdZquMbDgQTdLdCzGDAl9PTQAOrstxAbOxj0DDb4';
    var ss = SpreadsheetApp.openById(ssid);
    // 指定されたシート名からシートを取得して返却
    var sheet = ss.getSheetByName(name);
    return sheet;
}

function getData(name) {
    // 指定したシートからデータを取得
    var values = getSheet(name).getDataRange().getValues();
    return values;
}
