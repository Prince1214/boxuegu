var loadingHTML =
    '<div class="overlay">' + '<img src="/public/img/loading.gif">' + '</div>';

$('body').append(loadingHTML);

//第一个请求发送时展示loading
$(document).on('ajaxStart', function() {
    $('.overlay').show();
});

//最后一个请求结束时隐藏loading
$(document).on('ajaxStop', function() {
    $('.overlay').hide();
});