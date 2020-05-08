import React from 'react'
import { Table, Upload, Button } from 'antd'
import { cloneDeep } from 'lodash'
class DemoPage extends React.Component {
	state = {
		tableData: [
			{
				key: 1,
				name: '张三',
				age: '14',
				fileList: [
					{
						uid: '-1',
						name: 'xxx.png',
						status: 'done',
						url: 'http://www.baidu.com/xxx.png',
					},
				],
			},
			{
				key: 2,
				name: '李四',
				age: '18',
				fileList: [],
			},
		],
	}
	columns = [
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '年龄',
			dataIndex: 'age',
			key: 'age',
		},
		{
			title: '头像',
			dataIndex: 'fileList',
			key: 'fileList',
			render: (text, record, index) => {
				const { fileList } = record
				return (
					<Upload
						action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
						onChange={(res) => this.handleChange(index, res)}
						fileList={fileList}
						multiple={true}
					>
						<Button>上传</Button>
					</Upload>
				)
			},
		},
	]
	handleChange = (index, res) => {
		let fileList = [...res.fileList]
		fileList = fileList.map((file) => {
			if (file.response) {
				// Component will show file.url as link
				file.url = file.response.url
			}
			return file
		})

		const newFileList = fileList.length ? fileList.slice(-1) : []

		const tableData = cloneDeep(this.state.tableData)
		tableData[index] = {
			...tableData[index],
			fileList: newFileList,
		}
		this.setState({ tableData })
	}
	render() {
		console.log('tableData=>', this.state.tableData)
		return (
			<Table
				bordered
				columns={this.columns}
				dataSource={this.state.tableData}
				pagination={false}
			/>
		)
	}
}
export default DemoPage
