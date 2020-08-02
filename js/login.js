window.onload = function(){
    var check = document.getElementsByClassName("checkbox")[0];
    var tag = false;
    var tag2 = false;
    var uNmame = document.getElementById("username");
    var upass = document.getElementById("userpass");
    var tip = document.getElementById("tip");
    var logBtn = document.getElementsByClassName("logBtn")[0];
    var delBtn = document.getElementsByClassName("icon-cha")[0];
    var toDEL = document.getElementsByClassName("main_right")[0];
    delBtn.onclick = function () {
        this.style.display = "none";
        toDEL.style.width = "280px";
    }

    var users = [
        {
            "tel":"13456565767",
            "pass":"f564f65hj8"
        },
        {
            "tel":"18207513289",
            "pass":"fv346923"
        },
        {
            "tel":"13607514050",
            "pass":"as346923"
        }
    ];
    //设置cookie
    function setCookie(key,val,day) {
        var now = new Date();
        now.setDate(now.getDate()+day);
        document.cookie = key + "=" + val + "; expires=" + now;
    }
    //删除cookie
    function removeCookie(key){
        setCookie(key,"",-1);
    }
    var cookie = document.cookie;

    if(cookie){
        arr = cookie.split("; ");
        var len = arr.length;
        uNmame.value = arr[0].split("=")[1];
        upass.value = arr[1].split("=")[1];
    }
    var len = users.length;
    //检测用户名
    function checkName(self){
        var val = self.value;
        var patter = /^1[3-8][0-9]{9}$/;
        if(patter.test(val)) {
            tip.innerHTML = "手机号输入正确";
            tip.className = "right";
            return true;
        }else {
            tip.innerHTML = "手机号格式错误，手机号11位";
            tip.className = "wrong";
            return false;
        }
    }
    //检测用户密码
    function checkPass(self){
        var val = self.value;
        var patter = /(?!^[a-zA-Z]+$)^[a-zA-Z][a-zA-Z0-9]{7,11}$/;
        if(patter.test(val)) {
            tip.innerHTML = "密码输入正确";
            tip.className = "right";
            return true;
        }else {
            tip.innerHTML = "密码输入错误，字母开头，数字字母结合，8-12位";
            tip.className = "wrong";
            return false;
        }
    }
    //是否选择记住我
    check.onclick = function(){
        if(tag = !tag) {
            this.style.backgroundPositionX = "19px";
        }else {
            this.style.backgroundPositionX = "0px";
        }
        return false;
    }
    //用户名检测事件
    uNmame.onblur = function(){
        checkName(this);
    };
    //用户密码检测事件；
    upass.onblur = function(){
        checkPass(this);
    }
    //登录
    logBtn.onclick = function(){

        if(checkName(uNmame)&&checkPass(upass)) {
            for(var i = 0; i < len; i++){
                if(uNmame.value == users[i].tel && upass.value == users[i].pass){
                    tag2 = true;
                    break;
                }
            };
           if(tag2){
               tip.innerHTML = "登录成功！";
               tip.className = "right";
           }else {
               tip.innerHTML = "登录失败! 用户不存在，请先注册！";
               tip.className = "wrong";
               return false;
           };
            if(tag){

                setCookie("tel",uNmame.value,7);
                setCookie("pass", upass.value,7);
            };
            return true;
        }
    }
}