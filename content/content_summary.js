

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





//event listener on button
summaryButton.addEventListener('click', summaryClicked)

function summaryClicked(){

    let current_url = location.href
    let arr = current_url.split('/')
    let token = arr.at(-1)
    console.log(token)
    // add this token to the link needed for api 

    let api_link = "https://c104-117-241-165-48.ngrok.io/api/" + token

    // const xhr = new XMLHttpRequest();
    // xhr.open("GET", "https://regres.in/api/users")
    // xhr.responseType = "json"
    // xhr.withCredentials = true;
    // // xhr.setRequestHeader("Content_Type", "application/json")
    // const data_api = ""
    // xhr.onload = () => {
    //     data = xhr.response
    //     console.log(data_api)
    // }
    // xhr.send()



  





    // send GET request with the wiki token the backend 
    let summary_wiki = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."

    let title_wiki = pageHeading.textContent
    let data = {
        tab_id : "content_summary",
        title : title_wiki,
        summary : summary_wiki
    }

        // chrome.runtime.sendMessage(message)
        // chrome.runtime.sendMessage({from:"content_summary", message:data})
        chrome.runtime.sendMessage(data)
        // console.log(title)

        // export {message}
    }
