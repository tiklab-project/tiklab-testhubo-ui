import React from "react";
import {Space, Table, Tag} from "antd";
import "./stepAssertStyle.scss"

const AssertList =(props) =>{
    const {assertList} = props;


    const showCompare = (compare) =>{
        switch (compare) {
            case 1:
                return "等于";
            case 2:
                return "不等于"
            case 3:
                return "小于"
            case 4:
                return "小于等于"
            case 5:
                return "大于"
            case 6:
                return "大于等于"

        }
    }

    const showElementType = (type) =>{
        switch (type) {
            case 1:
                return "期望值";
            case 2:
                return "元素存在"
            case 3:
                return "元素不存在"
        }
    }


    const showAssertList = () =>{
        return assertList&&assertList.map(item=>{

            if(item.type==="variable"){
                const  variable = item.variableAssert

                return(
                    <div className={"assert-item"}>
                        <Tag color="#2db7f5">值断言</Tag>
                        <Space>
                            <div style={{fontSize:"12px",color:"#aaa" }}>变量值: </div>
                            <div>{variable.variable}</div>

                            <div style={{fontSize:"12px",color:"#aaa" }}>比较: </div>
                            <div>{showCompare(variable.compare)}</div>

                            <div style={{fontSize:"12px",color:"#aaa" }}>期望值: </div>
                            <div>{variable.expect}</div>
                        </Space>
                    </div>
                )
            }else {
                const  element = item.elementAssert

                return(
                    <div className={"assert-item"}>
                        <Tag color="#2db7f5">元素断言</Tag>
                        <Space>
                            <div style={{fontSize:"12px",color:"#aaa" }}>定位: </div>
                            <div>{element.location}</div>
                            <div style={{fontSize:"12px",color:"#aaa" }}>参数: </div>
                            <div>{item.locationValue}</div>

                            <div style={{fontSize:"12px",color:"#aaa" }}>元素类型: </div>
                            <div>{showElementType(element.elementType)}</div>

                            {
                                element.elementType===1
                                    ? <>
                                        <div style={{fontSize:"12px",color:"#aaa" }}>期望值: </div>
                                        <div>{element.expect}</div>
                                    </>


                                    : null
                            }

                        </Space>
                    </div>
                )
            }
        })
    }


    return(
        <div>
            {
                showAssertList()
            }
        </div>
    )
}

export default AssertList;