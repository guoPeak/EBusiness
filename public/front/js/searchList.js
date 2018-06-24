$(function () {

  var page = 1;
  var pageSize = 4;
  var proName = getSearch().key;


  //给搜索按钮注册点击事件
  $('.lt-search button').on('click', function () {
    $('.lt-sort li').removeClass('now');
    $('.lt-sort i').addClass('fa-angle-down').removeClass('fa-angle-up');

    proName = $(this).prev().val();
    if (!proName) {
      mui.toast("请输入搜索关键字");
      return;
    }
    //重新下拉刷新
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
  });


  //给商品的排序注册事件
  //下拉刷新这个初始化之后，click事件会失效
  $('.lt-sort').on('tap', 'li[data-type]', function () {

    var $this = $(this);
    //让倒三角箭头指向下
    $this.siblings().find('i').addClass('fa-angle-down').removeClass('fa-angle-up');

    if (!$this.hasClass('now')) {
      $this.addClass('now').siblings().removeClass('now');
    } else {
      $this.find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up');
    }

    //调用一次上拉刷新
    mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
  })


  function render(callback) {

    //加载之前动画效果
    //$('.lt_product ul').html('<div class="loading"></div>');
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

          callback(info);

        }, 1000)
      }
    });
  };

  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",

      down: {
        auto: true,
        callback: function () {
          // console.log(11);
          page = 1
          render(function (info) {
            $('.lt_product ul').html(template('tpl', info));
            //结束下拉刷新
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
            //重置上拉加载
            mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
          });
        }
      },
      up: {
        callback: function () {
          // console.log(22);
          page++;
          render(function (info) {
            $('.lt_product ul').append(template('tpl', info));
            //结束上拉加载
            if (info.data.length === 0) {
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
            } else {
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
            }
          })
        }
      }
    }
  });


})