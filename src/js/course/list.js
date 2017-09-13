//首页导入退出功能
require('../common/header.js');
require('../common/aside.js');
//渲染课程列表
$.get('/v6/course', function(data) {
    if (data.code == 200) {
        $('.course-list').html(template('course-list-tpl', data.result));
    }
});