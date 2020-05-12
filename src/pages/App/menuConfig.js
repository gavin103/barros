import React from 'react'
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons'
export const menuList = [
	{
		url: '/',
		name: '控制台',
		breadName: '控制台',
		icon: <PieChartOutlined />,
	},
	{
		url: '/manage',
		name: '管理工具',
		breadName: '管理工具',
		icon: <DesktopOutlined />,
		children: [
			{
				subUrl: '/versionList',
				name: '版本管理',
				breadName: '版本列表',
			},
			{
				subUrl: '/timeList',
				name: '时间管理',
				breadName: '时间列表',
			},
		],
	},
]
export const pageList = [
	{
		path: '/',
		exact: true,
		component: React.lazy(() => import('../About')),
	},
	{
		path: '/manage/versionList',
		component: React.lazy(() => import('../VersionList')),
	},
	{
		path: '/manage/timeList',
		component: React.lazy(() => import('../TimeList')),
	},
]
