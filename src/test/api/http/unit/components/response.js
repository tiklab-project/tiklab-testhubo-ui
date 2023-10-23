import React from 'react';
import { observer } from 'mobx-react';
import ResponseHeader from "./responseHeader";
import { Tabs } from 'antd';
import ResponseResult from "./ResponseResult";
const { TabPane } = Tabs;

// 输出参数 返回头部与返回结果的切换
const Response = (props) =>{

    return(
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="返回头部" key="1">
                    <div className={"tabPane-item-box"}>
                        <ResponseHeader  {...props}/>
                    </div>
                </TabPane>
                <TabPane tab="返回结果" key="2">
                    <ResponseResult />
                </TabPane>
            </Tabs>
        </>
    )

}

export default observer(Response);
