
$(document).ajaxStart(function () {  
    NProgress.start();
})

$(document).ajaxStop(function () {  
    NProgress.done();
})

//菜单伸缩管理
$('.child').prev().on('click', function () {  
    $('.child').slideToggle();
});

//右侧整个盒子隐藏和出现
$('.icon_menu').on('click', function () {  
    $('.lt_aside').toggleClass('now');
    $('.lt_main').toggleClass('now');
});

//退出登录功能
$('.logout-btn').on('click', function () {  
    $.ajax({
        type: "get",
        url: "/employee/employeeLogout",
        success: function (info) {
            if (info.success) {
                location.href = 'login.html'
            }
        }
    });
});

//进入其他页面都要发送ajax请求 登录信息是否在服务器中
    // if (location.href.indexOf('login.html') === -1) {
    //     $.ajax({
    //         type: "get",
    //         url: "/employee/checkRootLogin",
    //         success: function (info) {
    //             if (info.error === 400) {
    //                 location.href = 'login.html';
    //             }
    //         }
    //     });
    // }

    //可以通过后台直接判断登录这个网页时，判断用户是否登录，然后能否访问当前网页
