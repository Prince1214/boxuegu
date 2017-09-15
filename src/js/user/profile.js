require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
//数据回显
$.ajax({
    url: '/v6/teacher/profile',
    type: 'get',
    success: function(data) {
        if (data.code == 200) {
            $('.teacher-profile').html(template('teacher-profile-tpl', data.result));
            initPlugin();
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
//所有的插件初始化都放在这里
function initPlugin() {
    $('input[name=tc_birthday]').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        endDate: new Date('2010-01-01')
    });
    $('input[name=tc_join_date]').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        endDate: new Date('2010-01-01')
    });
};