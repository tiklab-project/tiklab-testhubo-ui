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
 * 表格中用例类型展示
 */
export const showCaseTypeView = (type)=>{
    switch (type) {
        case "api-unit":
            return  <IconCommon
                icon={"jiekou1"}
                className="icon-l"
            />

        case "api-scene":
            return  <IconCommon
                icon={"jiekou1"}
                className="icon-l"
            />
        case "api-perform":
            return  <IconCommon
                icon={"jiekou1"}
                className="icon-l"
            />

        case "web-scene":
            return <IconCommon
                icon={"diannao"}
                className="icon-l"
            />
        case "web-perform":
            return <IconCommon
                icon={"diannao"}
                className="icon-l"
            />

        case "app-scene":
            return <IconCommon
                icon={"shouji"}
                className="icon-l"
            />
        case "app-perform":
            return <IconCommon
                icon={"shouji"}
                className="icon-l"
            />
        default :
            return <IconCommon
                icon={"gongneng"}
                className="icon-l"
            />
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
