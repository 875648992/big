
var layer = layui.layer;  //获取方法
$('.textPhoto').hide()  //先把这两个隐藏
$('.layui-nav-img').hide()

getUrsInfo()
function getUrsInfo() {  //用函数封装一个ajax

    $.ajax({
        url: "/my/userinfo",
        // headers: {  //因为我们访问的时候需要用token 所以会获取到一段密钥 需要加上去
        //     Authorization: localStorage.getItem("token")
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }

            let name = res.data.nickname || res.data.username  //短路运算和三元差不多
            $('.textcome span').text('欢迎 ' + name)

            if (res.data.user_pic) {
                $('.layui-nav-img').attr('src', res.data.user_pic).show()
                $('.textPhoto').hide()
            } else {
                let one = name[0].toUpperCase()  //取字符串的某个值直接用下标就可以了
                $('.textPhoto').show().text(one)
                $('.layui-nav-img').hide()
            }
        },
        //无论成功还是失败  进入页面的的时候获取响应 如果没有对应的token就会失败
        // 然后我们判断失败的时候就返回登入页面 complete里的参数有着响应回来的结果
        complete: function (res) {
            console.log(res);
            data = res.responseJSON
            if (data.status !== 0, data.message !== "获取用户基本信息成功！") {
                location.href = "/home/login.html"
            }
        }

    })

}
//点击退出 先阻止跳转 然后用提示框 如何点确定 就删除token 并跳转login页面
$("#out").click(function (e) {
    e.preventDefault()

    layer.confirm('草泥马!确定退出?', { icon: 3, title: '提示' }, function (index) {
        //do something
        localStorage.removeItem('token')
        location.href = "/home/login.html"
        layer.close(index);
    });

})