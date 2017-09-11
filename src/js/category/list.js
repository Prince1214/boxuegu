//首页导入退出功能
require('../common/header.js');
require('../common/aside.js');
//渲染学科列表
$.get('/v6/category', function(data) {
    $('.table-bordered').append(template('category-list-tpl', data.result));
});