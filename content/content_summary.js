

    // creating button and putting it in a div
    const summaryDiv = document.createElement("div");
    const summaryButton = document.createElement('button');
    summaryButton.innerHTML = "Summary";
    summaryButton.id = "summary-button"
    summaryDiv.appendChild(summaryButton)

    // wikipedia element
    const pageHeading = document.getElementById("firstHeading");
    // const parentNode = document.getElementById("content")

    //appending button to page
    let wrapperDiv = document.createElement("div")
    pageHeading.parentNode.insertBefore(wrapperDiv, pageHeading.nextSibling);
    wrapperDiv.appendChild(pageHeading);
    wrapperDiv.appendChild(summaryDiv)

    //button styling
    summaryButton.style.padding = "10px 10px";
    summaryButton.style.border = "1px solid grey";
    summaryButton.style.backgroundColor = "#202124";
    summaryButton.style.borderRadius = "7px";
    summaryButton.style.color = "white";
    summaryButton.style.fontSize = "16px"

// trial code, to be removed lated
// const wiki_table = document.querySelector("table")
//     let next = wiki_table.nextElementSibling
//     let first_area = ""
//     // console.log(next)
//     let i=0
//     while(i<9)
//     {
//         // console.log(next.textContent)
//         if(next.tagName == "P")
//         {
//             first_area += next.textContent
//         }
        
//         next = next.nextElementSibling
//         i++
//     }
//     console.log(first_area)
    

//event listener on button
summaryButton.addEventListener('click', summaryClicked)

function summaryClicked(){

    let current_url = location.href
    let arr = current_url.split('/')
    let token = arr.at(-1)
    console.log(token)
    // add this token to the link needed for api 

    // let api_link = "https://7386-2401-4900-599e-f8b6-3149-f4f7-7fa7-c3bf.ngrok.io/" + token
    // let api_link = "https://git.heroku.com/dhrishti-final-api.git/" + token
    let api_link = "https://7386-2401-4900-599e-f8b6-3149-f4f7-7fa7-c3bf.ngrok.io/api/stuff"

    const xhr = new XMLHttpRequest();
    // xhr.open("GET", api_link)
    xhr.open("POST", api_link, true)
    // xhr.responseType = "text"
    // xhr.withCredentials = true;
    xhr.setRequestHeader("Content_Type", "application/json")
    let summary_wiki
    xhr.onreadystatechange = () => {
        if(this.readyState === XMLHttpRequest.DONE && this.status === 200)
        {
            summary_wiki = xhr.response
        // console.log(data_api)
        let title_wiki = pageHeading.textContent
        let data = {
            tab_id : "content_summary",
            title : title_wiki,
            summary : summary_wiki
            }
        chrome.runtime.sendMessage(data)
        }
        else
        {
            console.log("didn't work")
        }
        
    }

    // getting data of first part of wiki page
    let first_area = ""
    // const required_div = document.getElementById("toc")
    // let prev = required_div.previousElementSibling
    // while(prev.tagName != "TABLE")
    // {
    //     // console.log(prev.textContent);
    //     prev = prev.previousElementSibling
    // }
    const wiki_table = document.querySelector("table")
    let next = wiki_table.nextElementSibling
    // console.log(next)
    let i=0
    while(i<9)
    {
        // console.log(next.textContent)
        if(next.tagName == "P")
        {
            first_area += next.textContent
        }
        next = next.nextElementSibling
        i++
    }
    console.log(first_area)
    let post_data = {
        "text" : first_area
    }

    // console.log(typeof(JSON.stringify(post_data)))

    xhr.send(JSON.stringify(post_data))
   

    



        // chrome.runtime.sendMessage(message)
        // chrome.runtime.sendMessage({from:"content_summary", message:data})
        
        // console.log(title)

        // export {message}
    }
