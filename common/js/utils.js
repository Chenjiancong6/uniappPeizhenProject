class Utils {
	constructor() {
		// 接口请求地址
		this.baseurl = "https://code.itndedu.com/pz"
	}

	// 获取登录信息
	getUserInfo() {
		uni.login({
			success: (res) => {
				// console.log(res, "登录信息")
				this.request({
					url: '/auth/wxLogin',
					method: 'GET',
					data: {
						code: res.code
					},
					isShowLoading: true,
					// 弃用通过参数获得数据，改造通过promise链式调用获得
					// success: (res) => {
					// 	console.log(res, 'request res');
					// },
					// fail: (err) => {
					// 	console.error(err, 'request err');
					// }
				}).then(res => {
					console.log("then", res)
				})
			}
		})
	}

	// 二次封装请求函数
	request(options = {
		isShowLoading: false
	}) {
		// 如果请求地址为空，则返回出去
		if (!options.url) return false;
		// 如果参数中存在动画，则启用自定义动画
		if (options.isShowLoading) {
			this.showLoadingFn()
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: this.baseurl + options.url, // 请求地址
				method: options.method ? options.method : 'GET', // 请求方式
				header: options.header ? options.header : {}, // 请求头
				data: options.data ? options.data : {}, // 请求参数
				success: function(response) {
					uni.hideLoading();
					// 10000为成功，否则为失败
					if (response.data.code != 10000) {
						reject(response.data);
						// 两种接收参数方式
						if (options.fail && typeof options.fail == 'function') {
							options.fail(response)
						}
					} else {
						resolve(response.data);
						// 两种接收参数方式
						if (options.success && typeof options.success == 'function') {
							options.success(response)
						}
					}
				},
				fail: function(err) {
					console.error(err, 'err')
					uni.hideLoading()
					reject(err)
				}
			})
		})
	}

	// 封装加载动画函数
	showLoadingFn() {
		/*
			如果缓存中存在loading，则隐藏加载动画，并将缓存的值设置为false；
			不存在则为 不管成功失败都打开缓存的值 ，并加载出后就将缓存的值设置为false
		*/
		const isLoading = uni.getStorageSync('isShowLoading')
		if (isLoading) {
			uni.hideLoading()
			uni.setStorageSync('isShowLoading', false)
		};
		uni.showLoading({
			title: '加载中...',
			complete: function() {
				uni.setStorageSync('isShowLoading', true)
			},
			fail: function() {
				uni.setStorageSync('isShowLoading', false)
			}
		})
	}

}

export default new Utils();