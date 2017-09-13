//首页导入退出功能
require('../common/header.js');
require('../common/aside.js');
var util = require('../common/util');

var cs_id = util.getSearch('cs_id');
//数据回显
$.get('/v6/course/basic', { cs_id: cs_id }, function(data) {
    if (data.code == 200) {
        $('#course-edit1').append(template('course-edit1-tpl', data.result));
    }
});