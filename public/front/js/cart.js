$(function () {


    mui.init({
        pullRefresh: {
            container: ".mui-scroll-wrapper",
            down: {
                auto: true,
                callback: render
            }
        }
    });


    //选中的事件 委托事件
    $('.mui-table-view').on('click', '[type="checkbox"]', function () {

        calcSumPrice();

    });


    //给删除注册事件 //a标签的click事件失效了
    $('.mui-table-view').on('tap', '.delete-btn', function () {
        
        var id = $(this).data('id');

        mui.confirm("您是否要删除这个商品", "温馨提示", ["是", "否"], function (e) {

            if (e.index === 0) {
                $.ajax({
                    type: "get",
                    url: "/cart/deleteCart",
                    data: {
                        id: [id]
                    },
                    success: function (info) {
                        // console.log(info);
                        //重新下拉刷新
                        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                    }
                });
            }

        })

    })

    //修改的事件
    $('.mui-table-view').on('tap', '.edit-btn', function () {
        var id = $(this).data('id');
        var productSize = $(this).data('size');
        var html = template('tpl2', {productSize: productSize})  ;
        console.log(html);
        mui.confirm(html, "编辑商品", ["确认", "取消"])
    })



    function render() {

        $.get('/cart/queryCart', function (info) {
            //未登录的
            if (info.error) {
                window.location.href = 'login.html?back=' + location.href;
                return;
            } 

            setTimeout(function () {
                console.log(info);

                $('.mui-table-view').html(template('tpl', { info: info }));

                //结束下拉刷新
                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();

                //计算总价 checkbox被选中的
                calcSumPrice();

            }, 1000)
        });
    }

    //计算总价
    function calcSumPrice() {
        var sum = 0
        $('[type="checkbox"]').each(function () {

            if ($(this).prop('checked')) {
                var price = $(this).data('price');
                var num = $(this).data('num')
                sum += price * num;
            }

        })
        $('.pay-product span').text(sum);
    }


})