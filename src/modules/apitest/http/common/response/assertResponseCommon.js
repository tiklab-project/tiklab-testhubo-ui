import React from 'react';
import { Table } from 'antd';

const AssertResponseCommon = (props) =>{
    const {assertList} = props;

    let columns= [
        {
            title: '来源',
            dataIndex: 'source',
            width: '25%',
            render:(text,record) =>  ( setSelectValue(record.source) )
        },
        {
            title: '属性名称',
            dataIndex: 'propertyName',
            width: '25%',
        },
        {
            title: '值',
            width: '25%',
            dataIndex: 'value',

        },
        {
            title: '参数值',
            width: '25%',
            dataIndex: 'result',
            render:(text) => ( text===1? '成功': '失败')
        }
    ]

    const setSelectValue = (value) => {
        switch(value){
            case 1:
                return '状态码';
            case 2:
                return '响应头';
            case 3:
                return '响应体';
        }
    }


    return (
        // <div className={"tabPane-item-box"}>
            <Table
                bordered
                pagination={false}
                dataSource={assertList}
                columns={columns}
                rowKey = {record => record.id}
            />
        // </div>
    );
}

export default AssertResponseCommon;
