var lng = 120.347857;
var lat = 30.323736;
window.onload=function () {
    var account = document.getElementById('accountName');
    var _home = document.getElementById("home");
    var acc = localStorage.getItem("userName");
    var nam = localStorage.getItem("accountName");
    _home.href = '../../index.html' + '?accountName='+ nam;
    account.innerHTML = "欢迎你!" + acc;
    new_map("杭州电子科技大学生活区");
};
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
    var marker = new BMap.Marker(new BMap.Point(120.347857,30.323736));        // 创建标注
    map.addOverlay(marker);                     // 将标注添加到地图中
}
function findSpot() {
    if(document.getElementById("search").value != ''){
        var keyword = document.getElementById("search").value ;
        new_map(keyword);
    }
}
function markSpot() {
    var map = new BMap.Map('map');
    map.enableScrollWheelZoom(true);
    var point =new BMap.Point(lng,lat);
    map.centerAndZoom(point, 16);
    map.addControl(new BMap.NavigationControl());   //平移缩放控件
    map.addControl(new BMap.ScaleControl());        //比例尺
    map.addControl(new BMap.OverviewMapControl());  //缩略地图
    map.addControl(new BMap.MapTypeControl());      //地图类型
    var marker = new BMap.Marker(new BMap.Point(lng, lat));        // 创建标注
    map.addOverlay(marker);                     // 将标注添加到地图中
}
