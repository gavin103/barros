import React, { Suspense, useState } from 'react'
import { Layout, Menu, Breadcrumb, Skeleton } from 'antd'
import { GithubOutlined } from '@ant-design/icons'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { menuList, pageList } from './menuConfig'
import './index.css'
const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const generateMenu = (menuList = []) => {
	const node = []
	menuList.forEach((item, index) => {
		if (item.children) {
			node.push(
				<SubMenu key={item.url} icon={item.icon} title={item.name}>
					{item.children.map((it, key) => (
						<Menu.Item key={`${item.url}${it.subUrl}`}>
							<Link to={`${item.url}${it.subUrl}`}>{it.name}</Link>
						</Menu.Item>
					))}
				</SubMenu>
			)
		} else {
			node.push(
				<Menu.Item key={item.url} icon={<Link to={item.url}>{item.icon}</Link>}>
					{item.name}
				</Menu.Item>
			)
		}
	})
	return node
}
const checkOpenKeys = (menuList = [], pathname) => {
	for (const item of menuList) {
		if (item.children && item.url !== '/' && pathname.indexOf(item.url) === 0) {
			return [item.url]
		}
	}
	return []
}
const checkBreadNames = (menuList = [], pathname) => {
	const breadList = []
	for (const item of menuList) {
		if (pathname === '/') {
			return [menuList[0].breadName]
		} else if (item.url !== '/' && pathname.indexOf(item.url) === 0) {
			breadList.push(item.breadName)
			if (item.children) {
				const selecedChild = item.children.find(
					(child) => pathname.indexOf(child.subUrl) > 0
				)
				selecedChild && breadList.push(selecedChild.breadName)
			}
			return breadList
		}
	}
}

function App(props) {
	// state初始值
	const { pathname } = window.location
	const initOpenKeys = checkOpenKeys(menuList, pathname)
	const initBreadList = checkBreadNames(menuList, pathname)
	// 初始化state
	const [selectedKey, setSelectedKey] = useState(pathname)
	const [openKeys, setOpenKeys] = useState(initOpenKeys)
	const [breadList, setBreadList] = useState(initBreadList)
	// state变化函数
	const handleSelect = ({ key }) => {
		setSelectedKey(key)
		setBreadList(checkBreadNames(menuList, key))
	}
	const handleOpen = (keys) => {
		setOpenKeys(keys)
	}
	// render Node
	const menuNode = generateMenu(menuList)

	return (
		<Router>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider>
					<div className="site-avatar">
						<GithubOutlined />
					</div>
					<Menu
						theme="dark"
						mode="inline"
						onSelect={handleSelect}
						selectedKeys={[selectedKey]}
						onOpenChange={handleOpen}
						openKeys={openKeys}
					>
						{menuNode}
					</Menu>
				</Sider>
				<Layout className="site-layout">
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>管理系统</Breadcrumb.Item>
							{breadList.map((it) => (
								<Breadcrumb.Item key={it}>{it}</Breadcrumb.Item>
							))}
						</Breadcrumb>
						<div
							className="site-layout-background"
							style={{ padding: 24, minHeight: 360 }}
						>
							<Suspense fallback={<Skeleton active />}>
								{pageList.map((conf) => (
									<Route key={conf.path} {...conf} />
								))}
							</Suspense>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>HOOKS实践</Footer>
				</Layout>
			</Layout>
		</Router>
	)
}
export default App
