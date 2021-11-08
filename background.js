let title_data = ""
let summary_data = ""

chrome.runtime.onMessage.addListener(newTab)
// let content_newtab_id
function newTab(message, sender, sendResponse)
{
    // if(message.from = "content_newtab")
    // {
    //     content_newtab_id = sender.tab.id
    // }
    // if(message.from == "content_summary")
    // {
    //     chrome.tabs.sendMessage(content_newtab_id, message)
    // }

    // chrome.tabs.create({url: chrome.extension.getURL("summary/summary.html")})
    // console.log("hello from background")
    // document.getElementById("body").style.backgroundColor = red;
    // console.log(sender)

    if(message.tab_id === "content_summary")
    {
        title_data = message.title
        summary_data = message.summary
        chrome.tabs.create({url: chrome.extension.getURL("summary/summary.html")})
    }
    if(message.tab_id === "summary")
    {
        sendResponse({title: title_data, summary : summary_data})
    }
    if(message.tab_id == "magnifier")
    {
        let magnifierStrength = message.str
        let magnifierSize = message.size
        let magnifierShape = message.shape

        chrome.tabs.captureVisibleTab({format : "png"}, function(screenshotUrl){
            chrome.tabs.insertCSS(sender.tab.id, {file : "/magnifier/snapshot2.css"}, function(){
                chrome.tabs.executeScript(sender.tab.id, {file : "/magnifier/jquery-3.2.1.min.js"}, function(){
                    chrome.tabs.executeScript(sender.tab.id, {file : "/magnifier/magnifying-glass.js"}, function(){
                        chrome.tabs.getZoom(sender.tab.id, function(zoomFactor){
                            chrome.tabs.sendMessage(sender.tab.id, {                        
                                snapshot_url : screenshotUrl,
                                magnifier_str : magnifierStrength,
                                magnifier_size : magnifierSize,
                                magnifier_shape : magnifierShape,
                                page_zoom : zoomFactor,
                            })
                        })
                    })
                })
            })
        })
    }
    
    // console.log(sender)

}
