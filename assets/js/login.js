$(function () {

    $('.gologin').click(function () {  //给登入字体添加点击事件
        $('.login').hide()  //
        $('.register').show()
    })

    $('.goregister').click(function () {
        $('.login').show()
        $('.register').hide()
    })

    let form = layui.form;
    var layer = layui.layer;


    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],

        repass: function (value, item) {

            if (value !== $('.import').val()) {
                return '两次输入不一致'

            }
        }
    });
    // 注册页面
    $('.regform').on('submit', function (e) {
        e.preventDefault()
        data = $(this).serialize()
        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/api/reguser",
            data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('注册成功');
                $('.goregister').click()
                $('.regform')[0].reset()
            }
        })
    })
    // 登入页面
    $('.logform').on("submit", function (e) {
        e.preventDefault()

        data = $(this).serialize()

        $.ajax({
            type: "POST",
            url: "http://ajax.frontend.itheima.net/api/login",
            data,
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message + "密码错误");
                }
                layer.msg("登录成功,即将跳转页面", {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function () {
                    location.href = "/home/index.html"
                });
            }

        })


    })

})