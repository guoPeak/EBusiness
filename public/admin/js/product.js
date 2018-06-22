$(function () {

    var page = 1;
    var pageSize = 2;
    var img = [];

    render();


    function render() {

        $.ajax({
            type: "get",
            url: "/product/queryProductDetailList",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                $('tbody').html(template('tpl', info));

                //分页功能
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    size: 'small',
                    useBootstrapTooltip: true,
                    onPageClicked: function (a, b, c, p) {
                        page = p;
                        render();
                    },
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            case 'page':
                                return page;
                        }
                    },
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return '首页';
                            case 'prev':
                                return '上一页';
                            case 'next':
                                return '下一页';
                            case 'last':
                                return '尾页';
                            case 'page':
                                return "第" + page + "页";
                        }
                    }
                });
            }
        });

    }

    //模态框的显示
    $('#btn-add').on('click', function () {
        $('#add-modal').modal('show');

        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100
            },
            success: function (info) {
                $('.dropdown-menu').html(template('tpl2', info));
            }
        });
    });

    //选择二级分类的
    $('.dropdown-menu').on('click', 'a', function () {
        $('#brandId').val($(this).data('id'));
        $('.dropdown-text').text($(this).text());

        //让表单通过
        $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })

    //文件上传
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            //限制只能传三张图片
            if (img.length >= 3) {
                return;
            }

            // 预览图片
            $('.img-box').append('<img src="' + data.result.picAddr + '" width="100">');

            img.push(data.result);
            
            if (img.length === 3) {
                $('form').data('bootstrapValidator').updateStatus('productImg', 'VALID');
            } else {
                $('form').data('bootstrapValidator').updateStatus('productImg', 'INVALID');
            }
        }
    });

    //表单校验
    $('form').bootstrapValidator({
        excluded: [],
        //指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            brandId: {
                validators: {
                    notEmpty: {
                        message: '请选择一个二级分类'
                    }
                }
            },
            proName: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的名称'
                    }
                }
            },
            proDesc: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的描述'
                    }
                }
            },
            num: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的库存'
                    },
                    regexp: {
                        regexp: /^[1-9]\d{0,4}$/,
                        message: '请输入正确的库存数量1-99999'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的尺码'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入正确的尺码（32-40）'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的原价'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入正确的数字'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的现价'
                    },
                    regexp: {
                        regexp: /^[1-9]\d*$/,
                        message: '请输入正确的数字'
                    }
                }
            },
            productImg: {
                validators: {
                    notEmpty: {
                        message: '请添加三张商品图片'
                    }
                }
            }
        }
    });

    //表单验证成功的事件
    $('form').on('success.form.bv', function (e) {
        e.preventDefault();
        var param = $('form').serialize();

        param += "&picName1=" + img[0].picName + "&picAddr1=" + img[0].picAddr;
        param += "&picName2=" + img[1].picName + "&picAddr2=" + img[1].picAddr;
        param += "&picName3=" + img[2].picName + "&picAddr3=" + img[2].picAddr;

        //发送ajax请求
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: param,
            success: function (info) {
                if (info.success) {
                    //隐藏模态框
                    $('#add-modal').modal('hide');
                    //重新渲染表格
                    page = 1;
                    render();

                    //重置表单
                    $('form').data('bootstrapValidator').resetForm(true);
                    $('.dropdown-text').text("请选择二级分类");
                    $('.img-box img').remove();
                    //重置数组
                    img = [];
                }
            }
        });
    })
})