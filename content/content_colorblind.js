// console.log("hello")

chrome.runtime.onMessage.addListener(function(message, sender, sendRequest){
    if(message.tab_id == "protanopia")
    {
        var imgs = document.getElementsByTagName("img");
        console.log(imgs[1]);

        // for(let i=0; i<imgs.length; i++){
        //     //console.log(imgs[i].alt);
        //     //getRedPercent(imgs[i]);
        // }

        getRedPercent(imgs[1]);

        function getRedPercent(current_img){
            var w = current_img.width;
            var h = current_img.height;

            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = w;
            canvas.height = h;

            var image = new Image();
            image.src = current_img.src;
            console.log(image.src);
            // image.onload = () => {
            //     ctx.drawImage(image, 0, 0);
            // }

            ctx.drawImage(image, w, h);
            var imageData = ctx.getImageData(0, 0, w, h);

            var reds = 0;
            var reds2 = 0;
            var others = 0;
            for(let j=0; j<imageData.data.length; j+=4){
                //imageData.data[i] == red
                //imageData.data[i+1] == green
                //imageData.data[i+2] == blue
                var red = imageData.data[j];
                var green = imageData.data[j+1];
                var blue = imageData.data[j+2];
                //console.log(red, green, blue);
                //console.log(red>blue);
                //console.log(red>green);
                console.log(red>20);
                if(red>blue && red>green){
                    //this is a red pixel
                    console.log("inside red");
                    reds++;
                }
                else if(red>20){
                    reds2++;
                }
                others++;
            }
            console.log("reds", reds);
            console.log("reds2", reds2);
            console.log("others", others);
            var percent = (reds/others)*100;
            console.log(percent);
            if(percent>=20){
                coloroverlay(current_img);
            }
        }

        // var style = document.createElement('style');
        // style.type = 'text/css';
        // style.innerHTML = ".overlay{background-color: rgba(174, 155, 183, 255); position: absolute; top: 0;left: 0;width:100%; height:100%;}"

        // for(let i=0; i<imgs.length; i++){
        //     coloroverlay(imgs[i], "DIV");
        // }
        coloroverlay(imgs[1], "DIV");
        coloroverlay(imgs[2], "DIV");
        coloroverlay(imgs[3], "DIV");
        coloroverlay(imgs[4], "DIV");
        coloroverlay(imgs[5], "DIV");

        function coloroverlay(currentTag, targetTag){
            if(currentTag.nodeName === targetTag){
                console.log(currentTag);
                currentTag.style.position = "relative";
                var imageDiv = document.createElement('div');
                currentTag.appendChild(imageDiv);
                imageDiv.style.backgroundColor = "rgba(76, 69, 213, 0.5)";
                imageDiv.style.position = "absolute";
                imageDiv.style.left = "0";
                imageDiv.style.top = "0";
                imageDiv.style.width = "100%";
                imageDiv.style.height = "100%";
                // return currentTag;
            }
            else{
                coloroverlay(currentTag.parentElement, targetTag);
            }
        }

        // function coloroverlay(img){
        
        //     var outerDiv = findParentDiv(img, "DIV");
        //     console.log(outerDiv);
        //     //var imageDiv = document.createElement('span');
        //     //imageDiv.appendChild(img);
        //     // imageDiv.style.background = "rgba(174, 155, 183, 255)";
        //     // imageDiv.style.top = "0";
        //     // imageDiv.style.left = "0";
        //     //img.style.position = "absolute";
        //     // img.style.width = "100%";
        //     // img.style.height = "100%";
        // }
    }
})

