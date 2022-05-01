var timer1;

function logging(){
    let NowTime_array = new Array(4);
    let now = new Date();
    NowTime_array[0] = now.getHours();
    NowTime_array[1] = now.getMinutes();
    NowTime_array[2] = now.getSeconds();
    NowTime_array[3] = now.getMilliseconds();
    
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
    
    let min = RunningTime_array[1];
    let sec = RunningTime_array[2];
    let microsec = RunningTime_array[3];

    if(microsec<10){
        microsec = "00" + microsec;
    }
    else if(microsec<100){
        microsec = "0" + microsec;
    }

    if(sec<10){
        sec = "0" + sec;
    }

    document.getElementById("RunningTime-text").innerHTML = min + ":" + sec + "." + microsec;
    
    console.log(NowTime_array[1]+":"+NowTime_array[2]+"."+NowTime_array[3]);    //ロギング
}

document.getElementById("start-button").onclick = function(){
    if(document.getElementById("StartTime").innerHTML=="Start:Ready"){
        console.log("start!");
        let now = new Date();
        StartTime_array[0] = now.getHours();
        StartTime_array[1] = now.getMinutes();
        StartTime_array[2] = now.getSeconds();
        StartTime_array[3] = now.getMilliseconds()

        document.getElementById("StartTime").innerHTML = "Start:" + StartTime_array[0] + ":" + StartTime_array[1] + ":" + StartTime_array[2] + "." + StartTime_array[3];
        document.getElementById("EndTime").innerHTML = "End:Running";
        document.getElementById("start-button-text").innerHTML="Stop";

        timer1 = setInterval(logging,1000);
    }
    else if(document.getElementById("EndTime").innerHTML == "End:Running"){
        console.log("end!");
        let now = new Date();
        EndTime_array[0] = now.getHours();
        EndTime_array[1] = now.getMinutes();
        EndTime_array[2] = now.getSeconds();
        EndTime_array[3] = now.getMilliseconds()

        document.getElementById("EndTime").innerHTML = "End:" + EndTime_array[0] + ":" + EndTime_array[1] + ":" + EndTime_array[2] + "." + EndTime_array[3];
        document.getElementById("start-button-text").innerHTML = "Reset";


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
        
        let min_and_sec = RunningTime_array[1]*60 + RunningTime_array[2];
        let min = RunningTime_array[1];
        let sec = RunningTime_array[2];
        let microsec = RunningTime_array[3];
        
        if(microsec<10){
            microsec = "00" + microsec;
        }
        else if(microsec<100){
            microsec = "0" + microsec;
        }

        if(sec<10){
            sec = "0" + sec;
        }

        document.getElementById("RunningTime-text").innerHTML = min + ":" + sec + "." + microsec;

        if(microsec>=500){
            min_and_sec = min_and_sec + 1;
        }

        //タイム書き込み
        Time = min_and_sec;
        document.getElementById("Time-textbox").value = min_and_sec;
        document.getElementById("Time-text").innerHTML = min_and_sec;

        //スピード計算・書き込み
        document.getElementById("Speed").innerHTML = Speed(Pattern,Time);
        document.getElementById("Speed-textbox").value = Speed(Pattern,Time);
        document.getElementById("Speed-text").innerHTML = Speed(Pattern,Time);

        clearInterval(timer1);
    }
    else if(document.getElementById("start-button-text").innerHTML == "Reset"){
        document.getElementById("start-button-text").innerHTML = "Start";
        document.getElementById("StartTime").innerHTML = "Start:Ready";
        document.getElementById("EndTime").innerHTML = "End:Ready";
        document.getElementById("RunningTime-text").innerHTML = "0:00.000";
    }
};
