const proxy = {
	// 'GET /test': { aaa: 'aaa' },
	'GET /api/manage/versionlist': require('./api/manage/versionlist'),
}

module.exports = proxy
