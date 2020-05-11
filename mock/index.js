const proxy = {
	'GET /api/manage/versionlist': require('./api/manage/versionlist'),
	'GET /api/common/allcities': require('./api/common/allcities'),
}

module.exports = proxy
