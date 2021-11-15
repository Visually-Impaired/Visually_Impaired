let pressed = {}

// event listener
document.addEventListener("keydown", wiki_func)

function wiki_func(event){
    pressed[event.key] = true;

    if (pressed['Shift'] && event.key == " ") {
        // window.location.href = 'https://www.wikipedia.org/'
        window.open('https://www.wikipedia.org/', '_blank').focus();
        //to move to wikipedia in new tab shift+space is clicked
        pressed['Shift'] = false
        pressed[" "] = false
      }
}

// speech recognition 
const SpeechRecognition3 = window.SpeechRecognition || window.webkitSpeechRecognition
const recognition3 = new SpeechRecognition3()



recognition3.continuous = true
// recognition.interimResults = true

// activating and deactivating voice recognition 

let recog_started2 = false

document.addEventListener("keypress", voice_rec_activation)

function voice_rec_activation(e)
{
  if(e.key == "f" && !recog_started2)
  {
    recog_started2 = true
    recognition3.start()
  }
  else if(e.key=='f' && recog_started2)
  {
    recognition3.stop();
    recog_started2 = false
  }
}

recognition3.onstart = function (){
  console.log("activated")
}

recognition3.onend = function (){
  console.log("deactivated")
}

recognition3.onresult = function(event){
  let current = event.resultIndex;
  let transcript = event.results[current][0].transcript
  wiki_command(transcript)
}

function wiki_command(order)
{
  console.log(order)
  // console.log("we're in user_command")
  if(order.toLowerCase() == "wikipedia")
  {
    window.open('https://www.wikipedia.org/', '_blank').focus();
  }
}