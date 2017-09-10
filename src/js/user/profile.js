require('../common/header.js');
require('../common/aside.js');
//数据回显
$.ajax({
    url: '/v6/teacher/profile',
    type: 'get',
    success: function(data) {
        if (data.code == 200) {
            $('.teacher-profile').html(template('teacher-profile-tpl', data.result));
        }
    }
});
//表单提交
$('#teacher-profile-form').ajaxForm({
    delegation: true,
    success: function(data) {
        if (data.code == 200) {
            alert('修改成功');
        }
    }
});