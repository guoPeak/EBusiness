$(function () {

    //获取验证码
    $('.get-code').on('click', function () {
        $(this).addClass('now').prop('disabled', true).text('发送中...');
        $.get("/user/vCode", function (info) {
            var num = 10;
            var timeId = setInterval(function () {
                num--;
                $('.get-code').text(num + "秒后再次发送");
                if (num === 0) {
                    clearInterval(timeId);
                    $('.get-code').removeClass('now').prop('disabled', false).text('获取验证码');
                }
            }, 1000);
            // mui.alert("你获得的验证码是" + info.vCode);
            console.log(info.vCode);
        });
    })


    $('#register').on('click', function () {

        var data = $('form').serializeArray();
        var username = data[0];
        var password = data[1];
        var repass = data[2];
        var mobile = data[3];
        var vCode = data[4];

        //表单校验
        if (username.value === '') {
            mui.alert("请输入用户名");
            return;
        }

        if (password.value === '') {
            mui.alert("请输入密码");
            return;
        }

        if (password.value != repass.value) {
            mui.alert("两次输入的密码不一致");
            return;
        }

        if (mobile.value === '') {
            mui.alert("请输入手机号码");
            return;
        }

        if (!/^[1]\d{10}$/.test(mobile.value)) {
            mui.alert("手机号码格式不正确");
            return;
        }

        if (vCode.value === '') {
            mui.alert("请输入验证码");
            return;
        }

        if (!/^\d{6}$/.test(vCode.value)) {
            mui.alert("验证码格式错误");
            return;
        }

        //发送ajax请求
        $.ajax({
            type: "post",
            url: "/user/register",
            data: data,
            success: function (info) {
                
            }
        });

    })
})