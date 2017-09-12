//首页导入退出功能
require('../common/header.js');
require('../common/aside.js');
//列表数据显示
$.get('/v6/teacher', function(data) {
    data.code == 200 && $('#teacher-list-table').append(template('teacher-list-tpl', data.result))
})