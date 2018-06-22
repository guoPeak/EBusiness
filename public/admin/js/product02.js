$(function () {

    //页面加载请求商品数据
    var page = 1;
    var pageSize = 3;
    var tbody = $('tbody');
    var addModal = $('#add-modal');
    var dropdownMenu = $('.dropdown-menu');
    var dropdownText = $('#dropdown-text');
    var brandId = $('#brandId');
    var fileupload = $('#fileupload');
    var imgBox = $('.img-box');
    var img = []; //用于存放上传图片的数据

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
                tbody.html(template('firstTpl', info));
                //添加分页功能
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    size: 'small',
                    onPageClicked: function (a, b, c, p) {
                        page = p,
                            render();
                    },
                    //改变现实的页码样式 可显示中文
                    itemTexts: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "page":
                                return page;
                            case "next":
                                return "下一页";
                            case "last":
                                return "最后一页";
                        }
                    },
                    //鼠标放在页码上显示的提示标题
                    tooltipTitles: function (type, page, current) {
                        switch (type) {
                            case "first":
                                return "首页";
                            case "prev":
                                return "上一页";
                            case "page":
                                return "到第" + page + "页";
                            case "next":
                                return "下一页";
                            case "last":
                                return "最后一页";
                        }
                    },
                    useBootstrapTooltip: true  //使用bootstrap风格的提示
                })
            }
        });

    }

    //添加商品的模态框
    $('.add-product').on('click', function () {
        addModal.modal('show');

        //加载二级分类选项框
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: 1,
                pageSize: 100 //要把二级分类都加载出来
            },
            success: function (info) {
                dropdownMenu.html(template('secondTpl', info));
            }
        });
    });

    //添加分类的下来框
    dropdownMenu.on('click', 'a', function () {
        //设置文本 
        dropdownText.text($(this).text());
        //给brandId赋值
        brandId.val($(this).data('id'));

        //手动让表单校验通过
        $('form').data('bootstrapValidator').updateStatus('brandId', 'VALID');
    })

    //图片上传功能
    fileupload.fileupload({
        dataType: 'json',
        done: function (e, data) {
            //只允许上传三张
            if (img.length >= 3) {
                return;
            }
            imgBox.append('<img src="' + data.result.picAddr + '" width="100">');

            img.push(data.result);

            //表单验证
            if (img.length === 3) {
                $('form').data('bootstrapValidator').updateStatus('productImg', 'VALID');
            } else {
                $('form').data('bootstrapValidator').updateStatus('productImg', 'INVALID');
            }
        }
    });

    //表单验证
    $('form').bootstrapValidator({

        excluded: [],

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
                        message: '请输入正确商品数量（1-99999）'
                    }
                }
            },
            size: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的尺码范围'
                    },
                    regexp: {
                        regexp: /^\d{2}-\d{2}$/,
                        message: '请输入正确的商品尺码范围（如32-45）'
                    }
                }
            },
            oldPrice: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的原价'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '请输入正确的商品价格'
                    }
                }
            },
            price: {
                validators: {
                    notEmpty: {
                        message: '请输入商品的现价'
                    },
                    regexp: {
                        regexp: /^\d*$/,
                        message: '请输入正确的商品价格'
                    }
                }
            },
            productImg: {
                validators: {
                    notEmpty: {
                        message: '请选择三张图片'
                    }
                }
            }
        }
    });

    //表单验证成功的事件
    $('form').on('success.form.bv', function (e) {
        e.preventDefault();

        //统计表单请求的参数
        var data = $('form').serialize();

        //加上之前存在存放在img中的参数
        data += "&picName=" + img[0].picName + "&picAddr=" + img[0].picAddr;
        data += "&picName=" + img[1].picName + "&picAddr=" + img[1].picAddr;
        data += "&picName=" + img[2].picName + "&picAddr=" + img[2].picAddr;

        //发送请求添加商品
        $.ajax({
            type: "post",
            url: "/product/addProduct",
            data: data,
            success: function (info) {
                //隐藏模态框
                addModal.modal('hide');
                //重新渲染
                page = 1;
                render();
                //表格重置
                $('form').data('bootstrapValidator').resetForm(true);
                dropdownText.text("请选择二级分类");
                imgBox.children('img').remove();
                //重置img数组
                img = [];
            }
        });
    })

})