window.onload = function(){
    var moviesUl = document.getElementsByClassName("movies_item")[0];
    var navBtn = document.getElementsByClassName("movies_nav")[0].children;
    var temp = 0;
    var temp1 = 0;
    var selecBtn = document.getElementsByClassName("moviesSelec")[0].children;
    //创建ajax；
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
    //时间降序
    function reSort1(obj1,obj2){
        return Date.parse(obj2.date)-Date.parse(obj1.date );
    }
    //评分降序
    function reSort2(obj1,obj2){
        return obj2.score - obj1.score;
    }
    //绘制页面
    var draw = {
        "url":"../movies.txt",
        "type": "get",
        "success": function(objArr){
            moviesUl.innerHTML="";
           if(temp1 == 0 ) {
               objArr.sort(function(a,b){
                   return reSort1(a,b);//按时间排序
               });
           }else {
               objArr.sort(function(a,b){
                   return reSort2(a,b);//按评分排序
               });
           }
           var len = objArr.length;
           for(var i = 0; i< len; i++){
                   if(temp == 0){
                       moviesUl.innerHTML += " <li class = '"+objArr[i].className+"'><a href= '"+objArr[i].url+"'><img src='"+objArr[i].src+"' alt=\"\"><p class=\"name\">"+objArr[i].name+" <p class=\"infro\">"+objArr[i].infro+"</p><p class=\"score\">"+objArr[i].score+"</p> <p class=\"pingzhi\">"+objArr[i].pinzhi+"</p> <div class=\"sprite\"></div></p> </a> </li>";
                   }else if(temp == 1){
                       if(objArr[i].className == "vipfree"){
                           moviesUl.innerHTML += " <li class = '"+objArr[i].className+"'><a href= '"+objArr[i].url+"'><img src='"+objArr[i].src+"' alt=\"\"><p class=\"name\">"+objArr[i].name+" <p class=\"infro\">"+objArr[i].infro+"</p><p class=\"score\">"+objArr[i].score+"</p> <p class=\"pingzhi\">"+objArr[i].pinzhi+"</p> <div class=\"sprite\"></div></p> </a> </li>";
                       }
                   }else {
                       if(objArr[i].className == "vipagio"){
                           moviesUl.innerHTML += " <li class = '"+objArr[i].className+"'><a href= '"+objArr[i].url+"'><img src='"+objArr[i].src+"' alt=\"\"><p class=\"name\">"+objArr[i].name+" <p class=\"infro\">"+objArr[i].infro+"</p><p class=\"score\">"+objArr[i].score+"</p> <p class=\"pingzhi\">"+objArr[i].pinzhi+"</p> <div class=\"sprite\"></div></p> </a> </li>";
                       }
                   }
           }
        }
    };
    createAjax(draw);//绘制所有的
    /*-------------------------------------------------------------*/
    //全部按钮 免费按钮 折扣按钮
    function getActive(self,obj) {
        var len2 = obj.length;
        for(var i = 0; i< len2; i++){
            obj[i].className = "";
        }
        self.className = "active";
    }
    var cd = navBtn.length;
    for(var j = 0; j< cd; j++){
        (function (index) {
            navBtn[index].onclick = function(){
                temp = index;
                getActive(this,navBtn);
                createAjax(draw);
            }
        })(j);
    }
    //最新排序按钮、评分排序按钮
    var cd2 = selecBtn.length;
    for(var k = 0; k<cd2; k++){
        (function (index) {
            selecBtn[index].onclick = function(){
                getActive(this,selecBtn);
                temp1 = index;
                createAjax(draw);
            }
       })(k);
    };
}