import React from "react";
import { Tabs} from "antd";
import {inject, observer} from "mobx-react";
import AppPerfStepList from "./appPerfStepList";
import AppPerformCofig from "./appPerformCofig";

const AppPerformDetailCommon = (props) =>{
    const {type} = props;

    //tab切换项
    const tabItems = [
        { label: '场景配置', key: '1', children: <AppPerfStepList type={type} {...props}/> }, // 务必填写 key
        { label: '压力配置', key: '2', children: <AppPerformCofig {...props} /> },
    ];

    return(
        <Tabs defaultActiveKey="1"  items={tabItems}/>
    )
}
export default inject("appPerfStore")(observer(AppPerformDetailCommon));