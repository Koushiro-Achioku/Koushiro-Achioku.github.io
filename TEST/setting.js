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

//点数計算関数
function Scoring(mission,selected){
    let each_point;
    switch(mission){
        case 1:
            each_point=9;
            break;
        case 2:
            each_point=6;
            break;
        case 3:
            each_point=12;
            break;
        case 4:
            each_point=8;
            break;
        case 5:
            each_point=10;
            break;
        case 6:
            each_point=4;
            break;
        case 7:
            each_point=8;
            break;
        case 8:
            each_point=7;
            break;
        case 9:
            each_point=6;
            break;
        case 10:
            each_point=5;
            break;
        case 11:
            each_point=-7;
            break;
        default:
            console.log("ERROR!!");
            break;
    }
    Score_array[mission] = each_point * selected;
    Score_sum();
    document.getElementById("Point-text").innerHTML = Score_array[0];
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