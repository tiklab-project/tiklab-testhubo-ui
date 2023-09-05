import React from "react";

const TestTypeSelect = (props) =>{
    const {selectItem,selectKeyFun,style} = props;


    //测试类型筛选项
    const testTypeItems=[
        {
            key: null,
            title: '所有用例',
        },
        {
            key: 'createUser',
            title: '我创建的',
        },

    ]


    //渲染筛选项
    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`tc-header-menu-item  ${item.key === selectItem ? "tc-header-menu-item-selected" : ""}`}
                    onClick={()=>selectKeyFun(item)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }

    return(
        <div className={"tc-header-menu-left"} style={style}>
            {showMenu(testTypeItems)}
        </div>
    )
}

export default TestTypeSelect;