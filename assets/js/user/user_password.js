$(function () {

    let form = layui.form
    let layer = layui.layer;


    form.verify({

        old: value => {
            console.log(value);
            let oldPass = $('[name=oldPwd]').val()
            if (value === oldPass) {
                return '新密码不能和原密码相同'
            }
        },
        ok: value => {
            console.log(value);
            let newPass = $('[name=newPwd]').val()
            if (value !== newPass) {
                return '两次输入密码不一致'
            }
        },
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    });

    $('#user_form').on('submit', e => {
        e.preventDefault()
        let data = $('.layui-form').serialize();
        $.ajax({
            type: "POST",
            url: '/my/updatepwd',
            data,
            success: res => {
                if (res.status == 1) {
                    return layer.msg("更新密码失败 " + res.message)
                }
                layer.confirm('是否修改密码', { icon: 3, title: '提示' }, function (index) {
                    //do something
                    layer.msg(res.message);
                    layer.close(index);
                    $('#user_form')[0].reset()
                });
            }
        })
    })

    $('#repass').click(e => {
        e.preventDefault()
        $('#user_form')[0].reset()
    })
})