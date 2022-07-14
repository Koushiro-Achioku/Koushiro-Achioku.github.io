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

    //console.log(CureentTime_array);

    document.getElementById("CurrentTime-text").innerHTML = CureentTime_array[0]+":"+CureentTime_array[1]+":"+CureentTime_array[2];
    setTimeout("CurrentTime()", 1000);
}

function EventTime(){
    let event_array = [
        [13,10,0,"準備"],
        [13,15,0,"開会式"],
        [14,15,0,"調整①"],
        [14,25,0,"車検①"],
        [14,45,0,"競技①"],
        [15,15,0,"調整②"],
        [15,20,0,"車検②"],
        [15,40,0,"競技②"],
        [15,45,0,"閉会式"],
        [17,0,0,"撤収"],
    ];

    let now = new Date();

    let CureentTime_array = new Array(3);
    CureentTime_array[0] = now.getHours();
    CureentTime_array[1] = now.getMinutes();
    CureentTime_array[2] = now.getSeconds();

    var RemainTime_array = new Array(3);

    let time_sec = CureentTime_array[0]*3600 + CureentTime_array[1]*60 + CureentTime_array[2];
    
    console.log(time_sec);
    console.log(event_array.length);

    
    for(var i=0; i<event_array.length; i++){
        if(time_sec < event_array[i][0]*3600+event_array[i][1]*60+event_array[i][2]){
            RemainTime_array[0]=event_array[i][0];
            RemainTime_array[1]=event_array[i][1];
            RemainTime_array[2]=event_array[i][2];
            document.getElementById("CurrentEvent-text").innerHTML = event_array[i][3];
            break;
        }
    }

    RemainTime_array[0] -= CureentTime_array[0];
    RemainTime_array[1] -= CureentTime_array[1];
    RemainTime_array[2] -= CureentTime_array[2];

    if(RemainTime_array[2]<0){
        RemainTime_array[2]+=60;
        RemainTime_array[1]-=1;
    }

    if(RemainTime_array[1]<0){
        RemainTime_array[1]+=60;
        RemainTime_array[0]-=1;
    }

    if(RemainTime_array[2]<10){
        RemainTime_array[2] = "0" + RemainTime_array[2];
    }

    if(RemainTime_array[1]<10){
        RemainTime_array[1] = "0" + RemainTime_array[1];
    }

    document.getElementById("EventTime-text").innerHTML = RemainTime_array[0]+":"+RemainTime_array[1]+":"+RemainTime_array[2];
    setTimeout("EventTime()", 1000);
}
