$(function () {

    var layer = layui.layer;
    $('.textPhoto').hide()
    $('.layui-nav-img').hide()

    getUrsInfo()
    function getUrsInfo() {
        $.ajax({
            url: "/my/userinfo",
            headers: {
                Authorization: localStorage.getItem("token")
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                let name = res.data.nickname || res.data.username
                $('.textcome span').text('欢迎 ' + name)

                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic).show()
                    $('.textPhoto').hide()
                } else {
                    let one=name[0].toUpperCase()
                    $('.textPhoto').show().text(one)
                    $('.layui-nav-img').hide()
                }


            }

        })
    }

})