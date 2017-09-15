//添加页面进度条
NProgress.start();
window.onload = function() {
    NProgress.done();
};
//登陆权限校验
var isLogin = !!$.cookie('PHPSESSID');
var isLoginPage = location.pathname == '/dist/html/user/login.html';
//已经登录了，那么给它自动转到首页
if (isLoginPage && isLogin) {
    location.href = '/dist';
} else if (!isLoginPage && !isLogin) { //没有登录，那么给它自动转到登陆页面
    location.href = '/dist/html/user/login.html';
}