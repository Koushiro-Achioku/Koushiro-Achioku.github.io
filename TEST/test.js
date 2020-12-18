var RunningTime_array = new Array(0,1,47,999);
var ConfirmedTime_array = new Array(0,0,0,0);

function handicap_set(coefficient){
    var sec = RunningTime_array[1]*60 + RunningTime_array[2];
    var handisec = sec*coefficient;

    var confirmedmin = Math.floor(handisec/60);
    var confirmedsec = Math.floor(handisec-confirmedmin*60);
    var confirmedmillisec = Math.floor(handisec*1000 - (confirmedmin*60+confirmedsec)*1000)+Math.floor(RunningTime_array[3]*coefficient);

    if(confirmedmillisec>1000){
        confirmedmillisec-=1000;
        confirmedsec+=1;
    }

    ConfirmedTime_array[1]=confirmedmin;
    ConfirmedTime_array[2]=confirmedsec;
    ConfirmedTime_array[3]=confirmedmillisec;
}

console.log(confirmedmin+":"+confirmedsec+"."+confirmedmillisec);