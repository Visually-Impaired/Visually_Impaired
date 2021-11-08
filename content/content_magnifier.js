chrome.runtime.onMessage.addListener(function(message, sender, sendRequest){
    if(message.tab_id == "magnifier")
    {
        chrome.runtime.sendMessage(message)
        console.log(message)
    }
})