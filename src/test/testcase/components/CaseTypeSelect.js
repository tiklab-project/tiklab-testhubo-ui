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
            value: 'function',
            label: '功能用例',
        },
        {
            value: 'api-unit',
            label: '接口单元',
        },
        {
            value: 'api-scene',
            label: '接口场景',
        },
        {
            value: 'api-perform',
            label: '接口性能',
        },
        {
            value: 'web-scene',
            label: 'web场景',
        },
        {
            value: 'app-scene',
            label: 'APP场景',
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

