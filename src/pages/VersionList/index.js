import React, { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Table, Card, Button } from 'antd'
import * as APIs from './api'
import { actionTypes, initialState, reducer } from './reducer'
import './index.scss'

const PAGESIZE = 10

function VersionList(props) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { versionList = [], total, current } = state

	const [loading, setLoading] = useState(false)
	const [pageNum, setPageNum] = useState(1)

	useEffect(() => {
		async function getVersionList() {
			setLoading(true)
			const data = await APIs.getVersionList()
			if (data) {
				const {
					versions: versionList,
					totalCount: total,
					pageNum: current,
				} = data
				setLoading(false)
				dispatch({
					type: actionTypes.GET_VERSION_LIST,
					payload: { versionList, total, current },
				})
			} else {
				setLoading(false)
				dispatch({
					type: actionTypes.GET_VERSION_LIST,
					payload: { versionList: [] },
				})
			}
		}
		getVersionList()
	}, [pageNum])

	const handleTableChange = (pagination) => setPageNum(pagination.current)

	const pagination = {
		total,
		current,
		pageSize: PAGESIZE,
		size: 'small',
		showSizeChanger: false,
		showTotal: (total) => `总计${total}条记录`,
	}
	const columns = [
		{
			title: '序号',
			dataIndex: 'version',
			key: 'version',
			width: 100,
		},
		{
			title: '生效时间',
			align: 'center',
			dataIndex: 'effectiveTime',
		},
		{
			title: '操作',
			width: 200,
			render: (text, record) => [
				// <Button type="link">详情</Button>,
				<Link to="/" target="_blank">
					详情
				</Link>,
				record.editable ? <Button type="link">编辑</Button> : null,
			],
		},
	]

	return (
		<>
			<Card className="version-list-head">
				<Button>查询</Button>
			</Card>
			<Card className="version-list-body">
				<Table
					bordered
					rowKey="version"
					loading={loading}
					columns={columns}
					pagination={pagination}
					dataSource={versionList}
					onChange={handleTableChange}
				/>
			</Card>
		</>
	)
}
export default VersionList
