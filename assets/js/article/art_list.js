$(function () {

    let form = layui.form
    let layer = layui.layer
    let laypage = layui.laypage;
    let query = {
        pagenum: 1, // 页码值 默认请求第一页数据
        pagesize: 2, // 每页显示多少条数据, 默认加载2条数据
        cate_id: "", // 默认加载所有分类
        state: "", // 文章的状态，可选值有：已发布、草稿 默认加载所有状态
    }

    // 获取列表
    gitList()
    function gitList() {
        $.ajax({
            url: "/my/article/list",
            data: query,
            success: res => {
                let htmlStr = template('get', res);
                $('#getBody').html(htmlStr)
                fen(res.total)
                console.log(res);
            }
        })
    }
    //分页
    function fen(total) {
        laypage.render({
            elem: 'test1',
            count: total,
            limit: query.pagesize,
            limits: [2, 3, 5, 10, 15],
            curr: query.pagenum,
            layout: ["count", "limit", "prev", "page", "next", "skip"],
            jump: function (obj, first) {

                query.pagenum = obj.curr;
                query.pagesize = obj.limit;

                //首次不执行
                if (!first) {
                    gitList() //do something
                }
            } // 起始页
        });
    }

    // 时间 函数
    const zero = n => (n < 10 ? '0' + n : n)
    template.defaults.imports.filterTime = function (time) {
        let d = new Date(time)
        let y = zero(d.getFullYear())
        let m = zero(d.getMonth() + 1)
        let day = zero(d.getDate())
        let h = zero(d.getHours())
        let mm = zero(d.getMinutes())
        let s = zero(d.getSeconds())
        return `${y}-${m}-${day} ${h}:${mm}:${s}`
    }

    // 所有分类列表
    $.ajax({
        url: '/my/article/cates/',
        success: res => {
            res.data.forEach(item => {
                $(`<option value="${item.Id}">${item.name}</option>`).appendTo($('#suoyou'))
                form.render();
            })
        }
    })

    // 筛选功能
    $('#form').submit(function (e) {
        e.preventDefault()
        query.cate_id = $('#suoyou').val()
        query.state = $('#zt').val()
        gitList()
    })

    // 删除功能
    $('body').on('click', '.delBtn', function () {

        if ($(".delBtn").length == 1) {
            if (query.pagenum == 1) {
                query.pagenum == 1
            } else {
                query.pagenum = query.pagenum - 1
            }
        }


        let id = $(this).attr('data-id')
        console.log(id);
        $.ajax({
            url: '/my/article/delete/' + id,
            success: res => {
                if (res.status !== 0) {
                    return "删除失败"
                }
                layer.msg('删除成功')
                gitList()
            }
        })
    })



})