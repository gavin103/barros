import React from 'react'
import request from '../../utils/request'
request('/test').then((data) => console.log(234234, data))
function ErrorPage() {
	return <div>About</div>
}
export default ErrorPage
