function Score_sum(){
    Score_array[0]=0;
    for(let i=1; i<12 ; i++ ){
        Score_array[0]+=Score_array[i];
    }
}

//M1-1
document.getElementById("radio_select_M1-1_0").onclick = function(){
    Score_array[1]=0;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M1-1_1").onclick = function(){
    Score_array[1]=9;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M1-1_2").onclick = function(){
    Score_array[1]=18;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

//M1-2
document.getElementById("radio_select_M1-2_0").onclick = function(){
    Score_array[2]=0;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M1-2_1").onclick = function(){
    Score_array[2]=6;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M1-2_2").onclick = function(){
    Score_array[2]=12;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

//M2-1
document.getElementById("radio_select_M2-1_0").onclick = function(){
    Score_array[3]=0;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M2-1_1").onclick = function(){
    Score_array[3]=12;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M2-1_2").onclick = function(){
    Score_array[3]=24;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M2-1_3").onclick = function(){
    Score_array[3]=36;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M2-1_4").onclick = function(){
    Score_array[3]=48;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

//M2-2
document.getElementById("radio_select_M2-2_0").onclick = function(){
    Score_array[4]=0;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M2-2_1").onclick = function(){
    Score_array[4]=8;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};

document.getElementById("radio_select_M2-2_2").onclick = function(){
    Score_array[4]=16;
    Score_sum();
    document.getElementById("Point-text").innerHTML=Score_array[0];
};