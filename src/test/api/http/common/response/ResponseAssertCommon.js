import React from "react";
import {Select, Table, Tag} from "antd";
import {assertCompare} from "../../../../../common/dictionary/dictionary";

const { Option } = Select;

const ResponseAssertCommon = (props) => {
    const {list} = props;


    let column = [
        {
            title: '来源',
            dataIndex: 'source',
            width: '15%',
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
            width: '25%',
            editable: true,
        },
        {
            title: '期望值',
            width: '20%',
            dataIndex: 'value',
        },
        {
            title: '比较',
            width: '10%',
            dataIndex: 'comparator',
            render:(text,record)=> showCompare(text)
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

    const showCompare = (comparator) =>{
        switch (comparator) {
            case assertCompare.EQUAL:
                return "等于";
            case assertCompare.NOT_EQUAL:
                return "不等于";
            case assertCompare.LESS_THAN:
                return "小于";
            case assertCompare.LESS_THAN_OR_EQUAL:
                return "小于等于";
            case assertCompare.GREATER_THAN:
                return "大于"
            case assertCompare.GREATER_THAN_OR_EQUAL:
                return "大于等于"
        }
    }


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