$(function () {

    var $categoryLeftUl = $('.category_left ul');
    var $categoryRightUl = $('.category_right ul');
    //发送ajax请求生成一级分类菜单
    $.get('/category/queryTopCategory', function (info) {
        $categoryLeftUl.html(template('firstTpl', info));
        //开始默认在第一个分类上
        renderSecond($('.category_left li').data('id'));
    })

    //发送ajax请求生成对应点击的商品
    $categoryLeftUl.on('click', 'li', function () {
        var id = $(this).data('id');
        //给当前的li加now类。移除其他的
        $(this).addClass('now').siblings().removeClass('now');
        renderSecond(id);
    })

    function renderSecond(id) {
        $.get('/category/querySecondCategory', { id: id }, function (info) {
            $categoryRightUl.html(template('secondTpl', info));
            
            //100毫秒滚动到顶
            mui('.category_right .mui-scroll-wrapper').scroll().scrollTo(0,0,100);
        })
    }
})