// 美食列表分页
var pageIndex = 0;
// 美食数据
var imgNum = [
    {"food_detail":"黑穗醋栗仙女蛋糕卷黑穗醋栗仙女蛋糕卷","food_id":7,"food_name":"黑穗醋栗仙女蛋糕卷","food_pic":"7","food_price":"20",
        "food_rate":"40.0", "food_sid":"6","food_type1":"","food_type2":""},
    {"food_detail":"黑穗醋栗仙女蛋糕卷黑穗醋栗仙女蛋糕卷","food_id":7,"food_name":"黑穗醋栗仙女蛋糕卷","food_pic":"7","food_price":"20",
        "food_rate":"40.0", "food_sid":"6","food_type1":"","food_type2":""},
    {"food_detail":"黑穗醋栗仙女蛋糕卷黑穗醋栗仙女蛋糕卷","food_id":7,"food_name":"黑穗醋栗仙女蛋糕卷","food_pic":"7","food_price":"20",
        "food_rate":"40.0", "food_sid":"6","food_type1":"","food_type2":""},
    {"food_detail":"黑穗醋栗仙女蛋糕卷黑穗醋栗仙女蛋糕卷","food_id":7,"food_name":"黑穗醋栗仙女蛋糕卷","food_pic":"7","food_price":"20",
        "food_rate":"40.0", "food_sid":"6","food_type1":"","food_type2":""},
    {"food_detail":"黑穗醋栗仙女蛋糕卷黑穗醋栗仙女蛋糕卷","food_id":7,"food_name":"黑穗醋栗仙女蛋糕卷","food_pic":"7","food_price":"20",
        "food_rate":"40.0", "food_sid":"6","food_type1":"","food_type2":""},
];
// 收藏地点
var locate=[
    // 120.347857, 30.323736
    {lng: 120.347897, lat: 30.320000},
    {lng: 120.347867, lat: 30.320000},
    {lng: 120.347817, lat: 30.320000},
    {lng: 120.347844, lat: 30.322123},
    {lng: 120.347835, lat: 30.322434},
    {lng: 120.347826, lat: 30.322545},
];
window.onscroll = function() {
    scrollFunction();
};
function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        document.getElementById("back").style.display = "block";
    } else {
        document.getElementById("back").style.display = "none";
    }
}
// 返回顶部
function returnTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
// 根据左侧导航栏更新右侧美食数据
function updateFood(name, type1, type2) {
    var account = document.getElementById('header');
    var xhr=getXHR();
    account.innerHTML = name;
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4) {
            if(xhr.status==200) {
                imgNum =[];
                var tmp = JSON.parse(xhr.responseText);
                // if(tmp.res == "success"){
                    imgNum = tmp.foodlist;
                // }else{
                //     return;
                // }
            }
        }
    };
    xhr.open("post","http://localhost:8080/duanxueqi/foodservlet");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    xhr.send("type1="+type1+ "&type2="+ type2);
    show();
}
// 解析url中的参数
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
// 初始化
window.onload=function(){
    var account = document.getElementById('accountName');
    var _quit = document.getElementById('quits');
    var a = GetRequest();
    // 后台获取数据
    if(a.accountName !== undefined){
        account.innerHTML = "欢迎你! " +a.accountName;
        localStorage.setItem("accountName", a.accountName);
        account.href = './Personal_Center/personal.html' + '?accountName='+ a.accountName;
        _quit.innerHTML = '退出';
    }
    updateFood("最热美食",1,1);
    map("杭州电子科技大学生活区");
//    show(a.accountName);
};
function left(){
    if(pageIndex >= 8){
        pageIndex -= 8;
    }else{
        return;
    }
    show();
}
function right(){
    if(pageIndex + 8  < imgNum.length){
        pageIndex += 8;
    }else{
        return;
    }
    show();
}
// 列表展示后台获取的数据
function show() {
	var a= GetRequest();
    var orderBody = '';
    for(let i=pageIndex;i<pageIndex+8 && i<imgNum.length;i++){
        orderBody += '<div class="food">\
        <div class="img">\
        <a href="'+'food/detail/detail.html'+
        '?name='+imgNum[i].food_name+'&price='+imgNum[i].food_price+'&src='+imgNum[i].food_pic
            +'&id='+imgNum[i].food_id+'&num='+imgNum[i].food_rate+'&desc='+imgNum[i].food_detail+'&userid='+a.userid+'">\
        <img src="'+'images/foodpic/'+imgNum[i].food_pic+'.jpg'
            +'" title="" alt="'+imgNum[i].food_name+'" id="image1" width="12.5em" height="12.5em">\
        </a>\
        </div>\
        <div class="decoration">\
        <strong id="name1">'+imgNum[i].food_name +'</strong>\
        <span>价格:<p id="price1">'+ imgNum[i].food_price +'</p></span></div></div>';
    }
    $(".bod_d").empty();// 清空标签
    $('.bod_d').append(orderBody);
}
function map(keyword) {
    ////// 自动填充输入
    //创建地图实例
    var map = new BMap.Map('map');
    //创建一个坐标
    var localSearch = new BMap.LocalSearch(map);
    //地图初始化，设置中心点坐标和地图级别
    localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0);
        // document.getElementById("search").value = poi.point.lng + "," + poi.point.lat; //获取经度和纬度，将结果显示在文本框中
        map.centerAndZoom(poi.point, 16);
    });
    ////////////自动补充输入地址
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input" : "search_map"
            ,"location" : map
        });
    ac.addEventListener("onhighlight", function(e) {  //鼠标放在下拉列表上的事件
        var str = "";
        var _value = e.fromitem.value;
        var value = "";
        if (e.fromitem.index > -1) {
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;
        value = "";
        if (e.toitem.index > -1) {
            _value = e.toitem.value;
            value = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        }
        str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
        G("searchResultPanel").innerHTML = str;
    });
    var myValue;
    ac.addEventListener("onconfirm", function(e) {    //鼠标点击下拉列表后的事件
        lng.value = '';
        lat.value = '';
        var _value = e.item.value;
        myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business;
        G("searchResultPanel").innerHTML ="onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;
        setPlace();
    });
    localSearch.search(keyword);
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl());   //平移缩放控件
    map.addControl(new BMap.ScaleControl());        //比例尺
    map.addControl(new BMap.OverviewMapControl());  //缩略地图
    map.addControl(new BMap.MapTypeControl());      //地图类型
    // map.clearOverlays();//清空原来的标注
    // 循环输出收藏的地点到地图上
    for(let i=0;i<locate.length;i++){
        var marker = new BMap.Marker(new BMap.Point(locate[i].lng, locate[i].lat));        // 创建标注
        map.addOverlay(marker);                     // 将标注添加到地图中
    }
}
// 查找地点
function findSpot() {
    if(document.getElementById("search_map").value != ''){
        var keyword = document.getElementById("search_map").value ;
        map(keyword);
    }else{
        alert("输入为空！");
    }
}
function getXHR(){
    var xmlHttp;
    try {
        xmlHttp=new XMLHttpRequest();//新版本浏览器
    }catch(e) {
        try{
            xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e) {
            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }// 老版本浏览器                    }
            catch(e) {
                alert("你的浏览器不支持ajax");
                return false;
            }
        }
    }
    return xmlHttp;
}