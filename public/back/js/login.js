
$(function () {

    $('form').bootstrapValidator({

        //1. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields: {
            username: {
               validators: {
                   notEmpty: {
                       message: '用户名不能为空'
                   },
                   stringLength: {
                       min: 4,
                       max: 12,
                       message: '用户名长度必须在4到12之间'
                   }
               } 
            },

            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码长度必须在6到12之间'
                    }
                } 
             }
        }
    });

    $('form').on('success.form.bv', function (e) {  
        e.preventDefault();
        
        $.ajax({
            type: "post",
            url: "url",
            data: "data",
            success: function (info) {
                
            }
        });
    })

});