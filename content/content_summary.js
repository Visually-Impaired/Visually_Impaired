

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


    // fetch('https://regres.in/api/users', {
    //     mode : 'no-cors',
    //     credentials : "include",
    //     method : 'GET'
    // }).then(res =>console.log(res)).then(data => console.log(data)).catch(error => console.log(error.message))


//event listener on button
summaryButton.addEventListener('click', summaryClicked)

function summaryClicked(){

    let current_url = location.href
    let arr = current_url.split('/')
    let token = arr.at(-1)
    console.log(token)
    // add this token to the link needed for api 

    let api_link = "https://7386-2401-4900-599e-f8b6-3149-f4f7-7fa7-c3bf.ngrok.io/" + token
    // let api_link = "https://git.heroku.com/dhrishti-final-api.git/" + token

    const xhr = new XMLHttpRequest();
    xhr.open("GET", api_link)
    // xhr.responseType = "text"
    // xhr.withCredentials = true;
    // xhr.setRequestHeader("Content_Type", "application/json")
    let summary_wiki
    xhr.onload = () => {
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
    xhr.send()
   

    



        // chrome.runtime.sendMessage(message)
        // chrome.runtime.sendMessage({from:"content_summary", message:data})
        
        // console.log(title)

        // export {message}
    }
