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