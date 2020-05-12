import React, { useState, useEffect, useReducer } from 'react'
import {
	Table,
	Card,
	Button,
	Select,
	Input,
	Spin,
	Popconfirm,
	message,
	Modal,
	DatePicker,
} from 'antd'
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons'
import debounce from 'lodash/debounce'
import moment from 'moment'
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
	const [visible, setVisible] = useState(false)
	const [modifyRecord, setModifyRecord] = useState({})
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
		const { value: city } = keywords || {}
		getVersionList({ city, pageNum })
	}, [pageNum, keywords])

	const getCities = async (params) => {
		setSearching(true)
		const data = await APIs.getCities(params)
		if (data) {
			setSearching(false)
			const { allcities = [] } = data
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
	const handleSearchInput = (value) => getCities({ keywords: value })
	const handleSearchSelect = (value) => setKeywords(value)
	const handleDetailClick = (version) => {
		window.open(`/manage/versionDetail?version=${version}`)
	}
	const handleDeleteClick = async (version) => {
		const res = await APIs.deleteVersion({ version })
		if (res && res.code === 1) {
			message.success(`#${version}已删除`)
			setKeywords({ ...keywords })
		}
	}
	const handleModifyClick = (record) => {
		setModifyRecord(record)
		setVisible(true)
	}
	const handleModalCancel = () => {
		setVisible(false)
	}
	const handleModalOk = async () => {
		const { effectiveTime, version } = modifyRecord
		const res = await APIs.setTime({ effectiveTime, version })
		if (res && res.code === 1) {
			message.success(`#${version}生效时间修改为：${effectiveTime}`)
			setKeywords({ ...keywords })
		}
	}
	const handleAfterClose = () => {
		setModifyRecord({})
	}
	const handleChangeEffectTime = (value) => {
		const effectiveTime = value.format('YYYY-MM-DD HH:mm:ss')
		setModifyRecord({ ...modifyRecord, effectiveTime })
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
			width: 256,
			render: (text, record) => [
				<Button
					key={record.version + '1'}
					type="link"
					onClick={() => handleDetailClick(record.version)}
				>
					详情
				</Button>,
				<Popconfirm
					title="请确认是否删除该项？"
					onConfirm={() => handleDeleteClick(record.version)}
					key={record.version + '2'}
				>
					<Button type="link">删除</Button>
				</Popconfirm>,
				record.editable ? (
					<Button
						key={record.version + '3'}
						type="link"
						onClick={() => handleModifyClick(record)}
					>
						修改
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
						labelInValue
						showArrow={false}
						value={keywords}
						placeholder="请输入城市名称搜索"
						notFoundContent={searching ? <Spin size="small" /> : null}
						filterOption={false}
						onSearch={debounce(handleSearchInput, 300)}
						onSelect={handleSearchSelect}
						style={{ width: 256 }}
					>
						<Option key="">（空）</Option>
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
			<Modal
				visible={visible}
				width={360}
				title={`修改项目#${modifyRecord.version}`}
				onCancel={handleModalCancel}
				onOk={handleModalOk}
				afterClose={handleAfterClose}
				wrapClassName="version-modal"
			>
				<div className="version-inner">
					<span>生效时间：</span>
					<DatePicker
						value={moment(modifyRecord.effectiveTime)}
						format="YYYY-MM-DD HH:mm:ss"
						onChange={handleChangeEffectTime}
						showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
					/>
				</div>
			</Modal>
		</>
	)
}
export default VersionList
