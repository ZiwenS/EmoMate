        // JavaScript code for handling user selections and responses
        const emotionButtons = document.querySelectorAll(".emotion-button");
        const container = document.querySelector(".container");
       
        var user={};
        $(function(){
            var now_user=window.localStorage.getItem("now_user");
            if(now_user){
                user=JSON.parse(now_user);
                console.log(user);
            }else{
                alert("Please Login first!");
                window.location.href="./login.html";
            }
        })

        let todaymood="";
        let emotionSelected = false; // Track if an emotion has been selected

        emotionButtons.forEach((button) => {
            button.addEventListener("click", () => {
                if (emotionSelected) {
                    // If an emotion has already been selected, do nothing
                    return;
                }

                emotionSelected = true;
                const selectedEmotion = button.value;
                todaymood=button.value;
                let responseMessage;

                switch (selectedEmotion) {
                    case 'Fantastic':
                        responseMessage = "That's wonderful to hear! Feeling fantastic is a great way to start or go through the day. What's making you feel so fantastic today? Is there anything specific you'd like to talk about or share?";
                        break;
                    case 'Good':
                        responseMessage = "I'm glad to hear that you're doing well! 😄 If you have any questions or if there's anything specific you'd like to chat about or know more about, feel free to let me know. I'm here to help!";
                        break;
                    case 'Alright':
                        responseMessage = "It's okay to have days when you're feeling just alright and not particularly excited. We all have those moments. If there's anything you'd like to talk about or if you have any questions or topics you'd like to explore, feel free to share, and I'm here to assist or chat about whatever is on your mind! 😊";
                        break;
                    case 'NotGreat':
                        responseMessage = "I'm sorry to hear that you're not doing too great. It's completely okay to have days when you're not feeling your best. If you'd like to talk about what's bothering you, share your thoughts, or if there's anything specific you'd like to discuss or ask, please feel free to do so. I'm here to listen and provide support or information if I can.";
                        break;
                    case 'Bad':
                        responseMessage = "I’m really sorry to hear that you're feeling quite bad today. It's important to acknowledge and address your emotions. If you'd like to talk about what's going on or share why you're feeling this way, please feel free to do so. Talking about it can sometimes help, and I'm here to listen and offer support or advice if needed. Remember, it's okay to have difficult days, and there are people and resources available to help you through them.";
                        break;
                    default:
                        responseMessage = "I'm here to listen and chat. Feel free to share your thoughts or ask any questions.";
                }

                // Create a new response message element with the bot-message class
                const newResponseMessage = document.createElement("div");
                newResponseMessage.className = "message bot-message";
                newResponseMessage.innerHTML = responseMessage;

                // Append the new response message to the conversation container
                container.appendChild(newResponseMessage);

                container.appendChild(newResponseMessage);
             

                // Disable all emotion buttons
                emotionButtons.forEach((btn) => {
                    btn.disabled = true;
                });
                
                // Add "Yes, I want to talk more" and "Maybe later" buttons
                const buttonResponseMessage = document.createElement("div");
                buttonResponseMessage.className = "text_align_center";
                const talkMoreButton = document.createElement("button");
                talkMoreButton.textContent = "Yes, I want to talk more please!";
                talkMoreButton.className = "message Subuser-message";

                const maybeLaterButton = document.createElement("button");
                maybeLaterButton.textContent = "Maybe later, let's explore other interesting things!";
                maybeLaterButton.className = "message Subuser-message";

                let textAreBox;
                talkMoreButton.addEventListener("click", () => {
                    // Handle the "Yes, I want to talk more" button click
                    // You can add your code to handle this action here.
                    maybeLaterButton.disabled=true;
                    talkMoreButton.disabled=true;
                    textAreBox=document.createElement("div");
                    textAreBox.className="message user-message";
                    textAreBox.innerHTML=`
                        <div class="mb-3">
                            <label for="saytext" class="form-label">Please type what you want to say:</label>
                            <textarea class="form-control" id="saytext" rows="3"></textarea>
                        </div>
                        <div>
                            <button type="button" class="btn btn-primary" id="saySubmit" onclick="toSay()">Submit</button>
                        </div>
                    `;                    
                    container.appendChild(textAreBox);
                });
                
              
                maybeLaterButton.addEventListener("click", () => {
                    // Handle the "Maybe later" button click
                    // You can add your code to handle this action here.
                    window.location.href="./ExploreMore.html";
                });

                buttonResponseMessage.appendChild(talkMoreButton);
                buttonResponseMessage.appendChild(maybeLaterButton);

                container.appendChild(buttonResponseMessage);
            });
        });

var bl=true;

//创建上传格式
function createText(saytext){
    text="My mood today is "+todaymood+`,My age is ${user.Age} years old and I am ${user.Gender},The question I want to ask is this:${saytext}`;
    return text;
}

function toSay(){
    var saytext=$("#saytext").val();
    $.ajax({
        url:"http://127.0.0.1:3001/tosay",
        method:"post",
        data:{
            "saytext":createText(saytext),
        },
        success:function(data){
            console.log(data);
            var str="";
            data.chat_text[0].forEach(item=>{
                if(item!=""){
                    $("#saytext").attr("disabled","ture");
                    $("#saySubmit").attr("disabled","ture");
                    str=str+`<p>${item}</p>`;
                }
            })
            create(str);
        },
    });
}

function back(){
    bl=false;

}

function create(str){
    const container = document.querySelector(".container");
    const message=document.createElement("div");
    message.classList="message bot-message";
    message.innerHTML=str;
    container.appendChild(message);
    if(bl){
        let textAreBox=document.createElement("div");
        textAreBox.className="message user-message";
        let mb=document.createElement("div");
        let label=document.createElement("label");
        label.className="form-label";
        label.innerHTML="Please type what you want to say:";
      
        let textarea=document.createElement("textarea");
        textarea.className="form-control";
        textarea.rows=3;
        mb.appendChild(label);
        mb.appendChild(textarea);
        textAreBox.appendChild(mb);

        let buttonBox=document.createElement("div");
        buttonBox.style.marginTop="1rem";
        let btn=document.createElement("button");
        let maybeLaterButton=document.createElement("button");
        maybeLaterButton.textContent = "Maybe later, let's explore other interesting things!";
        maybeLaterButton.className = "btn btn-primary";
        maybeLaterButton.style.marginLeft="1rem";
        btn.className="btn btn-primary";
        btn.innerHTML="Submit";
        
        buttonBox.appendChild(btn);
        buttonBox.appendChild(maybeLaterButton);
        textAreBox.appendChild(buttonBox);
        container.appendChild(textAreBox);

        maybeLaterButton.addEventListener("click", () => {
            window.location.href="./ExploreMore.html";
        });
        btn.addEventListener("click", () => {
            $.ajax({
                url:"http://127.0.0.1:3001/tosay",
                method:"post",
                data:{
                    "saytext":createText(textarea.value),
                },
                success:function(data){
                    console.log(data);
                    var str="";
                    data.chat_text[0].forEach(item=>{
                        if(item!=""){
                            textarea.disabled=true;
                            btn.disabled=true;
                            maybeLaterButton.disabled=true;
                            str=str+`<p>${item}</p>`;
                        }
                    })
                    create(str);
                },
            });
        });
    }
}




