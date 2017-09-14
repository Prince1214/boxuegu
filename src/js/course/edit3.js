//首页导入退出功能
require('../common/header.js');
require('../common/aside.js');
var util = require('../common/util.js');
var cs_id = util.getSearch('cs_id');
//数据回显
$.get('/v6/course/lesson', { cs_id: cs_id }, function(data) {
    if (data.code == 200) {
        data.result.editIndex = 3;
        $('#course-edit3').append(template('course-edit3-tpl', data.result));
    }
});
//编辑章节数据回显
$(document).on('click', '.btn-lesson-edit', function() {
    var data = {
        ct_id: $(this).attr('data-id')
    };
    $.get('/v6/course/chapter/edit', data, function(data) {
        if (data.code == 200) {
            data.result.cs_id = cs_id;
            $('#chapterModal').html(template('lesson-tpl', data.result));
        }
    });
});
//添加章节
$(document).on('click', '#btn-lesson-add', function() {
    $('#chapterModal').html(template('lesson-tpl', { cs_id: cs_id }));
});
//修改或添加章节成功后的处理回调
$('#lesson-form').ajaxForm({
    delegation: true,
    success: function(data) {
        //添加成功后，给出提示，并重置表单
        if (data.result) {
            alert('添加成功');
            $('lesson-tpl').get(0).reset();
        } else {
            //修改成功后，给出提示
            alert('修改成功');
        }
    }
});