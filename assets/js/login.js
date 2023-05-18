$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.reg-box [name=password]').val()
            if(pwd !== value) {
                return '两次密码不一致!'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault() 
        // 2. 发起Ajax的POST请求
        var data = {
            username: $('.reg-box [name=username]').val(),
            password: $('.reg-box [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功！')
            $('#link_login').click()
        })
    })

      // 监听登录表单的提交事件
      $('#form_login').submit(function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'post',
            data: $('#form_login').serialize(),
            success: function (res) {
                if (res.status!== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token',res.token)
                console.log(res.token)
                location.href = 'index.html'
            }
        })
      })
}) 