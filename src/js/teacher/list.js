//首页导入退出功能
require('../common/header.js');
require('../common/aside.js');
//列表数据显示
$.get('/v6/teacher', function(data) {
    data.code == 200 && $('#teacher-list-table').append(template('teacher-list-tpl', data.result));
});
//讲师启用与注销
$(document).on('click', '.btn-teacher', function() {
    var $this = $(this);
    var data = {
        tc_id: $(this).attr('data-id'),
        tc_status: $(this).attr('data-status')
    };
    $.post('/v6/teacher/handle', data, function(data) {
        var newStatus = data.result.tc_status;
        $this.text(newStatus == 0 ? '注销' : '启用');
        $this.attr('data-status', newStatus);
    });
});