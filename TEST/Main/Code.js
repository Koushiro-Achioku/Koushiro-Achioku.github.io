var passcode = '123456';

function doGet() {
    /*
    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    //https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png
    htmlOutput.setTitle('Senior Ex-Form').setFaviconUrl('https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
    */
  　//エラー表示
  　var htmlOutput = HtmlService.createTemplateFromFile("error").evaluate();
    //https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png
    htmlOutput.setTitle('Senior Ex-Form').setFaviconUrl('https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
}

function doPost(e) {
  if(e.parameter.Passcode == passcode){
    // シートを取得
    var sheet = getSheet('Base Data');

    // シートの最終行を取得
    var lastRow = sheet.getLastRow();

    // 最終行にデータ挿入
    // 「e.parameter.フォーム名」 でフォームから送信されたパラメータを受け取ることができます
    sheet.appendRow([new Date(),e.parameter.TeamID,e.parameter.Round,e.parameter.Point,e.parameter.Time,e.parameter.Retire,
        e.parameter.Mission1_1,e.parameter.Mission1_2,e.parameter.Mission2_1,e.parameter.Mission2_2,e.parameter.Mission2_3,
        e.parameter.Mission3_1,e.parameter.Mission3_2,e.parameter.Mission3_3,e.parameter.Mission4,e.parameter.Mission5_1,e.parameter.Mission5_2]);

    calculate();
    sort();
    
    var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
    //https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png
    htmlOutput.setTitle('送信完了').setFaviconUrl('https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
  }
  else{
    var htmlOutput = HtmlService.createTemplateFromFile("error").evaluate();
    //https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png
    htmlOutput.setTitle('エラー').setFaviconUrl('https://dl.dropboxusercontent.com/s/2fkyrscnn1yeg1v/fabicon.png');
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

function calculate(){
  var sheet = getSheet('Base Data');//Sheetの指定
  const columnBVals = sheet.getRange('A:A').getValues(); // A列値を配列で取得
  const LastRow = columnBVals.filter(String).length;  //空白を除き、配列の数を取得
  
  var sheet2 = getSheet('Total Data');//Sheetの指定
  const columnBVals2 = sheet2.getRange('A:A').getValues(); // A列値を配列で取得
  const LastRow2 = columnBVals2.filter(String).length;  //空白を除き、配列の数を取得
  
  for(var i=2; i<LastRow+1; i++){
    //BaseDataからcheckしていない行を探索
    if(sheet.getRange(i,18).getValue()!="Yes"){
      
      var id_position=0;
      for(var ii=2; ii<LastRow2+2; ii++){
        if(sheet.getRange(i,2).getValue()==sheet2.getRange(ii,1).getValue()){
          id_position=ii;
          break;
        }
      }
      Logger.log(id_position);
      
      var Point = sheet.getRange(i,4).getValue();
      var Time = sheet.getRange(i,5).getValue();
      var Retire = sheet.getRange(i,6).getValue();
      
      //Score書き込み
      if(sheet.getRange(i,3).getValue()=="1"){
        sheet2.getRange(id_position,6).setValue(Point);//Point
        sheet2.getRange(id_position,7).setValue(Time);//Time
        sheet2.getRange(id_position,8).setValue(Retire);//Retire
      }
      else if(sheet.getRange(i,3).getValue()=="2"){
        sheet2.getRange(id_position,9).setValue(Point);//Point
        sheet2.getRange(id_position,10).setValue(Time);//Time
        sheet2.getRange(id_position,11).setValue(Retire);//Retire
      }
      
      //Best Score 判定
      if(!sheet2.getRange(id_position,9).getValue()){//2ndが空->1stがBest
        sheet2.getRange(id_position,3).setValue(sheet2.getRange(id_position,6).getValue());
        sheet2.getRange(id_position,4).setValue(sheet2.getRange(id_position,7).getValue());
        sheet2.getRange(id_position,5).setValue(sheet2.getRange(id_position,8).getValue());
      }
      else if(sheet2.getRange(id_position,6).getValue()>sheet2.getRange(id_position,9).getValue()){//1st>2nd -> 1stがBest
        sheet2.getRange(id_position,3).setValue(sheet2.getRange(id_position,6).getValue());
        sheet2.getRange(id_position,4).setValue(sheet2.getRange(id_position,7).getValue());
        sheet2.getRange(id_position,5).setValue(sheet2.getRange(id_position,8).getValue());
      }
      else if(sheet2.getRange(id_position,6).getValue()<sheet2.getRange(id_position,9).getValue()){//1st<2nd -> 2ndがBest
        sheet2.getRange(id_position,3).setValue(sheet2.getRange(id_position,9).getValue());
        sheet2.getRange(id_position,4).setValue(sheet2.getRange(id_position,10).getValue());
        sheet2.getRange(id_position,5).setValue(sheet2.getRange(id_position,11).getValue());
      }
      else if(sheet2.getRange(id_position,6).getValue()==sheet2.getRange(id_position,9).getValue()){//1st=2nd -> Time判定
        if(sheet2.getRange(id_position,7).getValue()<sheet2.getRange(id_position,10).getValue()){//1st<2nd -> 1stがBest
          sheet2.getRange(id_position,3).setValue(sheet2.getRange(id_position,6).getValue());
          sheet2.getRange(id_position,4).setValue(sheet2.getRange(id_position,7).getValue());
          sheet2.getRange(id_position,5).setValue(sheet2.getRange(id_position,8).getValue());
        }
        else if(sheet2.getRange(id_position,7).getValue()>sheet2.getRange(id_position,10).getValue()){//1st>2nd -> 2ndがBest
          sheet2.getRange(id_position,3).setValue(sheet2.getRange(id_position,9).getValue());
          sheet2.getRange(id_position,4).setValue(sheet2.getRange(id_position,10).getValue());
          sheet2.getRange(id_position,5).setValue(sheet2.getRange(id_position,11).getValue());
        }
        else if(sheet2.getRange(id_position,7).getValue()==sheet2.getRange(id_position,10).getValue()){//1st=2nd -> Retire判定
          if((sheet2.getRange(id_position,8).getValue()=="No")&&(sheet2.getRange(id_position,11).getValue()=="Yes")){//1st
            sheet2.getRange(id_position,3).setValue(sheet2.getRange(id_position,6).getValue());
            sheet2.getRange(id_position,4).setValue(sheet2.getRange(id_position,7).getValue());
            sheet2.getRange(id_position,5).setValue(sheet2.getRange(id_position,8).getValue());
          }
          else if((sheet2.getRange(id_position,8).getValue()=="Yes")&&(sheet2.getRange(id_position,11).getValue()=="No")){//2nd
            sheet2.getRange(id_position,3).setValue(sheet2.getRange(id_position,9).getValue());
            sheet2.getRange(id_position,4).setValue(sheet2.getRange(id_position,10).getValue());
            sheet2.getRange(id_position,5).setValue(sheet2.getRange(id_position,11).getValue());
          }
          else if(sheet2.getRange(id_position,8).getValue()==sheet2.getRange(id_position,11).getValue()){//1st
            sheet2.getRange(id_position,3).setValue(sheet2.getRange(id_position,6).getValue());
            sheet2.getRange(id_position,4).setValue(sheet2.getRange(id_position,7).getValue());
            sheet2.getRange(id_position,5).setValue(sheet2.getRange(id_position,8).getValue());
          }
        }
      }
      //Best Score判定終了
      
      var sheet3 = getSheet('Ranking');//Sheetの指定
      const columnBVals3 = sheet3.getRange('B:B').getValues(); // A列値を配列で取得
      const LastRow3 = columnBVals3.filter(String).length;  //空白を除き、配列の数を取得
      
      var rank=0;
      for(var j=2;j<LastRow3+1;j++){
        if(sheet2.getRange(id_position,1).getValue()==sheet3.getRange(j,2).getValue()){
          rank=j;
          break;
        }
      }
      sheet3.getRange(rank,4).setValue(sheet2.getRange(id_position,3).getValue());
      sheet3.getRange(rank,5).setValue(sheet2.getRange(id_position,4).getValue());
      sheet3.getRange(rank,6).setValue(sheet2.getRange(id_position,5).getValue());
      
      
      sheet.getRange(i,18).setValue("Yes");//checkした行に印をつける
    }
  }
}

function sort(){
  var sheet = getSheet('Ranking');//Sheetの指定
  const columnBVals = sheet.getRange('B:B').getValues(); // A列値を配列で取得
  const LastRow = columnBVals.filter(String).length;  //空白を除き、配列の数を取得

  var changed=true;
  while(1){
    if(changed){
      changed=false;
      for(var i=3;i<LastRow+1;i++){
        var up=0;
        //自分より上の行で、「自分の点数より低い点数」が見つかったら加算していく
        for(var ii=i-1;ii>1;ii--){
          if(sheet.getRange(i,4).getValue()>sheet.getRange(ii,4).getValue()){
            up=ii;
          }
        }
        //自分より上の行で、一番上にある「自分の点数より低い点数」のその上に1行差し込む
        if(up!=0){
          sheet.insertRowAfter(up-1);
          for(var iii=2; iii<7; iii++){
            sheet.getRange(up,iii).setValue(sheet.getRange(i+1,iii).getValue());//自分が元いた行から新しい行へコピー
          }
          sheet.deleteRows(i+1);//自分が元いた行を削除
          changed=true;
        }
      }
    }
    else{
      break;
    }
  }
  
  var changed2=true;
  while(1){
    if(changed2){
      changed2=false;
      //自分より上の行で、「自分の点数と同じ点数」で「自分のタイムの方が速い」行を入れ替えていく
      for(var i=2; i<LastRow+1; i++){
        var i0_value = sheet.getRange(i,4).getValue();
        var i1_value = sheet.getRange(i+1,4).getValue();
        if(i0_value && i1_value){
          if((i0_value == i1_value)&&(sheet.getRange(i,5).getValue()>sheet.getRange(i+1,5).getValue())){
            sheet.insertRowAfter(i-1);
            for(ii=2; ii<7; ii++){
              sheet.getRange(i,ii).setValue(sheet.getRange(i+2,ii).getValue());
            }
            sheet.deleteRows(i+2);
            changed2=true;
          }
        }
      }
    }
    else{
      break;
    }
  }
  
  for(var runk=2; runk<LastRow+1; runk++){
    sheet.getRange(runk,1).setValue(runk-1);
  }
}
