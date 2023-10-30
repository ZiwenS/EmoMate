
function openLogin(){
    window.location.href="./login.html";
}

function register(e){
    var username=$("#username").val();
    var password=$("#password").val();
    var age=$("#age").val();
    var re_password=$("#re_password").val();
    var radios = document.getElementsByName('sex');
    var sex="";
    for(var i=0; i<radios.length; i++){
        if(radios[i].checked){
            sex=radios[i].value;
            break;
        }
    }
    if(!username || !password || !re_password || !sex || !age){
        alert("The username or password or Re_password or sex cannot be empty!");
        return;
    }
    if(password!=re_password){
        alert("The two password entries are inconsistent!");
        return;
    }
 
    window.localStorage.setItem("user",JSON.stringify({
        "username":username,
        "password":password,
        "gender":sex,
        "age":age
    }));
    window.location.href="./bmi.html";
}