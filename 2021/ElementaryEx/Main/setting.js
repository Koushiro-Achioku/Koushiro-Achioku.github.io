//時計関係の配列定義
var StartTime_array = new Array(0,0,0,0);
var EndTime_array = new Array(0,0,0,0);
var RunningTime_array = new Array(0,0,0,0);

//点数計算用の配列定義
var Score_array = new Array(12).fill(0);

//点数リセット関数
function Score_reset(){
    for(let i=0; i<12 ; i++ ){ Score_array[i]=0; }
}

//点数合計関数
function Score_sum(){
    Score_array[0]=0;
    for(let i=1; i<12 ; i++ ){
        Score_array[0]+=Score_array[i];
    }
}

//点数計算・確認画面生成関数
function Scoring(mission,selected){
    let each_point;
    switch(mission){
        case 1:
            each_point = 10;
            document.getElementById("check_M1").innerText = selected;
            document.getElementById("check_M1_Total").innerText = selected*each_point;
            break;
        case 2:
            each_point = 6;
            document.getElementById("check_M2-1").innerText = selected;
            document.getElementById("check_M2-1_Total").innerText = selected*each_point;
            break;
        case 3:
            each_point = 8;
            document.getElementById("check_M2-2").innerText = selected;
            document.getElementById("check_M2-2_Total").innerText = selected*each_point;
            break;
        case 4:
            each_point = 10;
            document.getElementById("check_M3").innerText = selected;
            document.getElementById("check_M3_Total").innerText = selected*each_point;
            break;
        case 5:
            each_point = 3;
            document.getElementById("check_M4-1").innerText = selected;
            document.getElementById("check_M4-1_Total").innerText = selected*each_point;
            break;
        case 6:
            each_point = 7;
            document.getElementById("check_M4-2").innerText = selected;
            document.getElementById("check_M4-2_Total").innerText = selected*each_point;
            break;
        case 7:
            each_point=7;
            document.getElementById("check_M5").innerText = selected;
            document.getElementById("check_M5_Total").innerText = selected*each_point;
            break;
        case 8:
            each_point=2;
            document.getElementById("check_M6-1").innerText = selected;
            document.getElementById("check_M6-1_Total").innerText = selected*each_point;
            break;
        case 9:
            each_point=2;
            document.getElementById("check_M6-2").innerText = selected;
            document.getElementById("check_M6-2_Total").innerText = selected*each_point;
            break;
        default:
            console.log("ERROR!!");
            break;
    }
    Score_array[mission] = each_point * selected;
    Score_sum();
    document.getElementById("Point-text").innerHTML = Score_array[0];
    document.getElementById("Point-textbox").value = Score_array[0];
}

function Round_set(text){
    document.getElementById("Round-text").innerHTML = text;
}

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

//Teamname,Round,Timeの処理
window.addEventListener('DOMContentLoaded', function(){
    var input_time = document.getElementById("Time-textbox");
    input_time.addEventListener("change",function(){
        document.getElementById("Time-text").innerHTML = input_time.value;
    });

    var select_teamname = document.getElementById("Teamname_selector");
    select_teamname.addEventListener("change",function(){
        var num = select_teamname.selectedIndex;
        document.getElementById("Teamname-text").innerHTML = select_teamname.options[num].innerText;
    });
});
