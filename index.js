
var userN=0,passW=0,conf=0,mailC=0;
function  postData() {
        if(userN==1&&passW==1&&conf==1&&mailC==1){
            var data={};
            data.username=$("#username").val();
            data.passward=$("#password").val();
            data.mailaddress=$("#mail-address").val();
            $.ajax("http://localhost", {
                data: data,
                dataType: 'text',
                success: function (response) {
                    $('#result').text(response.toString());
                },
                error: function (req, err) {
                    $('#result').text("error");
                }
            })
        }
    else
        $('#result').text("有项目未正确填写");
}

function passwordCheck(){
    var eve=$("#password").val();
    if(!/^[a-zA-Z]{8,16}$/.test(eve)&&!/^[0-9]{8,16}$/.test(eve)&&!/^[\d\w]{0,7}$/.test(eve)){
        passW=1;
        document.getElementById('password-check').innerHTML="通过";

    }
    else {
        passW=0;
        document.getElementById('password-check').innerHTML="请输入8～16位数字字母组合密码";

    }
}
function mailCheck(){
   var eve=$("#mail-address").val();
   if(/^\w+@(\w+\.)+\w+$/.test(eve)){
       mailC=1;
       document.getElementById('mail-check').innerHTML="通过";
   }
   else{
       mailC=0;
       document.getElementById('mail-check').innerHTML="请输入正确邮箱地址";
   }
}

function usernameCheck(){
    var eve=$("#username").val();
    if (/^[a-zA-Z][a-zA-Z0-9]{4,13}$/.test(eve)) {
        document.getElementById('username-check').innerHTML="通过";
        userN = 1;
    } else {
        document.getElementById('username-check').innerHTML = "请输入字母开头5～13位用户名";
        userN = 0;
    }
}

function confirmCheck(){
    var eve=$("#password").val();
    var eve2=$("#confirm").val();
    if(eve2==eve){
        document.getElementById('confirm-check').innerHTML="通过";
        conf=1;
    }
    else{
        document.getElementById('confirm-check').innerHTML="与密码不匹配";
        conf=0;
    }
}