$(function() {
	$(".link_reg_login").on("click", function() {
		$(".login-box").toggle()
		$(".reg-box").toggle()
	})
	$('.link_reg_login').click()
	var form = layui.form;
	var layer = layui.layer;

	// 通过 form.verify() 函数自定义校验规则
	form.verify({
		username: function(value, item) { //value：表单的值、item：表单的DOM对象
			if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
				return '用户名不能有特殊字符';
			}
			if (/(^\_)|(\__)|(\_+$)/.test(value)) {
				return '用户名首尾不能出现下划线\'_\'';
			}
			if (/^\d+\d+\d$/.test(value)) {
				return '用户名不能全为数字';
			}
			// if (value === 'xxx') {
			// 	alert('用户名不能为敏感词');
			// 	return true;
			// }
		},

		pass: [
			/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
		],
		repwd: function(value) {
			// 通过形参拿到的是确认密码框中的内容
			// 还需要拿到密码框中的内容
			// 然后进行一次等于的判断
			// 如果判断失败,则return一个提示消息即可
			var pwd = $('.reg-box [name=password]').val()
			if (pwd !== value) {
				return '两次密码不一致！'
			}
		}
	});
	//监听注册表单的提交事件
	$('#form_reg').on('submit', function(e) {
		// e.preventDefault()
		var data = {
			username: $('#form_reg [name=username]').val(),
			password: $('#form_reg [name=password]').val()
		}
		$.post('/api/reguser', data, function(res) {
			if (res.status !== 0) {
				console.log(res.message);
				return layer.msg(res.message)
			}
			layer.msg('注册成功，请登录！')
			// 模拟人的点击行为
			$('.link_reg_login').eq(1).click()
		})

		//阻止表单的默认提交事件
		return false
	})
	//登录表单的验证事件
	$('#form_login').on('submit', function(e) {
		// 阻止默认提交行为
		// e.preventDefault()
		$.ajax({
			url: '/api/login',
			method: 'POST',
			// 快速获取表单中的数据
			data: $(this).serialize(),
			success: function(res) {
				if (res.status !== 0) {
					return layer.msg('登录失败！')
				}
				layer.msg('登录成功！')
				// 将登录成功得到的 token 字符串，保存到 localStorage 中
				localStorage.setItem('token', res.token)
				// 跳转到后台主页
				location.href = './index.html'
			}
		})
		return false
	})
})
