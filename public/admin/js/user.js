require(["artTemplate", "common", "bootstrapPaginator"], function (template) {

    $(function () {

        var page = 1;
        var pageSize = 6;

        render();

        //注册启用或禁用事件
        $('tbody').on('click', '.btn', function () {
            //显示模态框
            $('#user-modal').modal('show');
            var id = $(this).parent().data('id');
            var isDelete = $(this).hasClass('btn-success') ? 1 : 0;

            $('.btn-confirm').off().on('click', function () {
                $.ajax({
                    type: "post",
                    url: "/user/updateUser",
                    data: {
                        id: id,
                        isDelete: isDelete
                    },
                    success: function (info) {
                        if (info.success) {
                            $('#user-modal').modal('hide');
                            render();
                        }
                    }
                });
            })
        });


        function render() {
            $.ajax({
                type: "get",
                url: "/user/queryUser",
                data: {
                    page: page,
                    pageSize: pageSize
                },
                success: function (info) {
                    // console.log(info);
                    var html = template('tpl', info);
                    $('tbody').html(html);

                    //添加分页功能
                    $('#paginator').bootstrapPaginator({
                        bootstrapMajorVersion: 3,
                        currentPage: page,
                        size: 'small',
                        totalPages: Math.ceil(info.total / info.size),
                        onPageClicked: function (a, b, c, p) {
                            page = p;
                            render();
                        }
                    })
                }
            });
        }

    });
});