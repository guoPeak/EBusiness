$(function () {

    var page = 1;
    var pageSize = 10;
    var proName = getSearch().key;

    render();


    //给搜索按钮注册点击事件
    $('.lt-search button').on('click', function () {
        $('.lt-sort li').removeClass('now');
        $('.lt-sort i').addClass('fa-angle-down').removeClass('fa-angle-up');

        proName = $(this).prev().val();
        if (!proName) {
            mui.toast("请输入搜索关键字");
            return;
        }
        render();
    });


    //给商品的排序注册事件
    $('.lt-sort').on('click', 'li[data-type]', function () {

        var $this = $(this);
        //让倒三角箭头指向下
        $this.siblings().find('i').addClass('fa-angle-down').removeClass('fa-angle-up');

        if (!$this.hasClass('now')) {
            $this.addClass('now').siblings().removeClass('now');
        } else {
            $this.find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }

        render();

    })

    //假如search为 ?key=1$username=12&desc=11
    function getSearch() {
        var search = location.search;
        search = decodeURI(search).slice(1);
        var arr = search.split('&');
        var obj = {};
        arr.forEach(function (e, i) {
            var k = e.split('=')[0];
            var v = e.split('=')[1];
            obj[k] = v;
        })
        return obj;
    }

    function render() {

        //加载之前动画效果
        $('.lt_product ul').html('<div class="loading"></div>');
        var obj = {
            page: page,
            pageSize: pageSize,
            proName: proName
        };

        //判断排序类型的标签有没有选中
        var $slected = $('.lt-sort li.now');
        if ($slected.length > 0) {
            var type = $slected.data('type');
            var value = $slected.find('i').hasClass('fa-angle-down') ? 2 : 1;
            obj[type] = value;
        }

        $.ajax({
            type: "get",
            url: "/product/queryProduct",
            data: obj,
            success: function (info) {
                setTimeout(function () {
                    $('.lt_product ul').html(template('tpl', info));
                }, 1000)
            }
        });
    };

    // mui.init({
    //     pullRefresh: {
    //         container: "#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
    //         down: {
                
    //             callback: pulldownFresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据
    //         },
    //         up: {
    //             contentrefresh: '正在加载...',
    //             callback: pullupFresh
    //         }
    //     }
    // });

    // function pulldownFresh() {  
    //     setTimeout(function () { 
    //         console.log("下拉刷新");
    //         mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
    //     },2000) 
    // }

    // function pullupFresh() {  
    //     setTimeout(function () {  
    //         console.log('上拉加载');
    //         mui('#refreshContainer').pullRefresh().endPullupToRefresh();
    //     },2000) 
    // }

})