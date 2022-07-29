//時計関係の配列定義
var StartTime_array = new Array(0,0,0,0);
var EndTime_array = new Array(0,0,0,0);
var RunningTime_array = new Array(0,0,0,0);

//点数計算用の配列定義
var Score_array = new Array(13).fill(0);

var caution_flag = new Array(0,0).fill(0);
var obj_mission1 = new Array(0,0,0,0).fill(0);
var obj_mission2 = new Array(0,0,0,0,0).fill(0);

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
            each_point = 6;
            document.getElementById("check_M1-1").innerText = selected;
            document.getElementById("check_M1-1_Total").innerText = selected*each_point;
            //データ数検証
            obj_mission1[1] = selected;
            obj_mission1[0] = Number(obj_mission1[1]) + Number(obj_mission1[2]) + Number(obj_mission1[3]);
            if(Number(obj_mission1[0])<=3){
                caution_flag[0] = 0;
            }
            else{
                caution_flag[0] = 1;
            }
            break;
        case 2:
            each_point = 10;
            document.getElementById("check_M1-2").innerText = selected;
            document.getElementById("check_M1-2_Total").innerText = selected*each_point;
            //データ数検証
            obj_mission1[2] = selected;
            obj_mission1[0] = Number(obj_mission1[1]) + Number(obj_mission1[2]) + Number(obj_mission1[3]);
            if(Number(obj_mission1[0])<=3){
                caution_flag[0] = 0;
            }
            else{
                caution_flag[0] = 1;
            }
            break;
        case 3:
            each_point = 16;
            document.getElementById("check_M1-3").innerText = selected;
            document.getElementById("check_M1-3_Total").innerText = selected*each_point;
            //データ数検証
            obj_mission1[3] = selected;
            obj_mission1[0] = Number(obj_mission1[1]) + Number(obj_mission1[2]) + Number(obj_mission1[3]);
            if(Number(obj_mission1[0])<=3){
                caution_flag[0] = 0;
            }
            else{
                caution_flag[0] = 1;
            }
            break;
        case 4:
            each_point=6;
            document.getElementById("check_M2-1").innerText = selected;
            document.getElementById("check_M2-1_Total").innerText = selected*each_point;
            //データ数検証
            obj_mission2[1] = selected;
            obj_mission2[0] = Number(obj_mission2[1]) + Number(obj_mission2[2]) + Number(obj_mission2[3]) + Number(obj_mission2[4]);
            if(Number(obj_mission2[0])<=2){
                caution_flag[1] = 0;
            }
            else{
                caution_flag[1] = 1;
            }
            break;
        case 5:
            each_point=-6;
            document.getElementById("check_M2-2").innerText = selected;
            document.getElementById("check_M2-2_Total").innerText = selected*each_point;
            //データ数検証
            obj_mission2[2] = selected;
            obj_mission2[0] = Number(obj_mission2[1]) + Number(obj_mission2[2]) + Number(obj_mission2[3]) + Number(obj_mission2[4]);
            if(Number(obj_mission2[0])<=2){
                caution_flag[1] = 0;
            }
            else{
                caution_flag[1] = 1;
            }
            break;
        case 6:
            each_point=10;
            document.getElementById("check_M2-3").innerText = selected;
            document.getElementById("check_M2-3_Total").innerText = selected*each_point;
            //データ数検証
            obj_mission2[3] = selected;
            obj_mission2[0] = Number(obj_mission2[1]) + Number(obj_mission2[2]) + Number(obj_mission2[3]) + Number(obj_mission2[4]);
            if(Number(obj_mission2[0])<=2){
                caution_flag[1] = 0;
            }
            else{
                caution_flag[1] = 1;
            }
            break;
        case 7:
            each_point=14;
            document.getElementById("check_M2-4").innerText = selected;
            document.getElementById("check_M2-4_Total").innerText = selected*each_point;
            //データ数検証
            obj_mission2[4] = selected;
            obj_mission2[0] = Number(obj_mission2[1]) + Number(obj_mission2[2]) + Number(obj_mission2[3]) + Number(obj_mission2[4]);
            if(Number(obj_mission2[0])<=2){
                caution_flag[1] = 0;
            }
            else{
                caution_flag[1] = 1;
            }
            break;
        case 8:
            each_point=13;
            document.getElementById("check_M3-1").innerText = selected;
            document.getElementById("check_M3-1_Total").innerText = selected*each_point;
            break;
        case 9:
            each_point=13;
            document.getElementById("check_M4-1").innerText = selected;
            document.getElementById("check_M4-1_Total").innerText = selected*each_point;
            break;
        case 10:
            each_point=4;
            document.getElementById("check_M5-1").innerText = selected;
            document.getElementById("check_M5-1_Total").innerText = selected*each_point;
            break;
        case 11:
            each_point=2;
            document.getElementById("check_M5-2").innerText = selected;
            document.getElementById("check_M5-2_Total").innerText = selected*each_point;
            break;
        case 12:
            each_point=2;
            document.getElementById("check_M5-3").innerText = selected;
            document.getElementById("check_M5-3_Total").innerText = selected*each_point;
            break;
        default:
            console.log("ERROR!!");
            break;
    }
    Score_array[mission] = each_point * selected;
    Score_sum();
    document.getElementById("Point-text").innerHTML = Score_array[0];
    document.getElementById("Point-textbox").value = Score_array[0];

    //データ数検証
    if(caution_flag[0]+caution_flag[1]==0){
        document.getElementById("caution_text").hidden = true;
    }
    else{
        document.getElementById("caution_text").hidden = false;
    }
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

function reset_pass(){
    document.getElementById("Pass-textbox").value = "999999";
};
