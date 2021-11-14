const targetDivCb = document.getElementById('color-blindness')
const targetDivMfr = document.getElementById('magnifier')
const HideDiv = document.getElementById('outer-box')
let cb_btn = document.getElementById("cb-button");
let mfr_btn = document.getElementById("mfr-button")

document.getElementById("cb-button").onclick = function opencb (){
    // console.log("inside opencb")
    if(targetDivCb.style.display == "none"){
        HideDiv.style.display = "none";
        targetDivMfr.display = "none"
        targetDivCb.style.display = "block";
    }
}

mfr_btn.onclick = function openmfr(){
    // console.log("inside openmfr")
    if(targetDivMfr.style.display == "none")
    {  
        HideDiv.style.display = "none";
        targetDivCb.display = "none"
        targetDivMfr.style.display = "block";
        
    }
}

document.getElementById("back-button1").onclick = function openob (){
    // console.log("inside openob")
    if(HideDiv.style.display == "none"){
        targetDivCb.style.display = "none";
        targetDivMfr.style.display = "none";
        HideDiv.style.display = "block";
    }
}
document.getElementById("back-button2").onclick = function openob (){
    // console.log("inside openob")
    if(HideDiv.style.display == "none"){
        targetDivCb.style.display = "none";
        targetDivMfr.style.display = "none";
        HideDiv.style.display = "block";
    }
}

//////////////////////////////
// for Magnification 

const magStr = document.getElementById("strength")
const magSize = document.getElementById("size")
const magShape = document.getElementById("shape")
const defaultBtn = document.getElementById("reset")
const applyBtn = document.getElementById("save")
//console.log(applyBtn);


// event listeners
applyBtn.addEventListener("click", save_options)

function save_options()
{

    let data = {
        tab_id : "magnifier",
        str : magStr.value,
        size : magSize.value,
        shape : magShape.value
    }

    // console.log(data)
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, data)
    })
    
}

//////////////////////////
// For colorblindness

//elements 
const prot_btn = document.getElementById("prot")
const deut_btn = document.getElementById("deut")
const trit_btn = document.getElementById("trit")

prot_btn.addEventListener("click", protanopia_func)
deut_btn.addEventListener("click", deutaranopia_func)
trit_btn.addEventListener("click", tritanopia_func)

function protanopia_func()
{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {tab_id : "protanopia"})
    })
}

function deutaranopia_func()
{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {tab_id : "deutaranopia"})
    })
}

function tritanopia_func()
{
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {tab_id : "tritanopia"})
    })
}