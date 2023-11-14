import React from "react";
import {Space, Table, Tag} from "antd";
import "./stepAssertStyle.scss"
import IconCommon from "../../../common/IconCommon";
import {observer} from "mobx-react";

const AssertList =(props) =>{
    const {assertList,deleteAssert,updateAssert} = props;

    /**
     * 值断言中的比较
     */
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

    /**
     * 元素断言中的类型
     */
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

    /**
     * 值断言
     */
    const variableView = (data)=>{
        return(
            <div className={"display-flex-gap"}>
                <div style={{width:"100px"}}>
                    <Tag color="#2db7f5">值断言</Tag>
                </div>
                <Space>
                    <div style={{fontSize:"12px",color:"#aaa" }}>变量值: </div>
                    <div>{data.variable}</div>

                    <div style={{fontSize:"12px",color:"#aaa" }}>比较: </div>
                    <div>{showCompare(data.compare)}</div>

                    <div style={{fontSize:"12px",color:"#aaa" }}>期望值: </div>
                    <div>{data.expect}</div>
                </Space>
            </div>
        )
    }

    /**
     * 元素断言
     */
    const elementView = (data)=>{
        return(
            <div className={"display-flex-gap"}>
                <div style={{width:"100px"}}>
                    <Tag color="#2db7f5">元素断言</Tag>
                </div>

                <div>
                    <div className={"display-flex-gap"}>
                        <div style={{fontSize:"12px",color:"#aaa" }}>定位: </div>
                        <div>{data.location}</div>
                        <div style={{fontSize:"12px",color:"#aaa" }}>参数: </div>
                        <div>{data.locationValue}</div>
                    </div>

                    <div className={"display-flex-gap"}>
                        <div style={{fontSize:"12px",color:"#aaa" }}>元素类型: </div>
                        <div>{showElementType(data.elementType)}</div>

                        {
                            data.elementType===1
                                ? <>
                                    <div style={{fontSize:"12px",color:"#aaa" }}>期望值: </div>
                                    <div>{data.expect}</div>
                                </>
                                : null
                        }
                    </div>

                </div>
            </div>
        )
    }


    return(
        <div>
            {
                assertList&&assertList.map(item=>{
                    return(
                        <div className={"assert-item"}>
                            <div className={"display-flex-between"}>
                                {
                                    item.type==="variable"
                                        ?variableView(item.variableAssert)
                                        :elementView( item.elementAssert)
                                }

                                <Space>
                                    <IconCommon
                                        className={"icon-s edit-icon"}
                                        icon={"bianji11"}
                                        onClick={()=> updateAssert(item.id)}
                                    />
                                    <IconCommon
                                        className={"icon-s edit-icon"}
                                        icon={"shanchu3"}
                                        onClick={()=> deleteAssert(item.id)}
                                    />
                                </Space>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default observer(AssertList);