window.onload=function check(form){
    var account = document.getElementById('accountName');
    var _id = document.getElementById('id');
    var _name = document.getElementById('name');
    var a = GetRequest();
    if(a.accountName !== undefined){
        var _data = {"userName": a.accountName};
        localStorage.setItem("accountName", a.accountName);
        var data = JSON.stringify(_data);
        var xhr=getXHR();
        xhr.onreadystatechange=function(){
            if(xhr.readyState==4) {
                if(xhr.status==200) {
                    var _home = document.getElementById("home");
                    var tmp = JSON.parse(xhr.responseText);
                    if(tmp.result == "success"){
                        var res = tmp.User1;
                        account.innerHTML = "欢迎你! " + res.userNickname;
                        _id.innerHTML = a.accountName;
                        _name.innerHTML = res.userNickname;
                        _home.href = '../index.html' + '?accountName='+ a.accountName;
                    }else{
                        return;
                    }
                }
            }
        };
        //3.建立与服务器的连接（post请求方式，也可以使用get请求方式）
        xhr.open("post","http://120.78.160.95:8080/LabManager/user/getUserByUserName");
        xhr.setRequestHeader('Content-type','application/json');
        //4.向服务器发出请求(使用post请求方式将数据发往后台)
        xhr.send(data);
    }
    else{
        account.href= '../register.html';
    }
};
function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = [];
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
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