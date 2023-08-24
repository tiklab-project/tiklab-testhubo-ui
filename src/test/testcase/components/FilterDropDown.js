import React, {useState} from "react";
import { FilterOutlined } from '@ant-design/icons';
import {Dropdown, TreeSelect,Radio} from 'antd';

/**
 * 测试用例 左侧列表页测试用例筛选组件
 */
export default function FilterDropDown({
   changeCategory,
   categoryTableList,
   caseSelectFn,
   selectItem
}) {

    const [radio, setRadio] = useState(selectItem || null);

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

    const onChange = (type) =>{
        caseSelectFn(type)
        setRadio(type)
    }


    const filterMenu = (
        <div style={{
            width: "180px",
            background: "white",
            borderRadius: "8px",
            border: "1px solid #e4e4e4",
            display: "flex",
            flexDirection: "column",
            padding:"10px"
        }}>
            <div>
                <div style={{fontSize:"13px",color:"#a8a8a8",padding: "5px 0"}}>模块筛选:</div>
                <TreeSelect
                    fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                    style={{  width: '150px'}}
                    dropdownStyle={{
                        maxHeight: 400,
                        overflow: 'auto',
                    }}
                    className={"dynamic-select-box-item"}
                    placeholder="模块"
                    allowClear
                    treeDefaultExpandAll
                    onChange={changeCategory}
                    treeData={categoryTableList}
                />
            </div>
            <div>
                <div style={{fontSize:"13px",color:"#a8a8a8",padding: "5px 0"}}>用例类型筛选:</div>
                <Radio.Group onChange={(e)=>onChange(e.target.value)} value={radio}>
                    {
                        caseItem(selectItem).map(item=>{
                            return <Radio style={{width:"100px"}} value={item.value}>{item.label}</Radio>
                        })
                    }
                </Radio.Group>
            </div>

        </div>
    );

    return (
        <Dropdown overlay={filterMenu} trigger={['click']}>
            <FilterOutlined style={{fontSize:"18px"}}/>
        </Dropdown>
    )

}