const proxy = {
	'GET /api/manage/version/list': require('./api/manage/version/list'),
	'GET /api/common/allcities': require('./api/common/allcities'),
	'POST /api/manage/version/delete': require('./api/manage/version/delete'),
}

module.exports = proxy
