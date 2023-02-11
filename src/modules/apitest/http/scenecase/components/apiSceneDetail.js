import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import ApiSceneStepList from "./apiSceneStepList";
import ApiSceneTestResult from "./apiSceneTestResult";
import DetailCommon from "../../../../common/detailCommon";
import {Breadcrumb, Space} from "antd";
import ApiEnvSelect from "../../../../sysmgr/environment/components/apiEnvSelect";

const ApiSceneDetail = (props) => {
    const {apiSceneStore} = props;
    const {findApiScene,updateApiScene} = apiSceneStore;

    const [detailInfo,setDetailInfo]=useState();
    const apiSceneId = sessionStorage.getItem('apiSceneId');
    useEffect(()=>{
        findApiScene(apiSceneId).then(res=>{
            setDetailInfo(res);
        })
    },[apiSceneId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateApiScene(param)
    }

    const toHistory = () =>{
        props.history.push("/repository/api-scene-instance")
    }

    const goBack = () =>{
        props.history.push("/repository/testcase")
    }


    return(
        <div className={"content-box-center"}>
            <div style={{"display":"flex","justifyContent":"space-between","margin":"5px  0 0 0"}}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item onClick={goBack} className={"first-item"}>用例列表</Breadcrumb.Item>
                    <Breadcrumb.Item>场景详情</Breadcrumb.Item>
                </Breadcrumb>

                <ApiEnvSelect {...props}/>
            </div>

            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
                toHistory={toHistory}
                test={<ApiSceneTestResult/>}
            />
            <ApiSceneStepList {...props}/>
        </div>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneDetail));
