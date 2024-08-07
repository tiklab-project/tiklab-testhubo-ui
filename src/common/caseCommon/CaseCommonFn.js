import React from "react";
import {Tag} from "antd";
import {ApiOutlined, AppstoreOutlined, LaptopOutlined, TabletOutlined} from "@ant-design/icons";
import IconCommon from "../IconCommon";


/**
 * 表格中测试类型展示
 */
export const showTestTypeView = (type)=>{
    switch (type) {
        case "api":
            return "接口"
        case "ui":
            return "UI"
        case "perform":
            return "性能"
        case "function":
            return "功能"
    }
}

/**
 * 用例状态
 */
export const showStatus = (status)=>{
    switch (status) {
        case 0:
            return <Tag color="#bfc4c6">未开始</Tag>;
        case 1:
            return <Tag color="#76b6f1">进行中</Tag>;
        case 2:
            return <Tag color="#f29e9ee8">结束</Tag>;
        default:
            return <Tag color="#bfc4c6">未开始</Tag>;
    }
}

export const showTextStatus = (status,size)=>{
    switch (status) {
        case 0:
            return <div style={{
                textAlign:"center",
                background:"#f8f8f8",
                fontSize:`${size||"12px"}`,
                padding:"2px 5px",
                borderRadius:"5px",
                width: "55px",
                border: "1px solid #e4e7ee"
            }}>未开始</div>
        case 1:
            return <div style={{
                textAlign:"center",
                background:"#d6eaff",
                fontSize:`${size||"12px"}`,
                padding:"2px  5px",
                borderRadius:"5px",
                width: "55px",
                border: "1px solid #e4e7ee"
            }}>进行中</div>
        case 2:
            return <div style={{
                textAlign:"center",
                background:"#ffdfdf",
                fontSize:`${size||"12px"}`,
                padding:"2px 5px",
                borderRadius:"5px",
                width: "55px",
                border: "1px solid #e4e7ee"
            }}>结束</div>
        default:
            return <div style={{
                textAlign:"center",
                background:"#f8f8f8",
                fontSize:`${size||"12px"}`,
                padding:"2px  5px",
                borderRadius:"5px",
                width: "55px",
                border: "1px solid #e4e7ee"
            }}>未开始</div>
    }
}



/**
 * 表格中用例类型展示
 */
export const showCaseTypeView = (type) => {
    let iconComponent;

    switch (type) {
        case "api-unit":
        case "api-scene":
        case "api-perform":
            iconComponent = <IconCommon icon={"api1"} className="icon-m" />;
            break;

        case "web-scene":
            iconComponent = <IconCommon icon={"diannao1"} className="icon-m" />;
            break;

        case "app-scene":
            iconComponent = <IconCommon icon={"shouji1"} className="icon-m" />;
            break;

        default:
            iconComponent = <IconCommon icon={"gongneng1"} className="icon-m" />;
            break;
    }

    return (
         <div style={{
            borderRadius: "5px",
            width: "20px",
            height: "20px",
            overflow: "hidden"
        }}>
            {iconComponent}
        </div>
    );
};

/**
 * 左列表右详情中用例类型展示
 */
export const showCaseTypeIconInList = (type)=>{
    switch (type) {
        case "api-unit":
        case "api-scene":
        case "api-perform":
            return  <ApiOutlined />

        case "web-scene":
        case "web-perform":
            return <LaptopOutlined />

        case "app-scene":
        case "app-perform":
            return <TabletOutlined />
        default :
            return <AppstoreOutlined />
    }
}

/**
 * 用例详情中面包屑中的类型展示
 */
export const showCaseTypeInList = (type)=>{
    switch (type) {
        case "api-unit":
            return <Tag color="green">接口单元</Tag>
        case "api-scene":
            return <Tag color="blue">接口场景</Tag>
        case "api-perform":
            return <Tag color="orange">接口性能</Tag>

        case "web-scene":
            return <Tag color="blue">WEB场景</Tag>
        case "web-perform":
            return <Tag color="orange">WEB性能</Tag>

        case "app-scene":
            return <Tag color="blue">APP场景</Tag>
        case "app-perform":
            return <Tag color="orange">APP性能</Tag>
        case "function":
            return <Tag color="#2db7f5">功能用例</Tag>
        default :
            return ;
    }
}

/**
 * 用例列表中用例类型展示
 */
export const showCaseTypeTable = (type)=>{
    switch (type) {
        case "api-unit":
            return "接口单元"
        case "api-scene":
            return "接口场景"
        case "api-perform":
            return "接口性能"

        case "web-scene":
            return "WEB场景"
        case "web-perform":
            return "WEB性能"

        case "app-scene":
            return "APP场景"
        case "app-perform":
            return "APP性能"
        case "function":
            return "功能用例"
    }
}
