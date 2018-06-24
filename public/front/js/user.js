$(function () {

    //查询登录信息
    $.ajax({
        type: "get",
        url: "/user/queryUserMessage",
        success: function (info) {
            if (info.error) {
                window.location.href = 'login.html';
                return;
            }

            //没有错误就登录了
            $('.user-info').html(template('tpl', info));

        }
    });


    //退出登录事件
    $('.lt-logout button').on('click', function () {
        $.get('/user/logout', function (info) {
            if (info.success) {
                mui.alert("退出成功", function () {
                    window.location.href = 'login.html';
                });
            }
        })
    })
})