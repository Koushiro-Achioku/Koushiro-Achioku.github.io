var id=0;

function doGet(e) {
    id = e.parameter.id;
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

function writeValue(id_read,round,mission){
    var id_row=0;
    var base_row=0;

    var sheet = getSheet('Base');//Sheetの指定

    var sheet2 = getSheet('Total');//Sheetの指定
    const columnBVals2 = sheet2.getRange('A:A').getValues(); // A列値を配列で取得
    const LastRow2 = columnBVals2.filter(String).length;  //空白を除き、配列の数を取得

    for(var i=3; i<=LastRow2; i++){
        if(id_read==sheet2.getRange(i,1).getValue())
            id_row=i;
    }

    if(sheet2.getRange(id_row,11+round*3).getValue()){
        base_row=sheet2.getRange(id_row,11+round*3).getValue();
        return sheet.getRange(base_row,5+mission).getValue();
    }
    else{
        return "";
    }
}

function writeID(id_read){
    var id_row=0;
    var sheet2 = getSheet('Total');//Sheetの指定
    const columnBVals2 = sheet2.getRange('A:A').getValues(); // A列値を配列で取得
    const LastRow2 = columnBVals2.filter(String).length;  //空白を除き、配列の数を取得
    
    for(var i=3; i<=LastRow2+1; i++){
        if(id_read==sheet2.getRange(i,1).getValue())
            id_row=i;
    }

    return sheet2.getRange(id_row,2).getValue();
}
