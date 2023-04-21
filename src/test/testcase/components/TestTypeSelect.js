import React from "react";

const TestTypeSelect = (props) =>{
    const {selectItem,selectKeyFun} = props;


    //测试类型筛选项
    const testTypeItems=[
        {
            key: null,
            title: '所有',
        },
        {
            key: 'function',
            title: '功能',
        },
        {
            key: 'api',
            title: '接口',
        },
        {
            key: 'ui',
            title: 'UI',
        },
        {
            key: 'perform',
            title: '性能',
        },
        // {
        //     key: 'func',
        //     title: '功能',
        // },
    ]


    //渲染筛选项
    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`ws-header-menu-item  ${item.key === selectItem ? "ws-header-menu-item-selected" : ""}`}
                    onClick={()=>selectKeyFun(item)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }

    return(
        <div className={"ws-header-menu-left"}>
            {showMenu(testTypeItems)}
        </div>
    )
}

export default TestTypeSelect;