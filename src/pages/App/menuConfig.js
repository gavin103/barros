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
		url: '/multi',
		name: '多页',
		breadName: '多页',
		icon: <DesktopOutlined />,
		children: [
			{
				subUrl: '/demo1',
				name: '子页1',
				breadName: '子页1',
			},
			{
				subUrl: '/demo2',
				name: '子页2',
				breadName: '子页2',
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
		path: '/multi/demo1',
		component: React.lazy(() => import('../Demo1')),
	},
	{
		path: '/multi/demo2',
		component: React.lazy(() => import('../Demo2')),
	},
]
