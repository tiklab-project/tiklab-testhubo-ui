import React from "react";
import {Select} from "antd";


const CaseTypeSelect = (props) =>{
    const {caseSelectFn,testType} = props;

    const apiCaseTypeItem=[
        {
            value: 'api-unit',
            label: '接口单元',
        },
        {
            value: 'api-scene',
            label: '接口场景',
        }
    ]

    const uiCaseTypeItem=[
        {
            value: 'web-scene',
            label: 'web场景',
        },{
            value: 'app-scene',
            label: 'APP场景',
        },
    ]

    const performCaseTypeItem=[
        {
            value: 'api-perform',
            label: '接口性能',
        },
        // {
        //     value: 'web-perform',
        //     label: 'web性能',
        // },
        // {
        //     value: 'app-perform',
        //     label: 'APP性能',
        // },
    ]


    let caseItem = (testType) =>{
        let item =[{
            value: null,
            label: '所有',
        }]
        switch (testType) {
            case "function":
                break;
            case "api":
                return item=[...item,...apiCaseTypeItem];
            case "ui":
                return item=[...item,...uiCaseTypeItem];
            case "perform":
                return item=[...item,...performCaseTypeItem];
            default:
                return item=[
                    ...item,
                    ...apiCaseTypeItem,
                    ...uiCaseTypeItem,
                    ...performCaseTypeItem,
                ];
        }

        return  item
    }

    return(
        <>
            <Select
                // defaultValue={null}
                placeholder={"用例类型"}
                className={"dynamic-select-box-item"}
                onChange={caseSelectFn}
                options={caseItem(testType)}
            />
        </>
    )
}

export default CaseTypeSelect;

