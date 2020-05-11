import React, { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { Table, Card, Button, Select, Input, Spin } from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce'
import * as APIs from './api'
import { actionTypes, initialState, reducer } from './reducer'
import './index.scss'

const { Option } = Select
const PAGESIZE = 10

function VersionList(props) {
	const [state, dispatch] = useReducer(reducer, initialState)
	const { versionList = [], total, current, cities } = state
	const [loading, setLoading] = useState(false)
	const [pageNum, setPageNum] = useState(1)
	const [searching, setSearching] = useState()
	const [keywords, setKeywords] = useState()
	useEffect(() => {
		async function getVersionList(params) {
			setLoading(true)
			const data = await APIs.getVersionList(params)
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
		getVersionList({ city: keywords })
	}, [pageNum, keywords])

	const getCities = async (params) => {
		setSearching(true)
		const data = await APIs.getCities(params)
		const { allcities = [] } = data
		if (data) {
			setSearching(false)
			dispatch({
				type: actionTypes.GET_CITIES,
				payload: allcities,
			})
		} else {
			setSearching(false)
			dispatch({
				type: actionTypes.GET_CITIES,
				payload: [],
			})
		}
	}

	const handleTableChange = (pagination) => setPageNum(pagination.current)
	const handleSearchInput = (value) => {
		getCities({ keywords: value })
	}

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
				<Link to="/" target="_blank" key={record.version + '1'}>
					详情
				</Link>,
				record.editable ? (
					<Button key={record.version + '2'} type="link">
						编辑
					</Button>
				) : null,
			],
		},
	]
	console.log('state=>', state)
	return (
		<>
			<Card className="version-list-head">
				<Input.Group compact>
					<Select
						showSearch
						showArrow={false}
						value={keywords}
						placeholder="请选择城市"
						notFoundContent={searching ? <Spin size="small" /> : null}
						filterOption={false}
						onSearch={debounce(handleSearchInput, 300)}
						onChange={(value) => setKeywords(value)}
						style={{ width: 256 }}
					>
						{cities.map((item) => (
							<Option key={item.cityId}>{item.name}</Option>
						))}
					</Select>
					<Button type="primary">
						{searching ? <LoadingOutlined /> : <SearchOutlined />}
					</Button>
				</Input.Group>
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
