$(function () {
    let form = layui.form;


    let id = location.href.split('?')[1];



    function xiugai() {
        $.ajax({
            url: "/my/article/" + id,
            success: res => {
                form.val('form', res.data)
                console.log(res);
            }
        })
    }




    $.ajax({
        url: "/my/article/cates",
        success: function (res) {
            // console.log(res);

            res.data.forEach((item) => {
                $(`<option value="${item.Id}">${item.name}</option>`).appendTo(
                    $("#cateSelect")
                );
            });

            // 添加之后还需要让form重新渲染
            form.render();
            xiugai()
        },

    });



    // 初始化富文本编辑器
    initEditor();

    // 初始化富文本编辑器

    // 图片裁剪功能
    // 1. 初始化图片裁剪器
    var $image = $("#image");

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: ".img-preview",
    };

    // 3. 初始化裁剪区域
    $image.cropper(options);

    // 选择封面的功能
    $("#btn").click(function () {
        $("#file").click();
    });

    // 更换裁切图片
    $("#file").change(function (e) {
        //  获取到选择的图片
        let file = this.files[0];
        console.log(file);

        // 根据选择的文件，创建一个对应的 URL 地址：
        let newImgURL = URL.createObjectURL(file);

        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", newImgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    });

    $('#btn').click(function () {
        $('#file').click()
        $('#file').change(function (e) {
            let file = this.files[0]
            console.log(file);
            var newImgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy')      // 销毁旧的裁剪区域
                .attr('src', newImgURL)  // 重新设置图片路径
                .cropper(options)
        })
    })
    $("#file").change(function (e) {
        //  获取到选择的图片
        let file = this.files[0];

        // 根据选择的文件，创建一个对应的 URL 地址：
        let newImgURL = URL.createObjectURL(file);

        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", newImgURL) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    });

    // 处理下state状态
    let state; // 文章状态（已发布、草稿）

    // 点击发布按钮
    $("#btn1").click(function () {
        state = "已发布";
    });

    // 点击存为草稿按钮
    $("#btn2").click(function () {
        state = "草稿";
    });

    // 实现文章发布
    $("#addForm").on("submit", function (e) {
        e.preventDefault();

        // 得到封面文件对象
        $image
            .cropper("getCroppedCanvas", {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280,
            })
            .toBlob((blob) => {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作

                // 收集表单数据 ==> 需要通过FormData收集表单数据（接口决定的）
                let fd = new FormData(this);

                // 把state状态追加到fd中 ==> append()
                fd.append("state", state);
                // 把文章封面追加到fd中收集起来
                fd.append("cover_img", blob);
                fd.append("Id", id);

                // 查看下fd中收集的数据
                /* fd.forEach((v, key) => {
                  console.log(v, key);
                }); */

                if (location.href.split('?').length > 1) {
                    $.ajax({
                        url: '/my/article/edit',
                        type: 'POST',
                        data: fd,
                        // 当使用jQ发送fd数据的时候，一定要有以下两个配置
                        contentType: false,
                        processData: false,
                        success: function (res) {
                            console.log(res);
                            // 跳转到文章列表页面
                            location.href = "/home/article/art_list.html";
                        },
                    })
                } else {
                    $.ajax({
                        url: "/my/article/add",
                        type: "POST",
                        data: fd,
                        // 当使用jQ发送fd数据的时候，一定要有以下两个配置
                        contentType: false,
                        processData: false,
                        success: function (res) {

                            // 跳转到文章列表页面
                            location.href = "/home/article/art_list.html";
                        },
                    });
                }

                // 发送ajax-实现文章的发布

            });
    });



})