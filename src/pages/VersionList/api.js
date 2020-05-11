import * as query from '../../utils/query'

const API = {
	versionlist: '/api/manage/versionlist',
	allcities: '/api/common/allcities',
}

export const getVersionList = query.get(API.versionlist)

export const getCities = query.get(API.allcities)
