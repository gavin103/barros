import request from './request'
import { message } from 'antd'

// 柯里化的应用，抽离公共代码

const get = (url) => async (params) =>
	request(url, {
		params,
	}).then((res) => {
		const { code, data, msg } = res
		if (code === 1) {
			return data
		} else {
			message.error(msg || '服务器错误')
		}
	})

const post = (url) => async (data) =>
	request(url, {
		method: 'POST',
		data,
	}).then((res) => {
		const { code, data, msg } = res
		if (code === 1) {
			return data
		} else {
			message.error(msg || '服务器错误')
		}
	})

export { get, post }
