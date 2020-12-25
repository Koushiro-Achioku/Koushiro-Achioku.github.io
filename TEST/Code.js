var passcode = '123456';

function doGet() {
    /*
    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    //https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png
    htmlOutput.setTitle('Senior Ex-Form').setFaviconUrl('https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
    */
}

function doPost(e) {
  if(e.parameter.Passcode == passcode){
    // シートを取得
    var sheet = getSheet('Base Data');

    // シートの最終行を取得
    var lastRow = sheet.getLastRow();

    // 最終行にデータ挿入
    // 「e.parameter.フォーム名」 でフォームから送信されたパラメータを受け取ることができます
    sheet.appendRow([new Date(),e.parameter.TeamID,e.parameter.Challege,e.parameter.Point,e.parameter.Time,e.parameter.Retire,
        e.parameter.Mission1_1,e.parameter.Mission1_2,e.parameter.Mission2_1,e.parameter.Mission2_2,e.parameter.Mission2_3,
        e.parameter.Mission3_1,e.parameter.Mission3_2,e.parameter.Mission3_3,e.parameter.Mission4,e.parameter.Mission5_1,e.parameter.Mission5_2]);

    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    //https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png
    htmlOutput.setTitle('Senior Ex-Form').setFaviconUrl('https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
  }
  else{
    var htmlOutput = HtmlService.createTemplateFromFile("error").evaluate();
    //https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png
    htmlOutput.setTitle('Senior Ex-Form').setFaviconUrl('https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
  }
}

function getSheet(name){
    // SSIDからスプレッドシートの取得
    var ssId = '1KiP4221dHW_Vv5erhFDPICwEpu2jwErTXx9oAYyC1GQ';
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
