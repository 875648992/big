$(function () {

    var layer = layui.layer;
    var form = layui.form;
    // 获取页面内容 渲染
    getArtInfo()
    function getArtInfo() {
        $.ajax({
            url: '/my/article/cates',
            success: res => {
                let tpl = template('tr', res)
                $('#info_body').html(tpl)
            }
        })
    }


    // 添加按钮
    let index;
    $('#add_tr').click(function () {

        index = layer.open({
            type: 1,
            title: "添加文章分类",
            area: ['500px',],
            content: $('#open').html(),
        });
    })

    //添加内容
    $('body').on('submit', '#addform', function (e) {
        e.preventDefault()

        let data = $('#addform').serialize()
        $.ajax({
            type: "POST",
            url: '/my/article/addcates',
            data,
            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("新增文章分类失败！")
                }

                layer.msg("新增文章分类成功！")
                layer.close(index);
                getArtInfo()
            }
        })
    })

    // 编辑按钮
    let comindex;
    $('body').on('click', '#com', function () {
        comindex = layer.open({
            type: 1,
            title: "修改文章分类",
            area: ['500px'],
            content: $('#addCom').html(),
        });
        let id = $(this).attr('data-id')
        $.ajax({
            url: "/my/article/cates/" + id,
            success: res => {
                console.log(res);
                var data1 = form.val("comform", res.data);
            }
        })
    })

    // 修改
    $('body').on('submit', '#comform', function (e) {
        e.preventDefault()
        let data = $(this).serialize()
        console.log(data);
        $.ajax({
            url: '/my/article/updatecate',
            type: "POST",
            data,
            success: res => {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                layer.msg('更新信息成功')
                layer.close(comindex);
                getArtInfo()
            }
        })

    })

    // 删除
    $('body').on('click', '#del', function () {
        let id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            url: "/my/article/deletecate/" + id,

            success: res => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("删除文章分类失败！")
                }

                layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
                    //do something
                    layer.msg("删除文章分类成功！")
                    getArtInfo()
                    layer.close(index);
                });

            }
        })
    })
})