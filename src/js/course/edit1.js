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
//学科二级联动
$(document).on('change', '#category-top-select', function() {
    //select的value就是用户所选的顶级学科cg_id
    var topCgid = $(this).val();
    //利用顶级学科cg_id获取对应子级学科列表
    $.get('/v6/category/child', { cg_id: topCgid }, function(data) {
        var html = "";
        var chidList = data.result;
        //根据子级列表动态生成对应的option
        if (data.code == 200) {
            for (var i = 0, len = chidList.length; i < len; i++) {
                html += '<option value="' + chidList[i].cg_id + '">' + chidList[i].cg_name + '</option>'
            }
        }
        //使用新的option进行替换
        $('#category-child-select').html(html);
    });
});
//表单提交
$('#course-edit1-form').ajaxForm({
    delegation: true,
    success: function(data) {
        if (data.code == 200) {
            alert('修改成功');
            location.href = '/dist/html/course/edit2.html?cs_id=' + cs_id;
        }
    }
});