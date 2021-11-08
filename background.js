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

    chrome.tabs.create({url: chrome.extension.getURL("summary/summary.html")})
    console.log("hello from background")
    document.getElementById("body").style.backgroundColor = red;
    console.log(sender)

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
    
    // console.log(sender)

}
