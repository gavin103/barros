import React from 'react'
import { render } from 'react-dom'
import { ConfigProvider } from 'antd'
import moment from 'moment'
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'

import App from './pages/App'
import 'antd/dist/antd.css'
import * as serviceWorker from './serviceWorker'

moment.locale('zh-cn')

const Main = () => {
	return (
		<ConfigProvider locale={zhCN}>
			<App />
		</ConfigProvider>
	)
}

render(<Main />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
