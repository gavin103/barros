import { get, post } from '../../utils/request'

const API = {
	versionlist: '/api/manage/version/list',
	allcities: '/api/common/allcitiesx',
	deleteVersion: '/api/manage/version/delete',
	settime: '/api/manage/version/settime',
}

export const getVersionList = get(API.versionlist)
export const getCities = get(API.allcities)
export const deleteVersion = post(API.deleteVersion)
export const setTime = post(API.settime)
