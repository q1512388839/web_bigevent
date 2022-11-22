$(function() {
	const layer = layui.layer
	getUserInfo()

	$('#btn-logout').on('click', function() {
		layer.confirm('确认退出登录？', {
			icon: 3,
			title: '提示'
		}, function(index) {
			//1.删除本地的localstorage
			localStorage.removeItem('token')
			//2.跳转login页面
			location.href = ('login.html')
			layer.close(index);
		});

	})
})


function getUserInfo() {
	$.ajax({
		method: 'GET',
		url: '/my/userinfo',
		success: (res) => {
			if (res.status != 0) {
				return layui.layer.msg('获取用户信息失败!')
			}
			renderAcatar(res.data)
		}

	})
}

//渲染用户头像
function renderAcatar(user) {
	//1.获取用户的名称
	const name = user.nickname || user.username
	//2.设置欢迎文本
	$('#welcom').html('欢迎&nbsp;&nbsp;' + name)
	//3.按需渲染头像
	if (user.user_pic !== null) {
		//图片渲染
		$('.pic_avatar').attr('src', user.user_pic).show()
		$('.text-avatar').hide()
	} else {
		//文字头像渲染
		const first = name[0].toUpperCase()
		$('.pic_avatar').hide()
		$('.text-avatar').html(first).show()
	}


}
