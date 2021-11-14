
// elements
const heading = document.getElementById("sum-heading")
const textInput = document.getElementById("outer-box")
const speedInput = document.getElementById('speed')
const playButton = document.getElementById('play-button')
const pauseButton = document.getElementById('pause-button')
const stopButton = document.getElementById('stop-button')

// to replace data with placeholders
chrome.runtime.sendMessage({tab_id:"summary"}, function(response)
{
    heading.textContent = response.title
    textInput.textContent = response.summary
})

//event handlers
playButton.addEventListener('click',()=>{
    playText(textInput.textContent)
})
pauseButton.addEventListener('click', pauseText)
stopButton.addEventListener('click', stopText)
speedInput.addEventListener('input', ()=>{
    stopText()
    playText(utterance.text.substring(currentCharacter))
})

document.addEventListener("keydown", (e) => {
    if(e.key == "f")
    {
        playText(textInput.textContent);
    }
    else if(e.key == "g")
    {
        pauseText();
    }
    else if(e.key == "h")
    {
        stopText();
    }
} )


// this is the character index of the character where the text has stopped
let currentCharacter

//creating utterance
const utterance = new SpeechSynthesisUtterance()

//to get the character index of current character where the text has stopped
utterance.addEventListener('boundary', e=>{
    currentCharacter = e.charIndex
})   

// //to enable text area when speaking is finished
// utterance.addEventListener('end', ()=>{
//     textInput.disabled = false
// })
 

function playText(text){

    //when paused
    if(speechSynthesis.paused && speechSynthesis.speaking){
        return speechSynthesis.resume()
    }

    // to avoid repeating speech again after it's completed, if play button pressed twice
    if(speechSynthesis.speaking) return;

    //text of the utterance
    utterance.text = text

    //speed of speech
    utterance.rate = speedInput.value || 1

    // // to disable text area during speaking
    // textInput.disabled = true

    //to actually make it speak
    speechSynthesis.speak(utterance)
}

function pauseText(){
    if(speechSynthesis.speaking)
    {
        speechSynthesis.pause()
    }
}

function stopText(){
    //incase paused 
    speechSynthesis.resume()

    speechSynthesis.cancel()
}
