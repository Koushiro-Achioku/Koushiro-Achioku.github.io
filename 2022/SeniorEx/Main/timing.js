var timer1;

function logging(){
    //現在時刻を取得、配列に保存
    let NowTime_array = new Array(4);
    let now = new Date();
    NowTime_array[0] = now.getHours();
    NowTime_array[1] = now.getMinutes();
    NowTime_array[2] = now.getSeconds();
    NowTime_array[3] = now.getMilliseconds();
    
    //現在時刻から始動時刻の差を取る
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
    
    //ストップウォッチの時間を配列に保存
    let min = RunningTime_array[1];
    let sec = RunningTime_array[2];
    let microsec = RunningTime_array[3];

    //小数点以下表記の修正
    if(microsec<10){
        microsec = "00" + microsec;
    }
    else if(microsec<100){
        microsec = "0" + microsec;
    }
    //秒数表記の修正
    if(sec<10){
        sec = "0" + sec;
    }

    //HTMLに表示
    document.getElementById("RunningTime-text").innerHTML = min + ":" + sec + "." + microsec;
    
    console.log(NowTime_array[1]+":"+NowTime_array[2]+"."+NowTime_array[3]);    //ロギング
}

//ストップウォッチボタンのクリックイベント
document.getElementById("start-button").onclick = function(){
    if(document.getElementById("StartTime").innerHTML=="Start:Ready"){  //ストップウォッチ始動前に押された場合
        console.log("start!");
        //現在時刻を取得、配列に保存
        let now = new Date();
        StartTime_array[0] = now.getHours();
        StartTime_array[1] = now.getMinutes();
        StartTime_array[2] = now.getSeconds();
        StartTime_array[3] = now.getMilliseconds()

        //スタート時間を表記
        document.getElementById("StartTime").innerHTML = "Start:" + StartTime_array[0] + ":" + StartTime_array[1] + ":" + StartTime_array[2] + "." + StartTime_array[3];
        document.getElementById("EndTime").innerHTML = "End:Running";
        document.getElementById("start-button-text").innerHTML="Stop";

        //1秒ごとにタイムを表示
        timer1 = setInterval(logging,1000);
    }
    else if(document.getElementById("EndTime").innerHTML == "End:Running"){  //ストップウォッチ動作中に押された場合
        console.log("end!");
        //現在時刻を取得、配列に保存
        let now = new Date();
        EndTime_array[0] = now.getHours();
        EndTime_array[1] = now.getMinutes();
        EndTime_array[2] = now.getSeconds();
        EndTime_array[3] = now.getMilliseconds()

        //終了時刻を表記
        document.getElementById("EndTime").innerHTML = "End:" + EndTime_array[0] + ":" + EndTime_array[1] + ":" + EndTime_array[2] + "." + EndTime_array[3];
        document.getElementById("start-button-text").innerHTML = "Reset";

        //終了時刻から始動時刻の差を取る
        //マイクロ秒計算
        if(EndTime_array[3]>=StartTime_array[3]){
            RunningTime_array[3]=EndTime_array[3]-StartTime_array[3];
        }
        else{
            RunningTime_array[3]=1000+EndTime_array[3]-StartTime_array[3];
            EndTime_array[2]-=1;
        }
        //秒計算
        if(EndTime_array[2]>=StartTime_array[2]){
            RunningTime_array[2]=EndTime_array[2]-StartTime_array[2];
        }
        else{
            RunningTime_array[2]=60+EndTime_array[2]-StartTime_array[2];
            EndTime_array[1]-=1;
        }
        //分計算(60分以内が前提)
        if(EndTime_array[1]>=StartTime_array[1]){
            RunningTime_array[1]=EndTime_array[1]-StartTime_array[1];
        }
        else{
            RunningTime_array[1]=60+EndTime_array[1]-StartTime_array[1];
            EndTime_array[0]-=1;
        }
        
        //ストップウォッチの時間を配列に保存
        let min_and_sec = RunningTime_array[1]*60 + RunningTime_array[2];
        let min = RunningTime_array[1];
        let sec = RunningTime_array[2];
        let microsec = RunningTime_array[3];
        
        //小数点以下表記の修正
        if(microsec<10){
            microsec = "00" + microsec;
        }
        else if(microsec<100){
            microsec = "0" + microsec;
        }
        //秒数表記の修正
        if(sec<10){
            sec = "0" + sec;
        }

        //HTMLに表示
        document.getElementById("RunningTime-text").innerHTML = min + ":" + sec + "." + microsec;

        //タイムの小数点以下を四捨五入
        if(microsec>=500){
            min_and_sec = min_and_sec + 1;
        }

        //秒数打ち込み欄に自動入力
        document.getElementById("Time-textbox").value = min_and_sec;
        document.getElementById("Time-text").innerHTML = min_and_sec;

        clearInterval(timer1);  //タイマーをリセット
    }
    else if(document.getElementById("start-button-text").innerHTML == "Reset"){  //ストップウォッチ動作後に押された場合
        //始動前の状態にリセット
        document.getElementById("start-button-text").innerHTML = "Start";
        document.getElementById("StartTime").innerHTML = "Start:Ready";
        document.getElementById("EndTime").innerHTML = "End:Ready";
        document.getElementById("RunningTime-text").innerHTML = "0:00.000";
    }
};
