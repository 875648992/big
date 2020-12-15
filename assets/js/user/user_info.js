$(function () {

    let form = layui.form;
    var layer = layui.layer;
    info()
    function info() {
        $.ajax({
            url: "/my/userinfo",
            success: res => {
                form.val("formTest", res.data);
            }
        })
    }



    $('.layui-form').on('submit', e => {
        e.preventDefault()
        let data = $('.layui-form').serialize();
        console.log(data);
        $.ajax({
            url: '/my/userinfo',
            type: "POST",
            data,
            success: res => {
                if (res.status !== 0) {
                    layer.msg(res.message);
                }
                layer.confirm('是否提交', { icon: 3, title: '提示' }, function (index) {
                    //do something
                    window.parent.getUrsInfo()
                    layer.msg(res.message);
                    layer.close(index);
                });
            }
        })
    })

    $('#reinfo').click(e => {
        e.preventDefault()
        info()
    })

})