$(function () {

    var key = "lt_history";
    var $history = $('.lt-history')


    render();

    //获取localStorage中的数据
    function getHistory() {
        var result = localStorage.getItem(key) || "[]";
        return JSON.parse(result);
    }

    function setHistory(value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    function render() {
        var history = getHistory();
        $history.html(template('tpl', { info: history }));
    }

    //清空功能
    $history.on('click', '.btn-empty', function () {
        mui.confirm("您是否要清空搜索记录", "温馨提示", ["是", "否"], function (e) {
            if (e.index === 0) {
                setHistory([]);
                render();
            }
        })
    })

    //删除单个功能
    $history.on('click', '.btn-delete', function () {
        var index = $(this).data('index');
        mui.confirm("你是否要删除本次记录", "温馨提示", ["是", "否"], function (e) {
            if (e.index === 0) {
                var history = getHistory();
                history.splice(index, 1);
                setHistory(history);
                render();
            }
        });
    })

    //点击搜索框添加记录
    $('.lt-search button').on('click', function () {
        var txt = $(this).prev().val();
        $(this).prev().val('');

        if (!txt) {
            mui.toast("请输入搜索关键字");
            return;
        }

        var history = getHistory();

        //判断是否有重复的搜索内容,让其排到最前
        var index = history.indexOf(txt);
        if (index > -1) {
            history.splice(index, 1);
        }

        if (history.length >= 10) {
            history.pop();
        }

        history.unshift(txt);

        setHistory(history);

        render();

        //带数据跳转页面
        location.href = "searchList.html?key=" + txt;
    });

})