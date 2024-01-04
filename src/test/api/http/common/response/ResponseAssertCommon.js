import React from "react";
import {Select, Table, Tag} from "antd";

const { Option } = Select;

const ResponseAssertCommon = (props) => {
    const {list} = props;


    let column = [
        {
            title: '来源',
            dataIndex: 'source',
            width: '20%',
            render:(text,record) =>  (
                <Select
                    defaultValue={record.source}
                    bordered={false}
                    style={{'width':"100%"}}
                    onSelect= {(e) => onSelect(e,record)}
                    disabled={false}
                    showArrow={false}
                >
                    <Option value={1}>状态码</Option>
                    <Option value={2}>响应头</Option>
                    <Option value={3}>响应体</Option>
                </Select>
            )
        },{
            title: '属性',
            dataIndex: 'propertyName',
            width: '30%',
            editable: true,
        },
        {
            title: '期望值',
            width: '20%',
            dataIndex: 'value',
        },
        {
            title: '实际值',
            dataIndex: 'actualResult',
            width: '20%',
        },
        {
            title: '结果',
            width: '10%',
            dataIndex: 'result',
            render:(text,record) =>  (
                <>
                    {
                        text===1
                            ?<Tag color={"green"}>成功</Tag>
                            :<Tag color={"red"}>失败</Tag>
                    }
                </>
            )
        }
    ]


    return(
        <Table
            bordered
            dataSource={list}
            pagination={false}
            rowKey={record => record.id}
            columns={column}
        />
    )

}

export default ResponseAssertCommon;