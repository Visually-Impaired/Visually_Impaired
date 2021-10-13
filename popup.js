// console.log("hello");
const targetDiv = document.getElementById('color-blindness')
console.log(targetDiv)
const HideDiv = document.getElementById('outer-box')
let cb_btn = document.getElementById("cb-button");
console.log(cb_btn)

document.getElementById("cb-button").onclick = function opencb (){
    console.log("inside opencb")
    if(targetDiv.style.display == "none"){
        HideDiv.style.display = "none";
        targetDiv.style.display = "block";
    }
}
// function opencb(){
    
// };

// document.addEventListener('DOMContentLoaded', function () {
// document.getElementById('cb-button').addEventListener('click', opencb, false)
// const targetDiv = document.getElementById('color-blindness')
//     function opencb () {
//         if(targetDiv.style.display == "none"){
//             targetDiv.style.display = "block";
//         }
//             // var color = document.getElementById("color").value  
//             // chrome.tabs.query({currentWindow: true, active: true}, function (tabs) {
//             //   chrome.tabs.sendMessage(tabs[0].id, color)
//             // })
//     }
// }, false)
