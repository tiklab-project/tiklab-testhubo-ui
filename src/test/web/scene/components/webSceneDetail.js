
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebSceneStepList from "./webSceneStepList";
import WebExecuteTestDrawer from "./webExecuteTestDrawer";
import DetailCommon from "../../../../common/DetailCommon";
import "./webStyle.scss"
import {Breadcrumb} from "antd";
import ConnectionCommon from "../../../common/connenctionCommon/ConnectionCommon";
import WorkItemSelect from "../../../../integrated/teamwire/workItem/components/WorkItemSelect";
import {useParams} from "react-router";

const WebSceneDetail = (props) => {
    const {webSceneStore,workItemStore} = props;
    const {findWebScene,updateWebScene} = webSceneStore;
    const {findWorkItem,getDemandInfo,demandInfo} =workItemStore

    const [detailInfo,setDetailInfo]=useState();
    const [workItemId, setWorkItemId] = useState();

    let {id} = useParams()
    const webSceneId = sessionStorage.getItem('webSceneId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('webSceneId',id);

        findWebScene(webSceneId).then(res=>{
            setDetailInfo(res);

            setWorkItemId(res?.testCase?.workItemId)
        })
    },[webSceneId])


    useEffect(()=>{
        if(workItemId){
            findWorkItem(workItemId).then(res=>{
                getDemandInfo(res)
            })
        }else {
            getDemandInfo(null)
        }
    },[workItemId])


    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateWebScene(param).then(()=>{
            findWebScene(webSceneId).then(res=>{
                setDetailInfo(res);
            })
        })
    }


    const toHistory = () =>{
        props.history.push("/repository/web-scene-instance")
    }

    const goBack = () =>{
        props.history.push("/repository/testcase")
    }

    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>测试用例</Breadcrumb.Item>
                <Breadcrumb.Item>{detailInfo?.testCase.name}</Breadcrumb.Item>
            </Breadcrumb>

            <DetailCommon
                type={true}
                detailInfo={detailInfo}
                updateTitle={updateTitle}
                toHistory={toHistory}
                test={
                    <WebExecuteTestDrawer
                        webSceneId={webSceneId}
                        webSceneStore={webSceneStore}
                    />
                }
            />
            <WebSceneStepList />

            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>关联</div>
                </div>
            </div>
            <ConnectionCommon
                workItemInfo={demandInfo}
                caseId={webSceneId}
                workItemSelect={
                    <WorkItemSelect
                        caseInfo={detailInfo}
                        updateCase={updateWebScene}
                    />
                }
            />

        </div>

    )
}

export default inject('webSceneStore',"workItemStore")(observer(WebSceneDetail));
