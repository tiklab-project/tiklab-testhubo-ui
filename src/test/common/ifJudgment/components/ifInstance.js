import React from "react";
import {Col, Form, Radio, Row, Select, Table} from "antd";

const {Option} = Select

const IfInstance = ({ifInstance}) =>{
    const columns = [
        {
            title: "变量",
            dataIndex: "variable",
            key: "variable",
            width: '30%',
            editable: true,
        },
        {
            title: "比较",
            dataIndex: "compare",
            key: "compare",
            width: '20%',
            render: (text, record)=>(
                <Select
                    style={{width:"100%"}}
                    bordered={false}
                    value={record.compare}
                    disabled
                >
                    <Option value={1}>等于</Option>
                    <Option value={2}>不等于</Option>
                    <Option value={3}>小于</Option>
                    <Option value={4}>小于等于</Option>
                    <Option value={5}>大于</Option>
                    <Option value={6}>大于等于</Option>
                </Select>
            )
        },{
            title: "期望",
            dataIndex: "expect",
            key: "expect",
            width: '30%',
            editable: true,
        },
        {
            title: "结果",
            key: "action",
            width: '20%',
            render: (text, record) =>(text?<span>成功</span>:<span>失败</span> )
        },
    ]
    return(
        <div style={{padding:"15px"}}>
            <Row gutter={[0]}>
                <Col span={3}>
                    <div style={{fontWeight:"bold"}}>条件关系: </div>
                </Col>
                <Col span={12}>

                    <Radio.Group value={ifInstance.relation}>
                        <Radio value={"and"}>AND</Radio>
                        <Radio value={"or"}>OR</Radio>
                    </Radio.Group>

                </Col>
            </Row>

            <div style={{margin:"10px 0",fontWeight:"bold"}}>变量比较: </div>

            <div className={"table-list-box"}>
                <Table
                    columns={columns}
                    dataSource={ifInstance?.ifVariableInstanceList}
                    rowKey = {record => record.id}
                    pagination={false}
                />
            </div>

        </div>
    )
}
export default IfInstance;