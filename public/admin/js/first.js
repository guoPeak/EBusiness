
$(function () {  

    var page = 1;
    var pageSize = 5;

    render();

    $('#btn-add').on('click', function () {  
        $('#add-modal').modal('show');
    })

    //分类表单的验证
    $('form').bootstrapValidator({
         //1. 指定校验时的图标显示，默认是bootstrap风格
         feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }
    })

   
    //点击添加按钮发送请求
    $('form').on('success.form.bv', function (e) {  
        e.preventDefault(); //阻止submit自动跳转

        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $('form').serialize(),
            success: function (info) {
                if (info.success) {
                    //隐藏模态框
                    $('#add-modal').modal('hide');
                    $("form").data('bootstrapValidator').resetForm(true);
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
            url: "/category/queryTopCategoryPaging",
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (info) {
                // console.log(info);
                $('tbody').html(template('tpl', info));

                //添加分页功能
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: page,
                    totalPages: Math.ceil(info.total / info.size),
                    size: 'small',
                    onPageClicked: function (a,b,c,p) {  
                        page = p;
                        render();
                    }
                })
            }
        });
    }

})