$(function () {
    initEditor()

    // 初始化富文本编辑器
    initEditor();

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

    $("#chooseImg").click(function () {
        $("#file").click();
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
    
})