// element & getting text to dictate 
const content = document.querySelectorAll("p, h2")
// const search = document.getElementById("searchInput")

let total_text = ""
let command = ""

// console.log(p_tag[0].textContent)
for(let i=0; i<content.length; i++)
{
  // console.log(content[i].textContent)
  total_text += content[i].textContent + "\n"
}

// utterance 
const utterance2 = new SpeechSynthesisUtterance()
// utterance2.voice = voices[0]

// to change the dialect to indian at page reload
// utterance2.voice = speechSynthesis.getVoices()[0]
// console.log(utterance2.voice)

// // speech recognition
const SpeechRecognition2 = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition2 = new SpeechRecognition2()

recognition2.continuous = true
// recognition.interimResults = true

// activating and deactivating voice recognition 

let recog_started = false

document.addEventListener("keypress", voice_rec_activation)

function voice_rec_activation(e)
{
  if(e.key == "f" && !recog_started)
  {
    
    // utterance.rate = 1
    // utterance.text = "Voice Recognition activated"
    // speechSynthesis.speak(utterance)
    pauseText()
    // setTimeout(recognition.start(), 20000)
    // if(search.value != "") return;
    recog_started = true
    recognition2.start()
    
  }
  else if(e.key=='f' && recog_started)
  {
    // if(search.value != "") return;
    recognition2.stop();
    // utterance.rate = 1
    // utterance.text = "Voice Recognition Deactivated"
    // speechSynthesis.speak(utterance)
    recog_started = false
    // user_command(command)
  }
}

recognition2.onstart = function (){
  console.log("activated")
}

recognition2.onend = function (){
  console.log("deactivated")
}

recognition2.onresult = function(event){
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript
  // console.log(transcript)
  user_command(transcript)
  command = transcript
}

function user_command(order)
{
  console.log(order)
  // console.log("we're in user_command")
  if(order == "play")
  {
    playText(total_text)
  }
  else if(order == "pause")
  {
    pauseText()
  }
  else if(order == "stop")
  {
    stopText()
  }
  // else if(order == "down")
  // {

  // }
  // else if(order == "up")
  // {

  // }
  else
  {
    utterance2.text = "sorry, command could not be understood";
    // console.log(utterance2.text)
    speechSynthesis.speak(utterance2)
  }
}

function playText(text)
{
  if(speechSynthesis.paused && speechSynthesis.speaking)
  {
    return speechSynthesis.resume()
  }
  if(speechSynthesis.speaking) return;

  utterance2.text = text
  speechSynthesis.speak(utterance2)
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


/////////
// voice activation and deactivation on the key press F 