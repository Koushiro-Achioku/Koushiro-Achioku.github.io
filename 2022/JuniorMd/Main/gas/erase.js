function erase() {
  // シートを取得
  var sheet1 = getSheet('Base');
  var sheet2 = getSheet('Total');
  var sheet3 = getSheet('Rank');

  const columnBVals1 = sheet1.getRange('A:A').getValues(); // A列値を配列で取得
  const LastRow1 = columnBVals1.filter(String).length;  //空白を除き、配列の数を取得
  const check_column1 = sheet1.getLastColumn();
  sheet1.getRange(2,1,LastRow1,check_column1).clearContent();

  const columnBVals2 = sheet2.getRange('A:A').getValues(); // A列値を配列で取得
  const LastRow2 = columnBVals2.filter(String).length;  //空白を除き、配列の数を取得
  const check_column2 = sheet2.getLastColumn();
  sheet2.getRange(3,3,LastRow2,check_column2-2).clearContent();

  const columnBVals3 = sheet3.getRange('A:A').getValues(); // A列値を配列で取得
  const LastRow3 = columnBVals3.filter(String).length;  //空白を除き、配列の数を取得
  const check_column3 = sheet3.getLastColumn();
  sheet3.getRange(2,1,LastRow3,check_column3).clearContent();

  for(var i=2;i<LastRow2+1;i++){
    sheet3.getRange(i,1).setValue(i-1);
    sheet3.getRange(i,2).setValue(sheet2.getRange(i+1,1).getValue());
    sheet3.getRange(i,3).setValue(sheet2.getRange(i+1,2).getValue());
  }
}
