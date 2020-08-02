window.onload = function () {
    var navLi = document.getElementsByClassName("main_topNavMenu")[0].children;
    var len = navLi.length;
    var lunbo1 = document.getElementsByClassName("lunbo1")[0].children;
    var len1 = lunbo1.length;
    var lunbo2 = document.getElementsByClassName("lunbo2")[0].children;
    var btn = document.getElementsByClassName("btn");
    var main_banner = document.getElementsByClassName("main_banner")[0];
    var rec = document.getElementsByClassName("rec")[0];
    var hotMovie = document.getElementsByClassName("hotMovie")[0];
    var vip_btn = document.getElementsByClassName("vip_btn");
    var vipUl = document.getElementsByClassName("vipUl")[0];
    var step = 0;
    var len2 = vipUl.children.length;

    //vip左右按钮点击事件
    vip_btn[0].onclick = function(){
        step ++;
        console.log(step);
        if(step>len2/2 + 1){
            step = 0;
        }

        bufferMove(vipUl, {"left":-215 * step })
    }
    vip_btn[1].onclick = function(){
        step --;
        console.log(step);
        if(step < 0){
            step = parseInt(len2/2)+1;
        }

        bufferMove(vipUl, {"left":-215 * step });
    }
    //创建ajax
    function createAjax(json) {
        if(window.XMLHttpRequest){
            var ajax = new XMLHttpRequest();
        }else {
            var ajax = new ActiveXObject("Microsoft.XMLHttp");
        }
        if(json.type.toUpperCase() == "GET"){
            url = json.data?json.url + "?" + json.data : json.url;
            ajax.open('get',url,true);
            ajax.send(null);
        }else {
            ajax.open('post',url,true);
            ajax.setRequestHeader("content-type","application/x-www-form-urlencoded");
            ajax.send(json.data);
        }
        ajax.onreadystatechange = function(){
            if(ajax.readyState == 4 && ajax.status == 200){
                json.success && json.success(eval(ajax.responseText));
            }
        }
    }
    //页面主体顶部导航栏点击事件
    for(var i = 0; i < len; i++){
        navLi[i].index = i;
        navLi[i].onclick = function () {
            for (var j = 0; j < len; j++){
                navLi[j].className = "";
            }
            this.className = "active";
        }
    }
    // 获取元素非行内样式
    function  getStyle(obj,attr) {
       return  getComputedStyle(obj) ? getComputedStyle(obj)[attr] : obj.currentStyle[attr];
    }
    //实现缓冲运动
    function bufferMove(obj, json){
        clearInterval(obj.timer);
        var tag = true;
        obj.timer = setInterval(function () {
            for(var attr in json){
                if(attr == "opacity") {
                    var start = parseFloat(getStyle(obj,attr))*100;
                }else {
                    var start = parseInt(getStyle(obj,attr));
                }
                var speed = (json[attr] - start) / 10;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if(start != json[attr]){
                    tag = false;
                }
                if(attr == "opacity") {
                    obj.style[attr] =( start + speed)/100;
                }else {
                    obj.style[attr] = start + speed + "px";
                }
            }
            if(tag){
                clearInterval(obj.timer);
            }
        },30);
    }
    function auto(index){
        for(var k = 0; k<len1; k++){
            bufferMove(lunbo1[k],{"opacity": "0"});
            bufferMove(lunbo2[k],{"opacity": "50"});
            lunbo2[k].className = "";
        }
        bufferMove(lunbo1[index],{"opacity": "100"});
        bufferMove(lunbo2[index],{"opacity": "100"});
        lunbo2[index].className = "active";
    }
    var index = 0;
    btn[1].onclick = function(){
        index ++ ;
        if(index >= len1){
            index = 0;
        }
        auto(index);
    }
    btn[0].onclick = function(){
        index -- ;
        if(index < 0){
            index = len1 - 1;
        }
        auto(index);
    }
    for(var j = 0; j < len1; j++){
        lunbo2[j].index = j;
        lunbo2[j].onclick = function () {
            auto(this.index);
            index = this.index;
        }
    }
    var timer =  setInterval(function () {
        index++;
        if(index>=len1){
            index = 0;
        }
       auto(index);
    },3000);
    main_banner.onmousedown = function () {
        clearInterval(timer);
    };
    main_banner.onmouseup = function () {
        timer =  setInterval(function () {
            index++;
            if(index>=len1){
                index = 0;
            }
            auto(index);
        },3000);
    }
    /*------------------------------------------------------------------*/
    function  add(obj,arr) {
        var len = arr.length;
        for(var i = 0; i < len; i ++){
            obj.innerHTML += "<li><a href='"+arr[i].url+"'> <img src = '"+arr[i].src+"'><p class=\"title\">"+arr[i].name+"</p> <p class=\"intro\">"+arr[i].infro+"</p> <p class=\"pinfen\">"+arr[i].score+"</p> <div class=\"vip_icon\"></div><div class=\"pinzhi\">"+arr[i].pinzhi+"</div></a></li>";
        }

    }
    //热门推荐
    var recomm = {
        "url":"../recommend.txt",
        "type": "get",
        "success": function(objArr){
            objArr = objArr.sort(function (a,b) {
                return parseFloat( b.score - a.score);
            });

            add(rec ,objArr)
        }
    };
    createAjax(recomm);
    //热映大片
    var hot = {
        "url":"../hot.txt",
        "type": "get",
        "success": function(objArr){
            objArr = objArr.sort(function (a,b) {

                return Date.parse(b.date) - Date.parse(a.date);
            });
           
            add(hotMovie ,objArr)
        }
    };
    createAjax(hot);
}