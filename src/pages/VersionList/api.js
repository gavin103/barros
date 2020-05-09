import request from '../../utils/request'
import { message } from 'antd'
const API = {
	versionlist: '/api/manage/versionlist',
}

export const getVersionList = async () =>
	request(API.versionlist).then((res) => {
		const { code, data, msg } = res
		if (code === 1) {
			return data
		} else {
			message.error(msg || '服务器错误')
		}
	})
