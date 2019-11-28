function check(form){
    var oUname = document.getElementById("accountName");
    var oUpass = document.getElementById("password");
    var nError = document.getElementById("error_name");
    var pError = document.getElementById("error_pwd");
    var accountName = document.getElementById("accountName").value;
    var password = document.getElementById("password").value;
    nError.innerHTML="";
    pError.innerHTML="";
    if (oUname.value.length > 20 || oUname.value.length < 4) {
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
    var xhr=getXHR();
    // 登陆验证
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4) {
            if(xhr.status==200) {
                var obj = document.getElementById("CheckMsg");
                var tmp = JSON.parse(xhr.responseText);
               
                if(tmp.result == "1"){
                	
                    alert("验证通过");
                    setTimeout(function(){}, 3000);
                    window.location.href =  "index.html" + '?accountName='+accountName+'&userid='+tmp.User1.user_id;//指向登录的页面地址
                }else{
                    alert("登陆失败!");
                    setTimeout(function(){}, 3000);
                    obj.innerHTML = "密码或账号输入错误！";
                    obj.style.color = "brown";
                    return;
                }
            }
        }
    };
    //3.建立与服务器的连接（post请求方式，也可以使用get请求方式）
    xhr.open("post","http://localhost:8080/duanxueqi/loginservlet");
    xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    //4.向服务器发出请求(使用post请求方式将数据发往后台)
    xhr.send("username="+accountName+"&password="+password);
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
