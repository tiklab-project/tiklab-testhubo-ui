import React from "react";
import {Select} from "antd";


const CaseTypeSelect = (props) =>{
    const {caseSelectFn} = props;

    const apiCaseTypeItem=[
        {
            value: null,
            label: '所有',
        },
        {
            label: '接口',
            options: [
                {
                    value: 'api-unit',
                    label: '单元',
                },
                {
                    value: 'api-scene',
                    label: '场景',
                },
                {
                    value: 'api-perform',
                    label: '性能',
                },
            ]
        },{
            label: '功能',
            options: [
                {
                    value: 'function',
                    label: '功能用例',
                },
            ]
        },{
            label: 'UI',
            options: [
                {
                    value: 'web-scene',
                    label: '场景',
                },
            ]
        },{
            label: 'APP',
            options: [
                {
                    value: 'app-scene',
                    label: '场景',
                },
            ]
        },




    ]

    return(
        <>
            <Select
                // defaultValue={null}
                placeholder={"用例类型"}
                className={"dynamic-select-box-item"}
                onChange={caseSelectFn}
                options={apiCaseTypeItem}
            />
        </>
    )
}

export default CaseTypeSelect;

