//現在時刻表示関数
function CurrentTime(){
    let now = new Date();
    let CureentTime_array = new Array(3);
    CureentTime_array[0] = now.getHours();
    CureentTime_array[1] = now.getMinutes();
    CureentTime_array[2] = now.getSeconds();

    if(CureentTime_array[1]<10){
        CureentTime_array[1]="0"+CureentTime_array[1];
    }
    if(CureentTime_array[2]<10){
        CureentTime_array[2]="0"+CureentTime_array[2];
    }

    document.getElementById("CurrentTime-text").innerHTML = CureentTime_array[0]+":"+CureentTime_array[1]+":"+CureentTime_array[2];
    setTimeout("CurrentTime()", 1000);
}