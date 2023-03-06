import React from "react";
import {Tag} from "antd";
import IconCommon from "../IconCommon";
import {ApiOutlined, LaptopOutlined, TabletOutlined} from "@ant-design/icons";


/**
 * 表格中测试类型展示
 */
export const showTestTypeView = (type)=>{
    switch (type) {
        case "auto":
            return "自动化"
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

