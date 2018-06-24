require.config({

    baseUrl: '/admin/',

    paths: {
        "jquery": "lib/jquery/jquery",
        "bootstrap": "lib/bootstrap/js/bootstrap",
        "bootstrapPaginator": "lib/bootstrap-paginator/bootstrap-paginator",
        "bootstrapValidator": "lib/bootstrap-validator/js/bootstrapValidator",
        "artTemplate": "lib/artTemplate/template-web",
        "echarts": "lib/echarts/echarts.min",
        "jqueryFileupload": "lib/jquery-fileupload/jquery.fileupload",
        "jquery-ui/ui/widget": "lib/jquery-fileupload/jquery.ui.widget",
        "nprogress": "lib/nprogress/nprogress",
        "common": "js/common"
    },

    shim: {

        "bootstrap": {
            deps: ["jquery"]
        },

        "bootstrapPaginator": {
            deps: ["bootstrap"]
        },

        "bootstrapValidator": {
            deps: ["bootstrap"]
        },
    }
})