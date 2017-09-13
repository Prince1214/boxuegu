//首页导入退出功能
require('../common/header.js');
require('../common/aside.js');
//表单提交
$('#course-add-form').ajaxForm(function(data) {
    if (data.code == 200) {
        alert('课程创建成功');
        location.href = '/dist/html/course/edit1.html?cs_id=' + data.result.cs_id;
    }
});