
$.ajaxPrefilter(function (options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url
    
    options.headers = {  //因为我们访问的时候需要用token 所以会获取到一段密钥 需要加上去
        Authorization: localStorage.getItem("token")
    }
})

