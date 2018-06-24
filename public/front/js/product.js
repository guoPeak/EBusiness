$(function () {

    var productId = getSearch().productId;

    $.ajax({
        type: "get",
        url: "/product/queryProductDetail",
        data: {
            id: productId,
        },
        success: function (info) {
            // console.log(info);
            //渲染数据
            $('.mui-scroll').html(template('tpl', info));

            //重新初始化轮播图
            mui('.mui-slider').slider({
                interval: 5000
            });

            //注册尺码点击事件
            $('.pro-size span').on('click', function () {
                $(this).addClass('now').siblings().removeClass('now');
            });

            //初始化数量框
            mui('.mui-numbox').numbox();

        }
    });

    //注册加入购物车事件
    $('.add-cart').on('click', function () {
        var size = $('.pro-size span.now').text();
        var num = $('.mui-numbox-input').val();

        if (!size) {
            mui.toast('请选择尺码');
            return;
        }

        //加入购物车发送请求
        $.ajax({
            type: "post",
            url: "/cart/addCart",
            data: {
                productId: productId,
                size: size,
                num: num
            },
            success: function (info) {
                if (info.error) {
                    location.href = "login.html?back=" + location.href;
                }
                if (info.success) {
                    mui.confirm("添加成 功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
                        if (e.index === 0) {
                            location.href = 'cart.html';
                        }
                    })
                }
            }
        });
    })

})