$(function () {

    //校验表单

    $('#login').on('click', function () {
        var check = true;
        mui("form input").each(function () {
            //若当前input为空，则alert提醒 
            if (!this.value || this.value.trim() == "") {
                var label = this.previousElementSibling;
                //mui.toast(label.innerText + "不允许为空", { duration: 'long', type: 'div' })
                mui.alert(label.innerText + "不允许为空");
                check = false;
                return false;
            }
        });
        //校验通过，继续执行登录请求
        if (check) {
            //mui.alert('验证通过!');
            $.ajax({
                type: "post",
                url: "/user/login",
                data: $('form').serialize(),
                success: function (info) {
                    if (info.success) {
                       console.log(11); 
                    }
                    if (info.error) {
                        mui.alert("用户名或者密码错误");
                    }
                }
            });
        }
    });

})