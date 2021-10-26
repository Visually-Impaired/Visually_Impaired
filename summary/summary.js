const heading = document.getElementById("sum-heading")
const summaryBody = document.getElementById("outer_box")



chrome.runtime.sendMessage({tab_id:"summary"}, function(response)
{
    heading.textContent = response.title
    summaryBody.textContent = response.summary
})

