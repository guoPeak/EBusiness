$(function () {

    var page = 1;
    var pageSize = 5;

    render();

    //发送ajax生成下拉菜单的内容
    $.ajax({
        type: "get",
        url: "/category/queryTopCategoryPaging",
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (info) {
            $('.dropdown-menu').html(template('tpl2', info));
        }
    });
    //添加显示模态框
    $('#btn-add').on('click', function () {
        $('#add-modal').modal('show');
    });

    //下拉菜单选定效果
    $('.dropdown-menu').on('click', 'a', function () {
        $('.dropdown-text').text($(this).text());
        $('#categoryId').val($(this).data('id'));

        //使选项框改变为符合表单验证的
        $('form').data('bootstrapValidator').updateStatus('categoryId', 'VALID');
    })

    //上传图片显示
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
            $('.img-box img').attr('src', data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr); //给上传的表单输入图片的地址

            //使校验合格
            $('form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID');
        }
    })

    //表单校验
    $('form').bootstrapValidator({
        //指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [],
        //指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类的名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请上传品牌名称'
                    }
                }
            },
        }
    });

    //注册表单验证成功发送的事件
    $('form').on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/category/addSecondCategory",
            data: $('form').serialize(),
            success: function (info) {
                if (info.success) {
                    //隐藏模态框
                    $('#add-modal').modal('hide');
                    //重新渲染
                    page = 1;
                    render();
                }
            }
        });
    })

    function render() {

        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                $('tbody').html(template('tpl', info));

                //添加分页
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    size: 'small',
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();
                    }
                })
            }
        });

    }

})