

//elements
const search = document.getElementById("searchInput")


//speech synthesis
const utterance = new SpeechSynthesisUtterance()

// to change the dialect to indian at page reload
// const voices = speechSynthesis.getVoices()
// window.addEventListener("load", () =>{
//   // utterance.voice = voices[0]
//   // console.log(utterance.voice)
//   console.log(speechSynthesis.getVoices())
// })
// console.log(utterance.voice)
utterance.rate = 1.5

// // speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continuous = true
recognition.interimResults = true

recognition.onstart = function (){
  utterance.rate = 1
  utterance.text = "Voice Recognition activated"
  speechSynthesis.speak(utterance)
}
recognition.onend = function (){
  utterance.rate = 1
  utterance.text = "Voice Recognition Deactivated"
  speechSynthesis.speak(utterance)
  utterance.text = `Text box says ${search.value}`
  speechSynthesis.speak(utterance)
  search.focus()

  
  
}
recognition.onresult = function(event){
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript
  search.value = transcript
}

//event listeners

//incase they're not on wikipedia 
if(search!=null)
{
  search.addEventListener('keydown', mykeyPress)
}

//to dictate topic name of wiki page on loading it
window.addEventListener('load', (event) => {
  const topic = document.getElementById("firstHeading")
  if(topic !=null)
  {
    utterance.rate = 1
    utterance.text = topic.innerText;
    speechSynthesis.speak(utterance)
  }
});


let keysPressed = {}
document.addEventListener('keydown', (event) => {
  keysPressed[event.key] = true;

  if(search!=null)  
  {
    if(keysPressed[' '] && event.key == 'ArrowUp')
    {
      recognition.start()
    }
    if(keysPressed[' '] && event.key == 'ArrowDown')
    {
      recognition.stop()
    }
  }
  
});
document.addEventListener('keyup', (event) => {
  delete keysPressed[event.key];

  // to bring cursor to search bar to search 
  if(event.key == '/')
  {
    if(search!=null)
    {

      search.focus()
      search.select()  
      search.value = ""    
    }
    
  }
});


function mykeyPress(e){
  console.log(e.key)

  
  utterance.text = e.key 
  if(e.keyCode ==32)
  {
    // utterance.text = "space"
    // console.log(search.value)
    utterance.text = search.value
  }
  speechSynthesis.speak(utterance)
}

