//首页导入退出功能
require('../common/header.js');
require('../common/aside.js');
require('../common/loading.js');
require('../common/common.js');
var util = require('../common/util.js');
var cs_id = util.getSearch('cs_id');
var lesson;
//数据回显
$.get('/v6/course/lesson', { cs_id: cs_id }, function(data) {
    if (data.code == 200) {
        lesson = data.result.lessons;
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
    //表单之前做点事
    beforeSubmit: function(arrData, $form, options) {
        arrData.push({
            name: 'ct_is_free',
            value: $('#ct_is_free').prop('cheked') ? 1 : 0
        })
    },
    success: function(data) {
        //添加成功后，给出提示，并重置表单
        if (data.result) {
            alert('添加成功');
            upLessons(data.result);
            $('lesson-form').get(0).reset();
        } else {
            //修改成功后，给出提示
            alert('修改成功');
            upLessons();
        }
    }
});

//更新章节列表
function upLessons(ct_id) {
    var formData = getFormData();
    var lessonData = {
        ct_id: formData.ct_id || ct_id,
        ct_name: formData.ct_name,
        ct_video_duration: formData.ct_minutes + ':' + formData.ct_seconds
    };
    //添加章节,直接push到lessons即可
    if (ct_id) {
        lessons.push(lessonData);
    } else { //编辑章节，先通过ct_id得到这个章节的下标，然后splice替换为新的对象
        var index = getLessonIndex(formData.ct_id);
        lessons.splice(index, 1, lessonData);
    }
    //把新的章节列表数据进行渲染
    $('#lesson-list').html(template('lesson-list-tpl', lessons));
};

//返回模态框form数据构成的对象
function getFormData() {
    var formArrData = $('#lesson-form').serializeArray();
    var formData = {};
    for (var i = 0; i < formArrData.length; i++) {
        formData[formArrData[i].name] = formArrData[i].value;
    }
    return formData;
};

//通过ct_id返回它在lessons中的下标
function getLessonIndex(ct_id) {
    for (var i = 0; i < lessons.length; i++) {
        if (lessons[i].ct_id == ct_id) {
            return i;
        }
    }
};