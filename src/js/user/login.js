require('../common/common.js');
$("#login-form").ajaxForm({
    success: function(data) {
        if (data.code == 200) {
            alert('登陆成功');
            localStorage.setItem('userinfo', JSON.stringify(data.result));
            location.href = '/dist';
        } else {
            alert('登录失败');
        }
    },
    error: function() {
        alert('登录失败');
    }
});
//回显历史登录用户的头像，没有就展示一个默认头像
var userinfo = JSON.parse(localStorage.getItem('userinfo')) || {};
var tc_avatar = userinfo.tc_avatar || '/public/img/default.png';
$('.avatar img').attr('src', tc_avatar);