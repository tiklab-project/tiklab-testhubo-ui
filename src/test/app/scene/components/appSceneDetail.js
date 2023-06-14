/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppSceneStepList from "./appSceneStepList";
import AppExecuteTestDrawer from "./appExecuteTestDrawer";
import DetailCommon from "../../../../common/DetailCommon";
import {Breadcrumb} from "antd";
import "./appStyle.scss"
import ConnectionCommon from "../../../common/connenctionCommon/ConnectionCommon";
import WorkItemSelect from "../../../../integrated/teamwire/workItem/components/WorkItemSelect";
import {useParams} from "react-router";

const AppSceneDetail = (props) => {
    const {appSceneStore,workItemStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;
    const {findWorkItem,getDemandInfo,demandInfo} =workItemStore

    const [detailInfo,setDetailInfo]=useState();
    const [workItemId, setWorkItemId] = useState();

    let {id} = useParams()
    const appSceneId = sessionStorage.getItem('appSceneId') || id

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('appSceneId',id);

        findAppScene(appSceneId).then(res=>{
            setDetailInfo(res);
            setWorkItemId(res?.testCase?.workItemId)
        })
    },[appSceneId])

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
        updateAppScene(param).then(()=>{
            findAppScene(appSceneId).then(res=>{
                setDetailInfo(res);
            })
        })
    }


    const toHistory = () =>{
        props.history.push("/repository/app-scene-instance")
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
                    <AppExecuteTestDrawer
                        appSceneId={appSceneId}
                        appSceneStore={appSceneStore}
                    />
                }
            />
            <AppSceneStepList />

            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>关联</div>
                </div>
            </div>

            <ConnectionCommon
                workItemInfo={demandInfo}
                caseId={appSceneId}
                workItemSelect={
                    <WorkItemSelect
                        caseInfo={detailInfo}
                        updateCase={updateAppScene}

                    />
                }
            />

        </div>

    )
}

export default inject('appSceneStore',"workItemStore")(observer(AppSceneDetail));
