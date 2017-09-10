//用户信息展示
var userinfoStr = localStorage.getItem('userinfo');
var userinfo = JSON.parse(userinfoStr);
$('.aside img').attr('src', userinfo.tc_avatar);
$('.aside h4').text(userinfo.tc_name);
//点击标题列表显示隐藏
$('.navs a').on('click', function() {
    $(this).next('ul').slideToggle();
});
//根据访问的页面给对应的标题添加焦点
var path = location.pathname;
$('.navs a').removeClass('active');
$('.navs a[href="' + path + '"]').addClass('active').parents('ul').show();