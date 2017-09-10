require('../common/header.js');
require('../common/aside.js');

//修改密码
$('repass-form').on('submit', function() {
    if ($('#input-pass').val() !== $('input-pass-repeat').val()) {
        alert('两次密码输入不一致');
        return false;
    }
    $('repass-form').ajaxSubmit({
        success: function(data) {
            console.log(data);
        }
    });
    return false;
});