import React, {useEffect, useState} from "react";
import { Tabs} from "antd";
import {inject, observer} from "mobx-react";
import WebPerfStepList from "./webPerfStepList";
import WebPerformConfig from "./webPerfConfig";
import DetailCommon from "../../../common/detailCommon";
import WebPerformTestDrawer from "./webPerformTestDrawer";
const { TabPane } = Tabs;

const WebPerformDetail = (props) =>{
    const {webPerfStore} = props;
    const {findWebPerf,updateWebPerf} = webPerfStore;


    const [detailInfo,setDetailInfo]=useState();

    let webPerfId = sessionStorage.getItem("webPerfId")

    useEffect(()=>{
        findWebPerf(webPerfId).then(res=>{
            setDetailInfo(res);
        })
    },[webPerfId])
    
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateWebPerf(param)
    }

    //去往历史页
    const toHistory = () =>{
        props.history.push("/repositorypage/testcase/web-perform-instance")
    }

    return(
        <div className={"content-box-center"}>
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
                toHistory={toHistory}
                test={<WebPerformTestDrawer />}
            />
            <Tabs defaultActiveKey="1" >
                <TabPane tab="场景配置" key="1">
                    <WebPerfStepList />
                </TabPane>
                <TabPane tab="压力配置" key="2">
                    <WebPerformConfig {...props} />
                </TabPane>
            </Tabs>
        </div>
    )
}
export default inject("webPerfStore")(observer(WebPerformDetail));