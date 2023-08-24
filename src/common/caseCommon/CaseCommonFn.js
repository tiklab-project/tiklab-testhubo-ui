import React from "react";
import {Tag} from "antd";
import {ApiOutlined, AppstoreOutlined, LaptopOutlined, TabletOutlined} from "@ant-design/icons";


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
 * 表格中用例类型展示
 */
export const showCaseTypeView = (type)=>{
    switch (type) {
        case "api-unit":
            return  <Tag icon={ <ApiOutlined /> } > 接口用例</Tag>

        case "api-scene":
            return  <Tag icon={ <ApiOutlined /> } > 接口场景 </Tag>
        case "api-perform":
            return  <Tag icon={ <ApiOutlined /> } > 接口性能</Tag>

        case "web-scene":
            return <Tag icon={ <LaptopOutlined /> }> WEB用例 </Tag>
        case "web-perform":
            return <Tag icon={ <LaptopOutlined /> }> WEB性能 </Tag>

        case "app-scene":
            return <Tag icon={<TabletOutlined />} > APP用例 </Tag>
        case "app-perform":
            return <Tag icon={<TabletOutlined />} > APP性能 </Tag>
    }
}

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
 * 左列表右详情中用例类型展示
 */
export const showCaseTypeInList = (type)=>{
    switch (type) {
        case "api-unit":
            return <Tag color="green">单元</Tag>
        case "api-scene":
            return <Tag color="blue">场景</Tag>
        case "api-perform":
            return <Tag color="orange">性能</Tag>

        case "web-scene":
            return <Tag color="blue">场景</Tag>
        case "web-perform":
            return <Tag color="orange">性能</Tag>

        case "app-scene":
            return <Tag color="blue">场景</Tag>
        case "app-perform":
            return <Tag color="orange">性能</Tag>
        case "function":
            return <Tag color="blue">功能</Tag>
        default :
            return <Tag color="green">单元</Tag>
    }
}
