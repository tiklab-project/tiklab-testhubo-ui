import React, {useEffect, useState} from "react";
import {Button, Space, Tabs} from "antd";
import {inject, observer} from "mobx-react";
import ApiPerfStepList from "./apiPerfStepList";
import ApiPerformConfig from "./apiPerfConfig";
import DetailCommon from "../../../../common/detailCommon";
import ApiPerformTest from "./apiPerformTestDrawer";

const { TabPane } = Tabs;

const ApiPerformDetail = (props) =>{
    const {apiPerfStore} = props;
    const {findApiPerf,updateApiPerf} = apiPerfStore;

    const [detailInfo,setDetailInfo]=useState();

    const apiPerfId = sessionStorage.getItem("apiPerfId");


    useEffect(()=>{
        findApiPerf(apiPerfId).then(res=>{
            setDetailInfo(res);
        })
    },[apiPerfId])

    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateApiPerf(param)
    }


    //去往历史页
    const toHistory = () =>{
        props.history.push("/repositorypage/testcase/api-perform-instance")
    }

    return(
        <div className={"content-box-center"}>
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
                toHistory={toHistory}
                test={<ApiPerformTest />}
            />

            <Tabs defaultActiveKey="1" >
                <TabPane tab="场景配置" key="1">
                    <ApiPerfStepList />
                </TabPane>
                <TabPane tab="压力配置" key="2">
                    <ApiPerformConfig {...props}/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default inject("apiPerfStore")(observer(ApiPerformDetail));