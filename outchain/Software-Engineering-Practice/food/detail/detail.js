
var imgNum = [
    {"food_detail":"黑穗醋栗仙女蛋糕卷黑穗醋栗仙女蛋糕卷","food_id":7,"food_name":"黑穗醋栗仙女蛋糕卷","food_pic":"6","food_price":"20",
        "food_rate":"40.0", "food_sid":"6","food_type1":"","food_type2":""},
];
var store=
    {"seller_addr":"120.347857,30.323736","seller_id":0,"seller_name":"全聚德(萧山店)","seller_tel":"0571-22851988/22855006"};
window.onload=function () {
	var lng = "";
	var lat = "";
    var images1 = document.getElementById('image1');
    var account = document.getElementById('accountName');
    var _home = document.getElementById("home");
    var _name = document.getElementById("name");
    var _desc = document.getElementById("desc");
    var _price = document.getElementById("price");
    var _num = document.getElementById("num");
    var _phone = document.getElementById("phone");
    var _addr = document.getElementById("addr");
    var a = GetRequest();
    if(a.id !== undefined){
        var xhr=getXHR();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4) {
                if(xhr.status==200) {
                    var tmp = JSON.parse(xhr.responseText);
                    // if(tmp.res == "success"){
                    store = tmp.seller;
                    console.log(store);
                    var i;
                    for(i=0;i<store.seller_addr.length;i++){
                        if(store.seller_addr[i] != '，'){
                            lng += store.seller_addr[i];
                            console.log(store.seller_addr[i]);
                        }else{
                        	break;
                        }
                    }                                                   
                   for(let j=i+1;j<store.seller_addr.length;j++){
                                lat += store.seller_addr[j];
                                console.log(store.seller_addr[j]);
                       }
                    console.log(lng);
			    	markSpot(lng, lat);
			    	_addr.innerHTML = store.seller_name;
			        _phone.innerHTML = store.seller_tel;
                    // }else{
                    //     return;
                    // }
                }
            }
        };
        xhr.open("post","http://localhost:8080/duanxueqi/sellerservlet");
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send("food_id="+a.id);
        
     
        
    }
    if(a.name !== undefined){
        _name.innerHTML = a.name;
    }
    if(a.price !== undefined){
        _price.innerHTML = a.price;
    }
    if(a.src !== undefined){
        images1.src = '../../images/foodpic/'+a.src+'.jpg';
    }
    if(a.num !== undefined){
        _num.innerHTML =a.num;
    }
    if(a.desc !== undefined){
        _desc.innerHTML =a.desc;
    }

    update();
    history();
    
};

function update(){
	var xhr=getXHR();
	 var a = GetRequest();
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4) {
            if(xhr.status==200) {
                imgNum=[];
                var tmp = JSON.parse(xhr.responseText);
                imgNum = tmp.foodlist;
                
                if(a.userid !== undefined){
            	    var orderBody = '';
            	    $.each(imgNum, function (index, val) {
            	        orderBody += '<div class="food">\
            	        <div class="img">\
            	        <a href="'+'detail.html'+ '?name='+val.food_name+'&price='+val.food_price+'&src='+val.food_pic
            	            +'&id='+val.food_id+'&num='+val.food_rate+'&desc='+val.food_detail+'">\
            	        <img src="'+'../../images/foodpic/'+val.food_pic+'.jpg'+'" title="" alt="'+val.food_name+'" width="150px" height="150px">\
            	        </a>\
            	        </div>\
            	        <div class="decoration">\
            	        <strong id="name1">'+val.food_name +'</strong>\
            	        <span>价格:<p id="price1">'+ val.food_price +'</p></span></div></div>';
            	    });
            	    $(".bod_d").empty();// 清空标签
            	    $('.bod_d').append(orderBody);
                }else{
                	return;
                }
            }
        }
    }
    xhr.open("post","http://localhost:8080/duanxueqi/commendservlet");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.send("userid="+a.userid);

    
}

function history(){
	var xhr=getXHR();
	var a = GetRequest();
    xhr.open("post","http://localhost:8080/duanxueqi/upastupservlet");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	xhr.send("userid="+a.userid+"&foodid="+a.id);
}

function new_map(keyword) {
    //创建地图实例
    var map = new BMap.Map('map');
    //创建一个坐标
    var localSearch = new BMap.LocalSearch(map);
    // var point =new BMap.Point(120.343186,30.315200);
    //地图初始化，设置中心点坐标和地图级别
    // map.centerAndZoom(point,15);

    localSearch.setSearchCompleteCallback(function (searchResult) {
        var poi = searchResult.getPoi(0);
        lng = poi.point.lng;
        lat = poi.point.lat;
        // document.getElementById("search").value = poi.point.lng + "," + poi.point.lat; //获取经度和纬度，将结果显示在文本框中
        map.centerAndZoom(poi.point, 16);
    });
    ////////////自动补充输入地址
    var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
        {
            "input" : "search"
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
    ////////////////
    localSearch.search(keyword);
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl());   //平移缩放控件
    map.addControl(new BMap.ScaleControl());        //比例尺
    map.addControl(new BMap.OverviewMapControl());  //缩略地图
    map.addControl(new BMap.MapTypeControl());      //地图类型
    // var marker = new BMap.Marker(new BMap.Point(lng, lat));        // 创建标注
    // map.addOverlay(marker);                     // 将标注添加到地图中
}
function findSpot() {
    if(document.getElementById("search").value != ''){
        var keyword = document.getElementById("search").value ;
        new_map(keyword);
    }else{
        alert("输入为空！");
    }
}
function markSpot(lng, lat) {
    var map = new BMap.Map('map');
    map.enableScrollWheelZoom(true);
    var point =new BMap.Point(lng,lat);
    map.centerAndZoom(point, 18);
    map.addControl(new BMap.NavigationControl());   //平移缩放控件
    map.addControl(new BMap.ScaleControl());        //比例尺
    map.addControl(new BMap.OverviewMapControl());  //缩略地图
    map.addControl(new BMap.MapTypeControl());      //地图类型
    var marker = new BMap.Marker(new BMap.Point(lng,lat));        // 创建标注
    map.addOverlay(marker);                     // 将标注添加到地图中
}
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
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