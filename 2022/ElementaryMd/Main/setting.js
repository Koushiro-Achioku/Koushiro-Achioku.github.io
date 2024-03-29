//時計関係の配列定義
var StartTime_array = new Array(0,0,0,0);
var EndTime_array = new Array(0,0,0,0);
var RunningTime_array = new Array(0,0,0,0);

//点数計算用の配列定義
var Score_array = new Array(6).fill(0);

var obj = new Array(0,0,0).fill(0);

//走行パターン変数
var Time = 0.0;
var Pattern = 0;
var Distance = new Array(6230,6710,6710,7190,7190,7190);

//点数リセット関数
function Score_reset(){
    for(let i=0; i<Score_array.length; i++ ){ Score_array[i]=0; }
}

//点数合計関数
function Score_sum(){
    Score_array[0]=0;
    for(let i=1; i<Score_array.length; i++ ){
        Score_array[0]+=Score_array[i];
    }
}

//点数計算・確認画面生成関数
function Scoring(mission,selected){
    let each_point;
    switch(mission){
        case 1:
            each_point = 20;
            document.getElementById("check_M1-1").innerText = selected;
            document.getElementById("check_M1-1_Total").innerText = selected*each_point;
            //データ数検証
            obj[1] = selected;
            obj[0] = Number(obj[1]) + Number(obj[2]);
            if(Number(obj[0])<=4){
                document.getElementById("caution_text").hidden = true;
            }
            else{
                document.getElementById("caution_text").hidden = false;
            }
            break;
        case 2:
            each_point = 10;
            document.getElementById("check_M2-1").innerText = selected;
            document.getElementById("check_M2-1_Total").innerText = selected*each_point;
            //データ数検証
            obj[2] = selected;
            obj[0] = Number(obj[1]) + Number(obj[2]);
            if(Number(obj[0])<=4){
                document.getElementById("caution_text").hidden = true;
            }
            else{
                document.getElementById("caution_text").hidden = false;
            }
            break;
        case 3:
            each_point = 20;
            document.getElementById("check_M3-1").innerText = selected;
            document.getElementById("check_M3-1_Total").innerText = selected*each_point;
            break;
        case 4:
            each_point = 10;
            document.getElementById("check_M4-1").innerText = selected;
            document.getElementById("check_M4-1_Total").innerText = selected*each_point;
            break;
        case 5:
            each_point = -5;
            document.getElementById("check_M5-1").innerText = selected;
            document.getElementById("check_M5-1_Total").innerText = selected*each_point;
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
        //タイム書き込み
        Time = input_time.value;
        document.getElementById("Time-text").innerHTML = Time;
        //スピード計算・書き込み
        document.getElementById("Speed").innerHTML = Speed(Pattern,Time);
        document.getElementById("Speed-textbox").value = Speed(Pattern,Time);
        document.getElementById("Speed-text").innerHTML = Speed(Pattern,Time);
    });

    var select_teamname = document.getElementById("Teamname_selector");
    select_teamname.addEventListener("change",function(){
        var num = select_teamname.selectedIndex;
        document.getElementById("Teamname-text").innerHTML = select_teamname.options[num].innerText;
    });
});

function Round_set(text){
    document.getElementById("Round-text").innerHTML = text;
}

//チームリストの設定
function setTeam(){
    //プルダウンリストをループ処理で値を取り出してセレクトボックスにセットする
    for(var i=0;i<list.length;i++){
    let opt = document.createElement("option");
    opt.value = list[i].val;  //value値
    opt.text = list[i].txt;   //テキスト値
    document.getElementById("Teamname_selector").appendChild(opt);
    }
};

function Patternset(num){
    document.getElementById("Pattern-text").innerHTML = num;
    Pattern = num-1;
    //スピード計算・書き込み
    document.getElementById("Speed").innerHTML = Speed(Pattern,Time);
    document.getElementById("Speed-textbox").value = Speed(Pattern,Time);
    document.getElementById("Speed-text").innerHTML = Speed(Pattern,Time);
};

function Speed(pattern,time){
    if(time==0){
        return 0;
    }
    else{
        return Math.round((Distance[pattern]/time)*10)/10;
    }
};

function reset_pass(){
    document.getElementById("Pass-textbox").value = "999999";
};
