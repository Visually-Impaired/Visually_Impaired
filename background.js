chrome.runtime.onMessage.addListener(newTab)
let content_newtab_id
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
    console.log(sender)
}
