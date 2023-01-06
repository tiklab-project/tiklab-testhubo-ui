import React, {useEffect, useState} from "react";
import {Tabs} from "antd";
import {inject, observer} from "mobx-react";
import ApiPerfStepList from "./apiPerfStepList";
import ApiPerformConfig from "./apiPerfConfig";
import DetailCommon from "../../../../common/detailCommon";


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


    const changeTab = (actvieKey) =>{

    }



    return(
        <div>
            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
            />

            <Tabs defaultActiveKey="1" onChange={changeTab}>
                <TabPane tab="场景配置" key="1">
                    <ApiPerfStepList />
                </TabPane>
                <TabPane tab="压力配置" key="2">
                    <ApiPerformConfig />
                </TabPane>
            </Tabs>
        </div>
    )
}

export default inject("apiPerfStore")(observer(ApiPerformDetail));