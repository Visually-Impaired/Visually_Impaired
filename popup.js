const targetDiv = document.getElementById('color-blindness')
const HideDiv = document.getElementById('outer-box')
let cb_btn = document.getElementById("cb-button");

document.getElementById("cb-button").onclick = function opencb (){
    console.log("inside opencb")
    if(targetDiv.style.display == "none"){
        HideDiv.style.display = "none";
        targetDiv.style.display = "block";
    }
}

document.getElementById("back-button").onclick = function openob (){
    console.log("inside openob")
    if(HideDiv.style.display == "none"){
        targetDiv.style.display = "none";
        HideDiv.style.display = "block";
    }
}
