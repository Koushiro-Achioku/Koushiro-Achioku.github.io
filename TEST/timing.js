let timer1;
var NowTime_array = new Array(4);

document.getElementById("start-button").onclick = function(){
    if(document.getElementById("StartTime").innerHTML=="Start:Ready"){
        console.log("start!");
        var now = new Date();
        StartTime_array[0] = now.getHours();
        StartTime_array[1] = now.getMinutes();
        StartTime_array[2] = now.getSeconds();
        StartTime_array[3] = now.getMilliseconds()

        document.getElementById("StartTime").innerHTML = "Start:" + StartTime_array[0] + "時" + StartTime_array[1] + "分" + StartTime_array[2] + "秒" + StartTime_array[3];
        document.getElementById("EndTime").innerHTML = "End:Now Running";
        document.getElementById("start-button-text").innerHTML="Stop";

        timer1 = setInterval(logging,1000);
    }
    else if(document.getElementById("EndTime").innerHTML == "End:Now Running"){
        console.log("end!");
        var now = new Date();
        EndTime_array[0] = now.getHours();
        EndTime_array[1] = now.getMinutes();
        EndTime_array[2] = now.getSeconds();
        EndTime_array[3] = now.getMilliseconds()

        document.getElementById("EndTime").innerHTML = "End:" + EndTime_array[0] + "時" + EndTime_array[1] + "分" + EndTime_array[2] + "秒" + EndTime_array[3];
        document.getElementById("start-button-text").innerHTML="-----";


        if(EndTime_array[3]>=StartTime_array[3]){
            RunningTime_array[3]=EndTime_array[3]-StartTime_array[3];
        }
        else{
            RunningTime_array[3]=1000+EndTime_array[3]-StartTime_array[3];
            EndTime_array[2]-=1;
        }

        if(EndTime_array[2]>=StartTime_array[2]){
            RunningTime_array[2]=EndTime_array[2]-StartTime_array[2];
        }
        else{
            RunningTime_array[2]=60+EndTime_array[2]-StartTime_array[2];
            EndTime_array[1]-=1;
        }

        if(EndTime_array[1]>=StartTime_array[1]){
            RunningTime_array[1]=EndTime_array[1]-StartTime_array[1];
        }
        else{
            RunningTime_array[1]=60+EndTime_array[1]-StartTime_array[1];
            EndTime_array[0]-=1;
        }
        
        var sec = RunningTime_array[1]*60 + RunningTime_array[2];
        
        document.getElementById("Time-textbox").value = sec+"."+RunningTime_array[3];
        
        if(RunningTime_array[3]<10){
            RunningTime_array[3]="00"+RunningTime_array[3];
        }
        else if(RunningTime_array[3]<100){
            RunningTime_array[3]="0"+RunningTime_array[3];
        }

        if(RunningTime_array[2]<10){
            RunningTime_array[2]="0"+RunningTime_array[2];
        }

        document.getElementById("RunningTime-text").innerHTML = RunningTime_array[1]+":"+RunningTime_array[2]+"."+RunningTime_array[3];

        clearInterval(timer1);
    }
};

function logging(){
    var now = new Date();
    NowTime_array[0] = now.getHours();
    NowTime_array[1] = now.getMinutes();
    NowTime_array[2] = now.getSeconds();
    NowTime_array[3] = now.getMilliseconds()
    
    //マイクロ秒計算
    if(NowTime_array[3]>=StartTime_array[3]){
        RunningTime_array[3]=NowTime_array[3]-StartTime_array[3];
    }
    else{
        RunningTime_array[3]=1000+NowTime_array[3]-StartTime_array[3];
        NowTime_array[2]-=1;
    }
    //秒計算
    if(NowTime_array[2]>=StartTime_array[2]){
        RunningTime_array[2]=NowTime_array[2]-StartTime_array[2];
    }
    else{
        RunningTime_array[2]=60+NowTime_array[2]-StartTime_array[2];
        NowTime_array[1]-=1;
    }
    //分計算(60分以内が前提)
    if(NowTime_array[1]>=StartTime_array[1]){
        RunningTime_array[1]=NowTime_array[1]-StartTime_array[1];
    }
    else{
        RunningTime_array[1]=60+NowTime_array[1]-StartTime_array[1];
        NowTime_array[0]-=1;
    }
    
    if(RunningTime_array[3]<10){
        RunningTime_array[3]="00"+RunningTime_array[3];
    }
    else if(RunningTime_array[3]<100){
        RunningTime_array[3]="0"+RunningTime_array[3];
    }
    
    if(RunningTime_array[2]<10){
        RunningTime_array[2]="0"+RunningTime_array[2];
    }
    
    console.log(NowTime_array[1]+":"+NowTime_array[2]+"."+NowTime_array[3]);    //ロギング
    document.getElementById("RunningTime-text").innerHTML = RunningTime_array[1]+":"+RunningTime_array[2]+"."+RunningTime_array[3];    //テキスト表示
}
