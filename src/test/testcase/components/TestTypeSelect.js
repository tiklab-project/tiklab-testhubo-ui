import React from "react";
import {Select} from "antd";

const TestTypeSelect = (props) =>{
    const {setTestType} = props;


    //测试类型筛选项
    const testTypeItems=[
        {
            value: null,
            label: '所有',
        },
        {
            value: 'function',
            label: '功能',
        },
        {
            value: 'api',
            label: '接口',
        },
        {
            value: 'ui',
            label: 'UI',
        },
        {
            value: 'perform',
            label: '性能',
        },
        // {
        //     key: 'func',
        //     title: '功能',
        // },
    ]




    return(
        <Select
            // defaultValue={null}
            placeholder={"测试类型"}
            className={"dynamic-select-box-item"}
            onChange={setTestType}
            options={testTypeItems}
        />
    )
}

export default TestTypeSelect;