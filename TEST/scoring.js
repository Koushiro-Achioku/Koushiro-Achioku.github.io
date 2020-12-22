function Score_sum(){
    Score_array[0]=0;
    for(let i=1; i<12 ; i++ ){
        Score_array[0]+=Score_array[i];
    }
}

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


