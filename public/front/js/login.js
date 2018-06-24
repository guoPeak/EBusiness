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
            
            var search = location.search;
            search = search.replace('?back=', '');
            console.log(search);

            $.ajax({
                type: "post",
                url: "/user/login",
                data: $('form').serialize(),
                success: function (info) {
                    console.log(info);
                    if (info.success) {
                        if (search) {
                            location.href = search;
                        } else {
                            location.href = 'user.html'
                        }
                    }
                    if (info.error) {
                        mui.alert(info.message);
                    }
                }
            });
        }
    });

})