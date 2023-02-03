import React, {useEffect, useState} from "react";
import {Breadcrumb, Button, Space, Tabs} from "antd";
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
        props.history.push("/repository/api-perform-instance")
    }

    //返回列表
    const goBack = () =>{
        props.history.push("/repository/testcase")
    }

    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>用例列表</Breadcrumb.Item>
                <Breadcrumb.Item>性能详情</Breadcrumb.Item>
            </Breadcrumb>

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