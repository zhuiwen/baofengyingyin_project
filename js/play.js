window.onload = function(){
    var video = document.getElementsByClassName("video")[0];
    var title = document.getElementsByClassName("title")[0];
    var sTitle = document.getElementsByClassName("sTitle")[0];
    var likeMovie = document.getElementsByClassName("likeMovie")[0];
    var hotM = document.getElementsByClassName("hotMovie")[0];
    var moviePaihang = document.getElementsByClassName("moviePaihang")[0];
    console.log(title);
    var comBtn = document.getElementsByClassName("comBtn");
    var commentSec = document.getElementsByClassName("commentSec")[0];
    var commentBtn = document.getElementsByClassName("commentBtn")[0];
    var text = document.getElementsByTagName("textarea")[0];
    //创建ajax；
    var tag = 0;
    var comArr = [];
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
    //封装ajax匹配成功的处理函数
    function  playVideo(obj,arr) {
        var len = arr.length;
        for(var i = 0; i < len; i++){
            if(arr[i].id == id) {
                obj.src = arr[i].videourl;
                title.innerHTML = arr[i].name;
                sTitle.innerHTML = arr[i].name;
            }
        }

    }
    // 获取页面的id
    var id = window.location.href.split("?")[1].split("=")[1];
    console.log(id);
    //播放热门推荐视频
    var recomm = {
        "url":"../recommend.txt",
        "type": "get",
        "success": function(objArr){
            playVideo(video,objArr);
        }
    };
    createAjax(recomm);
    //播放热映大片
    var hot = {
        "url":"../hot.txt",
        "type": "get",
        "id": id,
        "success": function(objArr){
            playVideo(video,objArr);
        }
    };
    createAjax(hot);
    //随机显示猜你喜欢
    var likeRandom = {
        "url":"../youlike.txt",
        "type": "get",
        "success": function(objArr){
            objArr.sort(function () {
                return Math.random() - 0.5;
            });
            var len = objArr.length;
            for(var i = 0; i < len; i++){
                likeMovie.innerHTML += "<li><a href = '"+objArr[i].url+"'><img src = '"+objArr[i].src+"'><p class=\"name\">"+objArr[i].name+"</p><p class=\"intro\">"+objArr[i].infro+"</p> <p class=\"pinfeng\">"+objArr[i].score+"</p></a></li>";
            }

        }
    };
    createAjax(likeRandom);
    //按上映时间降序排序热门影片
    var hotMOvie = {
        "url":"../hot2.txt",
        "type": "get",
        "success": function(objArr){
            objArr.sort(function (a,b) {
                return Date.parse(b.date ) - Date.parse(a.date);
            });
            var len = objArr.length;
            for(var i = 0; i < len; i++){
                hotM.innerHTML += "<li><img src = '"+objArr[i].src+"'><p class=\"name\">"+objArr[i].name+"</p></a></li>";
            }

        }
    };
    createAjax(hotMOvie);
    //按评分排序电影
    console.log(moviePaihang);
    var PaihangM = {
        "url":"../rankingList.txt",
        "type": "get",
        "success": function(objArr){
            objArr.sort(function (a,b) {
                return Date.parse(b.score ) - Date.parse(a.score);
            });
            var len = objArr.length;
            for(var i = 0; i < len; i++){
               if(i == 0){
                   moviePaihang.innerHTML += "<li><a href=\"javascript:;\"><img src='"+objArr[0].src+"'> <div class=\"bottom\"> <span class=\"ranking\">"+(i+1)+"</span><span class=\"name\">"+objArr[i].name+"</span></div></a></li>"
               }else {
                   moviePaihang.innerHTML += "<li><span class=\"ranking\">"+(i+1)+"</span><span class=\"name\">"+objArr[i].name+"</span><span class=\"pinfeng\">"+objArr[i].score+"</span></li>"
               }
            }

        }
    };
    createAjax(PaihangM);
    //评论部分
    function createCom(obj,arr){
        obj.innerHTML = "";
        var cd = arr.length;
        for(var i = 0; i<cd; i++){
            obj.innerHTML += "<li> <a href=\"javascript:;\" class=\"headerImg\"><img src=\"../images/image/header.jpg\" alt=\"\"><p class=\"name\">"+arr[i].usename+"</p> <p class=\"titme\">"+arr[i].time+"</p></a> <p class=\"content\">"+arr[i].content+" </p> <span class=\"iconfont icon-dianzan\"><span style = \"color: #d8d8d8\">"+parseInt(Math.random()*1000)+"</span> </span></li>"
        }
    }
    var comment = {
        "url": "../comment.txt",
        "type": "get",
        "success" : function (objArr) {

            var len = objArr.length;
            comArr = [];
            for(var i = 0; i < len; i++){
                if(title.innerText == objArr[i].name){
                    comArr.push(objArr[i]);

                }
            }
            comArr.sort(function(a,b){
                return a.Id-b.Id;
            });

            createCom(commentSec,comArr);
            comBtn[0].onclick = function(){
                this.id = "blue";
                comBtn[1].id = "";
                tag = 0;
                comArr.sort(function(a,b){
                    return a.Id-b.Id;
                });
                console.log(comArr);
                createCom(commentSec,comArr);
            }
            comBtn[1].onclick = function(){
                this.id = "blue";
                comBtn[0].id = "";
                tag = 1;
                comArr.sort(function(a,b){
                    return Date.parse(b.time) - Date.parse(a.time);
                });
                console.log(comArr);
                createCom(commentSec,comArr);
            }
        }
    }
    createAjax(comment);
    //发表评论
    commentBtn.onclick = function(){
        var li = document.createElement("li");
        var now = new Date();
        if( text.value == ""){
            alert("评论不能为空");
            return false;
        }
        var subTime = commentSec.getElementsByClassName("titme");
        console.log(subTime);

        var id = parseInt(Math.random()*400 ) + 5;
        var time1 = now.getFullYear() + "-" + (now.getMonth() + 1) + "-"+now.getDate();
        li.innerHTML = "<a href=\"javascript:;\" class=\"headerImg\"><img src=\"../images/image/header.jpg\" alt=\"\"><p class=\"name\">"+'老热家'+"</p> <p class=\"titme\">"+ time1 +"</p></a> <p class=\"content\">"+ text.value +" </p> <span class=\"iconfont icon-dianzan\"><span style = \"color: #d8d8d8\">"+parseInt(Math.random()*1000)+"</span> </span>";
        comArr.push({
            Id: id,
            name: sTitle.innerHTML,
            usename: "老热家",
            time: time1,
            content: text.value
        });

        if(tag == 1){
            comArr.sort(function(a,b){
                return Date.parse(b.time) - Date.parse(a.time);
            });

            createCom(commentSec,comArr);
        }else {

            comArr.sort(function(a,b){
                return a.Id-b.Id;
            });
            createCom(commentSec,comArr);
        }
        if(subTime.length == 0) {
            commentSec.appendChild(li);
        }
        console.log(comArr);
        text.value = "";
    }
}