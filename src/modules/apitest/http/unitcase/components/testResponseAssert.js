import React from 'react';
import { observer, inject } from "mobx-react";
import { Table } from 'antd';


// 测试过后的断言
const TestResponseAssert = (props) =>{
    const { apiUnitStore } = props;
    const { assertResponse } = apiUnitStore;
    let columns= [
        {
            title: '来源',
            dataIndex: 'source',
            width: '20%',
            align:'center',
            render:(text,record) =>  ( setSelectValue(record.source) )
        },
        {
            title: '属性名称',
            dataIndex: 'propertyName',
            width: '25%',
        },
        {
            title: '比较符',
            width: '10%',
            dataIndex: 'comparator',

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
            render:(text,record) =>  ( setResult(record.result))
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

    const setResult = (value) => {
        if(value === 1){
            return '成功'
        }else{
            return '失败'
        }
    }


    return (
        <Table
            bordered
            pagination={false}
            dataSource={assertResponse}
            columns={columns}
            rowKey = {record => record.id}
        />
    );
}




export default inject('apiUnitStore')(observer(TestResponseAssert));