

var column=0;
let now_topic={};
let topic_choose=[];
let user={};

$(function(){
    $("#topic_box").hide();
    $("#start_box").show();
    var now_user=window.localStorage.getItem("user");
    if(now_user){
        user=JSON.parse(now_user);
    }else{
        alert("Please register first!");
        window.location.href="./register.html";
    }
    now_topic=bmi_list[0];
});

//创建题目
function create(){
    var html=`
        <div class="choose_title">
            <h1>I am someone who…</h1>
            <p class="title">${now_topic.bid}.${now_topic.title}</p>
        </div>
        <div class="choose_content">
            <div class="choose_box">
    `;
    now_topic.item.forEach((item,index)=>{
        html+=`
            <p>
                <input onclick="chooose()" type='radio' id="radio${index}" name='radio' value="${item.code}" />
                <label for='radio${index}'>${item.content}</label>
            </p>
        `;
    });
    html+=` </div>`;
    if(column>0){
        html+=`
        <div class="button_box">
            <button type="button" onclick="back()">Back</button>
        `;
    }
    if(column==(bmi_list.length-1)){
        html+=`
            <button type="button" style="position: absolute;right: 10%;" onclick="submitTopic()">Submit</button>
        </div>
        `;
    }else{
        html+=`</div>`;
    }
    html+=`
        </div>
    `;
    $("#topic_box").html(html);

    //动画效果 先显示标题 再显示内容
    $(".choose_content").css("opacity","0");
    $(".choose_content").animate({
        opacity:1
    },1000);
    $(".choose_title").css("opacity","0");
    $(".choose_title").animate({
        opacity:1
    },500);
}


//选中按钮触发
function chooose(){
    if(column==(bmi_list.length-1)){
        var value=$("input[name='radio']:checked")[0].value;
        topic_choose[column]={
            ...now_topic,
            "value":value
        };
    }else{
        var value=$("input[name='radio']:checked")[0].value;
        topic_choose.push({
            ...now_topic,
            "value":value
        });
        column++;
        now_topic=bmi_list[column];
        create();
    }
}

//返回上一题
function back(){
    if(topic_choose.length==bmi_list.length){
        topic_choose.pop();
    }
    column--;
    now_topic=bmi_list[column];
    topic_choose.pop();
    //console.log(topic_choose);
    create();    
}

//提交题目
function submitTopic(){
    if(topic_choose.length==bmi_list.length){
        let now_topic=getPartitioncharacter();
        //统计平均分
        var agreeableness_sum=0;
        var conscientiousness_sum=0;
        var extraversion_sum=0;
        var neuroticism_sum=0;
        var openness_sum=0;
        now_topic.Agreeableness.forEach(item=>{
            agreeableness_sum=agreeableness_sum*1+item.value*1;
        });
        now_topic.Conscientiousness.forEach(item=>{
            conscientiousness_sum=conscientiousness_sum*1+item.value*1;
        });
        now_topic.Extraversion.forEach(item=>{
            extraversion_sum=extraversion_sum*1+item.value*1;
        });
        now_topic.Neuroticism.forEach(item=>{
            neuroticism_sum=neuroticism_sum*1+item.value*1;
        });
        now_topic.Openness.forEach(item=>{
            openness_sum=openness_sum*1+item.value*1;
        });



        var agreeableness_average=(agreeableness_sum/now_topic.Agreeableness.length).toFixed(2);
        var conscientiousness_average=(conscientiousness_sum/now_topic.Conscientiousness.length).toFixed(2);
        var extraversion_average=(extraversion_sum/now_topic.Extraversion.length).toFixed(2);
        var neuroticism_average=(neuroticism_sum/now_topic.Neuroticism.length).toFixed(2);
        var openness_average=(openness_sum/now_topic.Openness.length).toFixed(2);
        $.ajax({
            url:"http://127.0.0.1:3001/register",
            method:"post",
            data:{
                "username":user.username,
                "password":user.password,
                "age":user.age,
                "gender":user.gender,
                "agreeableness":agreeableness_average,
                "conscientiousness":conscientiousness_average,
                "extraversion":extraversion_average,
                "neuroticism":neuroticism_average,
                "openness":openness_average
            },
            success:function(data){
                alert(data.message);
                window.localStorage.removeItem("user");
                window.location.href="./login.html";
            },
            error:function(er){
                alert("error");
            }
        });
        
    }else{
        alert("Please complete all the questions!");
    }
}

//将选择的内容改为五种性格的分区
function getPartitioncharacter(){
    var now_topic={
        "Extraversion":[],
        "Agreeableness":[],
        "Conscientiousness":[],
        "Neuroticism":[],
        "Openness":[]
    };

    topic_choose.forEach(item=>{
        if(item.bid==1 || item.bid==6 || item.bid==11 || item.bid==16 || item.bid==21 || item.bid==26 || item.bid==31 || item.bid==36){
            now_topic.Extraversion.push(item);
        }else if(item.bid==2 || item.bid==7 || item.bid==12 || item.bid==17 || item.bid==22 || item.bid==27 || item.bid==32 || item.bid==37 || item.bid==42){
            now_topic.Agreeableness.push(item);
        }else if(item.bid==3 || item.bid==8 || item.bid==13 || item.bid==18 || item.bid==23 || item.bid==28 || item.bid==33 || item.bid==38 || item.bid==43){
            now_topic.Conscientiousness.push(item);
        }else if(item.bid==4 || item.bid==9 || item.bid==14 || item.bid==19 || item.bid==24 || item.bid==29 || item.bid==34 || item.bid==39){
            now_topic.Neuroticism.push(item);
        }else if(item.bid==5 || item.bid==10 || item.bid==15 || item.bid==20 || item.bid==25 || item.bid==30 || item.bid==35 || item.bid==40 || item.bid==41 || item.bid==44){
            now_topic.Openness.push(item);
        }
    });
    return now_topic;
}

//进入开始答题页面
function openStart(){
    var div=$("#start_box")[0].style;
    var timer = setInterval(function () {
        if (div.opacity <= 0) {
            clearInterval(timer);
            $("#topic_box").show();
            $("#start_box").hide();
            create();
        }
        div.opacity = div.opacity - 0.05;
    }, 30)
    //console.log( div.opacity = div.opacity - 0.01 );
}