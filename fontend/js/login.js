
function openUser(){
    window.location.href="./register.html";
}

function login(e){
    var username=$("#username").val();
    var password=$("#password").val();
    if(username && password){
        $.ajax({
            url:"http://127.0.0.1:3001/login",
            method:"post",
            data:{
                "username":username,
                "password":password,
            },
            success:function(data){
                if(data.status_code==200){
                    window.localStorage.setItem("now_user",JSON.stringify(data.data));
                    window.location.href="./index.html";
                }
                alert(data.message);
            },
        });
    }else{
        alert("The username or password cannot be empty!");
    }
}