window.onload = function(){
    var check = document.getElementsByClassName("checkbox")[0];
    var tag = false;
    var uNmame = document.getElementById("username");
    var upass = document.getElementById("userpass");
    var tip = document.getElementById("tip");
    var regBtn = document.getElementsByClassName("regBtn")[0];
    var yzBtn = document.getElementsByClassName("yzBtn")[0];
    var yzCode = document.getElementById("yzCode");
    var inputCode = document.getElementById("inputCode");
    var icon = document.getElementsByClassName("icon-Group-")[0];
    var delBtn = document.getElementsByClassName("icon-cha")[0];

    var toDEL = document.getElementsByClassName("main_right")[0];
    delBtn.onclick = function () {
        this.style.display = "none";
        toDEL.style.width = "280px";
    }
    //获取验证码
    function  getCode() {
        var code = "";
        var index = 0;
        var pattern = /(?!^[a-z]+$)^[a-z0-9]{4}$/i;
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
            'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        while(1){
            code = "";
            for(var i = 0; i < 4; i++){
                index = parseInt(Math.random()*52);
                code += codeChars[index];
            }
            if(pattern.test(code)){
                return code;
                break;
            }
        }
    }
    //检测用户名
    function checkName(self){
        var val = self.value;
        var patter = /^1[3-8][0-9]{9}$/;
        if(patter.test(val)) {
            tip.innerHTML = "手机号输入正确";
            tip.className = "right";
            return true;
        }else {
            tip.innerHTML = "手机号输入错误，手机号11位";
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
            icon.style.display = "none";
            return true;
        }else {
            tip.innerHTML = "密码输入错误，字母开头，数字字母结合，8-12位";
            tip.className = "wrong";
            icon.style.display = "inline-block";
            return false;
        }
    }
    //检测验证码
    function checkCOde(code1, code2) {
        if(code1.toUpperCase() === code2.toUpperCase()&& code1!=""){
            tip.innerHTML = "验证码输入正确";
            tip.className = "right";
            return true;
        }else {
            tip.innerHTML = "验证码输入错误";
            tip.className = "wrong";
            return false;
        }
    }
    //是否选择
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
    //生成验证码
    var code = "phr7";
    yzBtn.onclick = function(){
        code = getCode();
        yzCode.value = code;
    }
    //注册
    regBtn.onclick = function(){
        if(checkName(uNmame)&&checkPass(upass)&&checkCOde(inputCode.value, code)) {
            tip.innerHTML = "注册成功！";
            tip.className = "right";
            code = getCode();
            yzCode.value = code;
            return true;
        }else {
            code = getCode();
            yzCode.value = code;
            return false;
        }
    }
    inputCode.onblur = function(){
            console.log(this.value);
           checkCOde(this.value, code);
    }
}