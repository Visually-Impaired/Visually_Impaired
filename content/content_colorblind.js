// console.log("hello")

// to create wrapper div around all imgs 
$("img").each(function(index, element) {
    $(element).wrap("<div class='cb-wrapperdiv'></div>");
});

// to add overlay div next to img 
const wrapper_div = document.getElementsByClassName("cb-wrapperdiv")
for(let i=0;i<wrapper_div.length;i++)
{
    let overlayDiv = document.createElement("div")
    overlayDiv.classList.add("overlay-div")
    wrapper_div[i].appendChild(overlayDiv);
}




chrome.runtime.onMessage.addListener(function(message, sender, sendRequest){
    if(message.tab_id == "protanopia" || message.tab_id == "deutaranopia" || message.tab_id == "tritanopia")
    {
        
        
        const wrapperDiv = document.getElementsByClassName("cb-wrapperdiv")
        
        for(let j=0;j<wrapperDiv.length;j++)
        {
            let inner_img = wrapperDiv[j].getElementsByTagName("img")[0];
            // console.log(inner_img)
            getColorPercent(inner_img)
        }
        
        
        
        // let imgs = document.getElementsByTagName("img");
        // console.log(imgs[3])
        
        
        // getRedPercent(imgs[3])
        
        function getColorPercent(current_img)
        {
        
            let img = new Image()
            img.crossOrigin = "anonymous"
            img.src = current_img.src
        
            // creating the canvas
            let w = current_img.width
            let h = current_img.height
            let canvas = document.createElement("canvas")
            canvas.width = w
            canvas.height = h 
        
            let ctx = canvas.getContext("2d")
            let pixel; 
            img.onload = function() {
                ctx.drawImage(img, 0, 0);
                pixel = ctx.getImageData(0,0,w,h)
                readImage(pixel, current_img)
              };
        }
        
        function readImage(imageData, actual_img)
        {
            let reds = 0;
            let greens = 0;
            let blues = 0;
            let total = 0;
            for(let i=0;i<imageData.data.length; i+=4)
            {
                reds += imageData.data[i]
                greens += imageData.data[i+1]
                blues += imageData.data[i+2]
                total += imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]
            }
            // console.log("reds: " + reds)
            // console.log("total: " + total)
        
            let red_percentage = (reds/total)*100
            let green_percentage = (greens/total)*100
            let blue_percentage = (blues/total)*100
            // console.log("percentage red in image: " + percentage + "%")
            // if(percentage>30)
            // {
            //     coloroverlay(actual_img)
            // }

            if(message.tab_id == "protanopia" && red_percentage>30)
            {
                // console.log("prot")
                coloroverlay(actual_img);
            }
            else if(message.tab_id == "deutaranopia" && green_percentage>30)
            {
                // console.log("deut")
                coloroverlay(actual_img)
            }
            else if(message.tab_id == "tritanopia" && blue_percentage>30)
            {
                // console.log("trit")
                coloroverlay(actual_img)
            }
        
            // increasing filters for every image 
            actual_img.style.filter = "contrast(150%)"
            actual_img.style.filter = "saturate(150%)"
        }
        
        
        function coloroverlay(actual_img)
        {
            let parentDiv = actual_img.parentElement;
            let overlay_div = parentDiv.getElementsByClassName("overlay-div")[0]
            
            parentDiv.style.position = "relative"
            actual_img.style.display = "block"

            overlay_div.style.position = "absolute"
            overlay_div.style.left = "0";
            overlay_div.style.top = "0";
            overlay_div.style.bottom = "0";
            overlay_div.style.right = "0";
            overlay_div.style.width = "100%"
            overlay_div.style.height = "100%"


            if(message.tab_id == "protanopia")
            {
                overlay_div.style.backgroundColor = "rgba(76, 69, 213, 0.35)";
            }
            else if(message.tab_id == "deutaranopia")
            {
                // to be changed
                overlay_div.style.backgroundColor = "rgba(237, 24, 122, 0.2)";
            }
            else if(message.tab_id == "tritanopia")
            {
                // to be changed
                overlay_div.style.backgroundColor = "rgba(255, 245, 0, 0.4)";
            }        
            // console.log(message.tab_id)
        }
    }
})

