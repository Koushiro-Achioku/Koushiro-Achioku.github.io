function doGet(e) {
    if(e.parameter.page=1){
        var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
        htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
        htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
        return htmlOutput;
    }
    else if(e.parameter.page=2){
        var htmlOutput = HtmlService.createTemplateFromFile("index2").evaluate();
        htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
        htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
        return htmlOutput;
    }
    else{
        var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
        htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
        htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
        return htmlOutput;
    }
}

function getSheet(name){
    // SSIDからスプレッドシートの取得
    //https://docs.google.com/spreadsheets/d/1ura54uUdaOLdgg9DY-cHIapp-wN-nLY69U0s7z-7Qjk/edit?usp=sharing
    var ssId = '1ura54uUdaOLdgg9DY-cHIapp-wN-nLY69U0s7z-7Qjk';
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
