function doGet() {
    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    //https://dl.dropboxusercontent.com/s/mzvvd111r19n18f/fabicon.png
    htmlOutput.setTitle('短距離走').setFaviconUrl('https://dl.dropboxusercontent.com/s/mzvvd111r19n18f/fabicon.png');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
}

function doPost(e) {
    // シートを取得
    var sheet = getSheet('長距離走ログ');

    // シートの最終行を取得
    var lastRow = sheet.getLastRow();

    // 最終行にデータ挿入
    // 「e.parameter.フォーム名」 でフォームから送信されたパラメータを受け取ることができます
    sheet.appendRow([new Date(),e.parameter.Team_Name,e.parameter.Player_Name,e.parameter.Time]);

    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    //https://dl.dropboxusercontent.com/s/mzvvd111r19n18f/fabicon.png
    htmlOutput.setTitle('短距離走').setFaviconUrl('https://dl.dropboxusercontent.com/s/mzvvd111r19n18f/fabicon.png');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
}

function getSheet(name){
    // SSIDからスプレッドシートの取得
    var ssId = '1UwISfeXEqVPhiaK39KKZgqyM_Nyw8wRkbW3qpvClGWQ';
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
