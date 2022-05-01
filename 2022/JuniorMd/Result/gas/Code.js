const column = 9;
var id=0;

var ss_value_r1 = new Array(column);
var ss_value_r2 = new Array(column);
var ss_value_r3 = new Array(column);

function doGet(e) {
    id = e.parameter.id;
    readValue(id,1);
    readValue(id,2);
    readValue(id,3);
    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    htmlOutput.setTitle(id + ' - Result');
    htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return htmlOutput;
}

function getSheet(name){
    // SSIDからスプレッドシートの取得
    //https://docs.google.com/spreadsheets/d/1EzuAe6h49YzqdPObrLpGnTcZ1VOVyVImkV-vTp_k968/edit#gid=0
    var ssid = '1EzuAe6h49YzqdPObrLpGnTcZ1VOVyVImkV-vTp_k968';
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

function readValue(id_read,round){
    var id_row=0;
    var base_row=0;

    var sheet = getSheet('Base');//Sheetの指定

    var sheet2 = getSheet('Total');//Sheetの指定
    const columnBVals2 = sheet2.getRange('A:A').getValues(); // A列値を配列で取得
    const LastRow2 = columnBVals2.filter(String).length;  //空白を除き、配列の数を取得

    for(var i=3; i<=LastRow2+1; i++){
        if(id_read==sheet2.getRange(i,1).getValue())
            id_row=i;
    }

    if(sheet2.getRange(id_row,11+round*3).getValue()){
        base_row=sheet2.getRange(id_row,11+round*3).getValue();

        for(var ii=8;ii<=12;ii++){
            switch(round){
                case 1:
                    ss_value_r1[ii-7] = sheet.getRange(base_row,ii).getValue();
                    break;
                case 2:
                    ss_value_r2[ii-7] = sheet.getRange(base_row,ii).getValue();
                    break;
                case 3:
                    ss_value_r3[ii-7] = sheet.getRange(base_row,ii).getValue();
                    break;
            }
        }

        switch(round){
            case 1:
                ss_value_r1[0] = sheet.getRange(base_row,4).getValue();//合計点
                ss_value_r1[column-3] = sheet.getRange(base_row,4).getValue();//パターン
                ss_value_r1[column-2] = sheet.getRange(base_row,6).getValue();//タイム
                ss_value_r1[column-1] = sheet.getRange(base_row,7).getValue();//スピード
                break;
            case 2:
                ss_value_r2[0] = sheet.getRange(base_row,4).getValue();//合計点
                ss_value_r2[column-3] = sheet.getRange(base_row,4).getValue();//パターン
                ss_value_r2[column-2] = sheet.getRange(base_row,6).getValue();//タイム
                ss_value_r2[column-1] = sheet.getRange(base_row,7).getValue();//スピード
                break;
            case 3:
                ss_value_r3[0] = sheet.getRange(base_row,4).getValue();//合計点
                ss_value_r3[column-3] = sheet.getRange(base_row,4).getValue();//パターン
                ss_value_r3[column-2] = sheet.getRange(base_row,6).getValue();//タイム
                ss_value_r3[column-1] = sheet.getRange(base_row,7).getValue();//スピード
                break;
        }
        
    }
    else{
        for(var ii=0;ii<column;ii++){
            switch(round){
                case 1:
                    ss_value_r1[ii] = "";
                    break;
                case 2:
                    ss_value_r2[ii] = "";
                    break;
                case 3:
                    ss_value_r3[ii] = "";
                    break;
            }
        }
    }
}