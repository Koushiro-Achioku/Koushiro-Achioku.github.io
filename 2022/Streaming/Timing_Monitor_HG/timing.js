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
        [9,0,0,"開場前"],
        [9,15,0,"運営準備"],
        [9,45,0,"準備"],
        [9,50,0,"開会式"],
        [15,30,0,"調整①"],
        [15,40,0,"車検①"],
        [16,00,0,"競技①"],
        [16,30,0,"調整②"],
        [16,40,0,"車検②"],
        [17,00,0,"競技②"],
        [17,00,0,"閉会式"],
        [18,00,0,"撤収"],
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

function EventTime2(){
    let event_array = [
        [10,30,0,"準備"],
        [10,40,0,"開会式"],
        [14,15,0,"調整①"],
        [14,20,0,"車検①"],
        [15,45,0,"競技①"],
        [15,15,0,"調整②"],
        [15,25,0,"車検②"],
        [15,45,0,"競技②"],
        [16,00,0,"閉会式"],
        [17,00,0,"撤収"],
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
            document.getElementById("CurrentEvent-text2").innerHTML = event_array[i][3];
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

    document.getElementById("EventTime-text2").innerHTML = RemainTime_array[0]+":"+RemainTime_array[1]+":"+RemainTime_array[2];
    setTimeout("EventTime2()", 1000);
}
