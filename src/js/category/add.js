//首页导入退出功能
require('../common/header.js');
require('../common/aside.js');
//动态渲染顶级学科
$.get('/v6/category/top', function(data) {
    if (data.code == 200) {
        $('#category-top-select').html(template('select-tpl', data.result));
    }
});
//表单提交
$('#category-add-form').ajaxForm(function(data) {
    if (data.code == 200) {
        alert('恭喜你创建了一个学科');
    }
});