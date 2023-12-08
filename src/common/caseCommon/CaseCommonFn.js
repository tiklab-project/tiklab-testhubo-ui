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
        default :
            return "功能用例"
    }
}
