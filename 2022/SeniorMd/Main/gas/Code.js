var passcode = '123456';
var caution = 0;

function doGet() {
   //エラー表示
    var htmlOutput = HtmlService.createTemplateFromFile("error").evaluate();
    htmlOutput.setTitle('エラー');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
}

function doPost(e) {
  if(e.parameter.Passcode == passcode){
    // シートを取得
    var sheet = getSheet('Base');

    // シートの最終行を取得
    //var lastRow = sheet.getLastRow();

    // 最終行にデータ挿入
    // 「e.parameter.フォーム名」 でフォームから送信されたパラメータを受け取ることができます
    sheet.appendRow([new Date(),e.parameter.TeamID,e.parameter.Round,e.parameter.Route,e.parameter.Point,e.parameter.Time,e.parameter.Speed,
                    e.parameter.Mission1_1,e.parameter.Mission2_1,e.parameter.Mission3_1,e.parameter.Mission4_1,e.parameter.Mission5_1]);

    caution = 0;
    calculate();
    sort();
    
    if(!caution){
      var htmlOutput = HtmlService.createTemplateFromFile("index").evaluate();
      htmlOutput.setTitle('送信完了');
      htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
      return htmlOutput;
    }
    else{
      var htmlOutput = HtmlService.createTemplateFromFile("error").evaluate();
      htmlOutput.setTitle('エラー');
      htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
      return htmlOutput;
    }
  }
  else{
    var htmlOutput = HtmlService.createTemplateFromFile("error").evaluate();
    htmlOutput.setTitle('エラー');
    htmlOutput.addMetaTag('viewport','width=device-width, initial-scale=1, user-scalable=no');
    return htmlOutput;
  }
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

function calculate(){
  var sheet = getSheet('Base');//Sheetの指定
  const Row_array = sheet.getRange('A:A').getValues(); // A列値を配列で取得
  const LastRow = Row_array.filter(String).length;  //空白を除き、配列の数を取得
  
  var sheet2 = getSheet('Total');//Sheetの指定
  const Row_array2 = sheet2.getRange('A:A').getValues(); // A列値を配列で取得
  const LastRow2 = Row_array2.filter(String).length;  //空白を除き、配列の数を取得
  
  const check_column = sheet.getLastColumn();

  for(var i=2; i<=LastRow; i++){
    //BaseDataからcheckがYesでない行を探索
    if(sheet.getRange(i,check_column).getValue()!="Yes"){
      if(sheet.getRange(i,2).getValue()!="null"){
        var id_position=0;
        var base_id = sheet.getRange(i,2).getValue();

        for(var ii=3; ii<=LastRow2+1; ii++){
          if(base_id==sheet2.getRange(ii,1).getValue()){
            id_position=ii;
            break;
          }
        }
        
        //Score書き込み
        var Round = sheet.getRange(i,3).getValue();
        var Point = sheet.getRange(i,5).getValue();
        var Speed = sheet.getRange(i,7).getValue();
        
        //Score書き込み
        if(Round=="1"){
          sheet2.getRange(id_position,12).setValue(Point);//Point
          sheet2.getRange(id_position,13).setValue(Speed);//Speed
          sheet2.getRange(id_position,14).setValue(i);//Row

          sheet2.getRange(id_position,3).setValue(1);//Round
          sheet2.getRange(id_position,4).setValue(Point);//Point
          sheet2.getRange(id_position,5).setValue(Speed);//Speed
        }
        else if(Round=="2"){
          sheet2.getRange(id_position,15).setValue(Point);//Point
          sheet2.getRange(id_position,16).setValue(Speed);//Speed
          sheet2.getRange(id_position,17).setValue(i);//Row

          sheet2.getRange(id_position,6).setValue(2);//Round
          sheet2.getRange(id_position,7).setValue(Point);//Point
          sheet2.getRange(id_position,8).setValue(Speed);//Speed
        }
        else if(Round=="3"){
          sheet2.getRange(id_position,18).setValue(Point);//Point
          sheet2.getRange(id_position,19).setValue(Speed);//Speed
          sheet2.getRange(id_position,20).setValue(i);//Row

          sheet2.getRange(id_position,9).setValue(3);//Round
          sheet2.getRange(id_position,10).setValue(Point);//Point
          sheet2.getRange(id_position,11).setValue(Speed);//Speed
        }

        //Best Score 判定
        var round_1st = sheet2.getRange(id_position,3).getValue();
        var round_2nd = sheet2.getRange(id_position,6).getValue();
        var round_3rd = sheet2.getRange(id_position,9).getValue();

        var point_1st = sheet2.getRange(id_position,4).getValue();
        var point_2nd = sheet2.getRange(id_position,7).getValue();
        var point_3rd = sheet2.getRange(id_position,10).getValue();

        var time_1st = sheet2.getRange(id_position,5).getValue();
        var time_2nd = sheet2.getRange(id_position,8).getValue();
        var time_3rd = sheet2.getRange(id_position,11).getValue();
        
        //点数入れ替え(3位から)
        if(point_3rd>point_2nd){//3>2
          if(point_3rd>point_1st){//3>1
            if(point_1st<point_2nd){//1<2
              //3rdを1stに
              sheet2.getRange(id_position,3).setValue(round_3rd);//Round
              sheet2.getRange(id_position,4).setValue(point_3rd);//Point
              sheet2.getRange(id_position,5).setValue(time_3rd);//Time
              //1stを3rdに
              sheet2.getRange(id_position,9).setValue(round_1st);//Round
              sheet2.getRange(id_position,10).setValue(point_1st);//Point
              sheet2.getRange(id_position,11).setValue(time_1st);//Time
            }
            else{//1>2,1==2
              //3rdを1stに
              sheet2.getRange(id_position,3).setValue(round_3rd);//Round
              sheet2.getRange(id_position,4).setValue(point_3rd);//Point
              sheet2.getRange(id_position,5).setValue(time_3rd);//Time
              //1stを2ndに
              sheet2.getRange(id_position,6).setValue(round_1st);//Round
              sheet2.getRange(id_position,7).setValue(point_1st);//Point
              sheet2.getRange(id_position,8).setValue(time_1st);//Time
              //2ndを3rdに
              sheet2.getRange(id_position,9).setValue(round_2nd);//Round
              sheet2.getRange(id_position,10).setValue(point_2nd);//Point
              sheet2.getRange(id_position,11).setValue(time_2nd);//Time
            }
          }
          else{//3<1,3==1
            //3rdを2ndに
            sheet2.getRange(id_position,6).setValue(round_3rd);//Round
            sheet2.getRange(id_position,7).setValue(point_3rd);//Point
            sheet2.getRange(id_position,8).setValue(time_3rd);//Time
            //2ndを3rdに
            sheet2.getRange(id_position,9).setValue(round_2nd);//Round
            sheet2.getRange(id_position,10).setValue(point_2nd);//Point
            sheet2.getRange(id_position,11).setValue(time_2nd);//Time
          }
        }
        
        //点数入れ替え(2位から)
        if(point_2nd>point_1st){//2>1
          if(point_1st>point_3rd){
            round_1st = sheet2.getRange(id_position,3).getValue();
            round_2nd = sheet2.getRange(id_position,6).getValue();
            time_1st = sheet2.getRange(id_position,5).getValue();
            time_2nd = sheet2.getRange(id_position,8).getValue();

            //2ndを1stに
            sheet2.getRange(id_position,3).setValue(round_2nd);//Round
            sheet2.getRange(id_position,4).setValue(point_2nd);//Point
            sheet2.getRange(id_position,5).setValue(time_2nd);//Time
            //1stを2ndに
            sheet2.getRange(id_position,6).setValue(round_1st);//Round
            sheet2.getRange(id_position,7).setValue(point_1st);//Point
            sheet2.getRange(id_position,8).setValue(time_1st);//Time
          }
          else{
            round_1st = sheet2.getRange(id_position,3).getValue();
            round_2nd = sheet2.getRange(id_position,6).getValue();
            round_3rd = sheet2.getRange(id_position,9).getValue();
            time_1st = sheet2.getRange(id_position,5).getValue();
            time_2nd = sheet2.getRange(id_position,8).getValue();
            time_3rd = sheet2.getRange(id_position,11).getValue();

            //2ndを1stに
            sheet2.getRange(id_position,3).setValue(round_2nd);//Round
            sheet2.getRange(id_position,4).setValue(point_2nd);//Point
            sheet2.getRange(id_position,5).setValue(time_2nd);//Time
            //3rdを2ndに
            sheet2.getRange(id_position,6).setValue(round_3rd);//Round
            sheet2.getRange(id_position,7).setValue(point_3rd);//Point
            sheet2.getRange(id_position,8).setValue(time_3nd);//Time
            //1stを3rdに
            sheet2.getRange(id_position,9).setValue(round_1st);//Round
            sheet2.getRange(id_position,10).setValue(point_1st);//Point
            sheet2.getRange(id_position,11).setValue(time_1st);//Time
          }
        }

        //Best Score 判定
        var changed=true;
        while(1){
          if(changed){
            changed=false;

            point_2nd = sheet2.getRange(id_position,7).getValue();
            point_3rd = sheet2.getRange(id_position,10).getValue();

            //スピード入れ替え(2位と3位)
            if(point_2nd==point_3rd){
              speed_2nd = sheet2.getRange(id_position,8).getValue();
              speed_3rd = sheet2.getRange(id_position,11).getValue();

              if(speed_2nd<speed_3rd){
                round_2nd = sheet2.getRange(id_position,6).getValue();
                round_3rd = sheet2.getRange(id_position,9).getValue();

                //3rdを2ndに
                sheet2.getRange(id_position,6).setValue(round_3rd);//Round
                sheet2.getRange(id_position,7).setValue(point_3rd);//Point
                sheet2.getRange(id_position,8).setValue(speed_3rd);//Time
                //2ndを3rdに
                sheet2.getRange(id_position,9).setValue(round_2nd);//Round
                sheet2.getRange(id_position,10).setValue(point_2nd);//Point
                sheet2.getRange(id_position,11).setValue(speed_2nd);//Time
                
                changed=true;
              }
            }

            point_1st = sheet2.getRange(id_position,4).getValue();
            point_2nd = sheet2.getRange(id_position,7).getValue();
          
            //タイム入れ替え(1位と2位)
            if(point_1st==point_2nd){
              speed_1st = sheet2.getRange(id_position,5).getValue();
              speed_2nd = sheet2.getRange(id_position,8).getValue();

              if(speed_1st<speed_2nd){
                round_1st = sheet2.getRange(id_position,3).getValue();
                round_2nd = sheet2.getRange(id_position,6).getValue();

                //2ndを1stに
                sheet2.getRange(id_position,3).setValue(round_2nd);//Round
                sheet2.getRange(id_position,4).setValue(point_2nd);//Point
                sheet2.getRange(id_position,5).setValue(speed_2nd);//Time
                //1stを2ndに
                sheet2.getRange(id_position,6).setValue(round_1st);//Round
                sheet2.getRange(id_position,7).setValue(point_1st);//Point
                sheet2.getRange(id_position,8).setValue(speed_1st);//Time

                changed=true
              }
            }
          }
          else{
            break;
          }
        }
        //Best Score判定終了
        
        var sheet3 = getSheet('Rank');//Sheetの指定
        const Row_array3 = sheet3.getRange('B:B').getValues(); // A列値を配列で取得
        const LastRow3 = Row_array3.filter(String).length;  //空白を除き、配列の数を取得
        
        var rank=0;
        for(var j=2;j<=LastRow3;j++){
          if(sheet2.getRange(id_position,1).getValue()==sheet3.getRange(j,2).getValue()){
            rank=j;
            break;
          }
        }
        sheet3.getRange(rank,4).setValue(sheet2.getRange(id_position,4).getValue());
        sheet3.getRange(rank,5).setValue(sheet2.getRange(id_position,5).getValue());
        
        sheet.getRange(i,check_column).setValue("Yes");//checkした行に印をつける
      }
      else{
        caution = 1;
      }
    }
  }
}

function sort(){
  var sheet = getSheet('Rank');//Sheetの指定
  const Row_array = sheet.getRange('B:B').getValues(); // A列値を配列で取得
  const LastRow = Row_array.filter(String).length;  //空白を除き、配列の数を取得

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
          for(var iii=2; iii<6; iii++){
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
      //自分より上の行で、「自分の点数と同じ点数」で「自分のスピードが大きい」行を入れ替えていく
      for(var i=2; i<LastRow+1; i++){
        var i0_value = sheet.getRange(i,4).getValue();
        var i1_value = sheet.getRange(i+1,4).getValue();
        if(i0_value && i1_value){
          if((i0_value == i1_value)&&(sheet.getRange(i,5).getValue()<sheet.getRange(i+1,5).getValue())){
            sheet.insertRowAfter(i-1);
            for(ii=2; ii<6; ii++){
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
