var id = 0;
var teamname = '';
var point = 0;
var speed = 0;

function doGet() {
    getLastdata();

    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    htmlOutput.setTitle('Prev');
    htmlOutput.setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
    return htmlOutput;
}

function getSheet(name){
    // SSIDからスプレッドシートの取得
    //https://docs.google.com/spreadsheets/d/1EzhZsesNXOGXeeFyBE_0Pp0zGN5PlvyJCmyhzyadWDc/edit#gid=0
    var ssid = '1EzhZsesNXOGXeeFyBE_0Pp0zGN5PlvyJCmyhzyadWDc';
    var ss = SpreadsheetApp.openById(ssid);
    // 指定されたシート名からシートを取得して返却
    var sheet = ss.getSheetByName(name);
    return sheet;
}

function getLastdata(){
    var sheet = getSheet('Base');//Sheetの指定
    const Row_array = sheet.getRange('A:A').getValues(); // A列値を配列で取得
    const LastRow = Row_array.filter(String).length;  //空白を除き、配列の数を取得

    var sheet2 = getSheet('Total');//Sheetの指定
    const Row_array2 = sheet2.getRange('A:A').getValues(); // A列値を配列で取得
    const LastRow2 = Row_array2.filter(String).length;  //空白を除き、配列の数を取得

    id = sheet.getRange(LastRow,2).getValue();
    if(id != "null"){
        for(var i=2; i<=LastRow2; i++){
            if(sheet2.getRange(i,1).getValue()==id){
                teamname = sheet2.getRange(i,2).getValue();
                break;
            }
        }
        point = sheet.getRange(LastRow,5).getValue();
        speed = sheet.getRange(LastRow,7).getValue();
    }
}