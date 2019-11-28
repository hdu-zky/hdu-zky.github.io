function check(){
    var oUname = document.getElementById("accountName");
    var oUpass = document.getElementById("password");
    var oUcpass = document.getElementById("check_password");
    var nError = document.getElementById("error_name");
    var pError = document.getElementById("error_pwd");
    var cpError = document.getElementById("error_c_pwd");
    nError.innerHTML="";
    pError.innerHTML="";
    // 格式检查
    if (oUname.value.length > 20 || oUname.value.length < 6) {
        nError.innerHTML = "用户名请输入6-20位字符";
        nError.style.color="red";
        return;
    }
//    else for(var i=0;i<oUname.value.charCodeAt(i);i++){
//        if((oUname.value.charCodeAt(i)<48)||(oUname.value.charCodeAt(i)>57)){
//            nError.innerHTML = "必须为数字组成";
//            nError.style.color="red";
//            return;
//        }
//    }
    if (oUpass.value.length > 20 || oUpass.value.length < 3) {
        pError.innerHTML = "密码请输入6-20位字符";
        pError.style.color="red";
        return;
    }
    if(oUcpass.value.length > 20 || oUcpass.value.length < 3){
        cpError.innerHTML = "确认密码请输入6-20位字符";
        cpError.style.color="red";
        return;
    }
    if(oUcpass.value != oUpass.value){
        cpError.innerHTML = "确认密码不等于密码";
        cpError.style.color="red";
        return;
    }
    var _data = { "userName": oUname.value, "password": oUcpass.value, "check": oUcpass.value};
    var data = JSON.stringify(_data);
    var xhr=getXHR();
    // 后台获取数据验证
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4) {
            if(xhr.status==200) {
                var obj = document.getElementById("CheckMsg");
                var tmp = JSON.parse(xhr.responseText);
                // if(tmp.result == "1"){
                    alert("注册成功，前往登陆界面");
                    setTimeout(function(){}, 3000);
                    window.location.href =  "login.html";//指向登录的页面地址
                // }else{
                //     alert("注册失败!");
                //     setTimeout(function(){}, 3000);
                //     obj.innerHTML = "密码或账号输入错误！";
                //     obj.style.color = "brown";
                //     return;
                // }
            }
        }
    };
    //3.建立与服务器的连接（post请求方式，也可以使用get请求方式）
    xhr.open("post","//120.78.160.95:8080/LabManager/");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    //4.向服务器发出请求(使用post请求方式将数据发往后台)
    xhr.send("username="+oUname.value+"&password="+oUcpass.value);
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