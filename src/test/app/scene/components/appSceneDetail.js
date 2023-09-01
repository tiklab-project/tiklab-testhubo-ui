/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppSceneStepList from "./appSceneStepList";
import AppExecuteTestDrawer from "./appExecuteTestDrawer";
import DetailCommon from "../../../../common/DetailCommon";
import "./appStyle.scss"
import {useHistory, useParams} from "react-router";
import {Breadcrumb, Button} from "antd";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";
import WebExecuteTestDrawer from "../../../web/scene/components/webExecuteTestDrawer";

const AppSceneDetail = (props) => {
    const {appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;

    const [detailInfo,setDetailInfo]=useState();
    const history = useHistory();
    let {id} = useParams()
    const appSceneId = sessionStorage.getItem('appSceneId') || id
    let curPage = localStorage.getItem("TOGGLE_TABLE_RO_LIST_PAGE")

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('appSceneId',id);

        findAppScene(appSceneId).then(res=>{
            setDetailInfo(res);
        })
    },[appSceneId])


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
        history.push("/repository/testcase/app-scene-instance")
    }

    const testShow = () =>{
        if(curPage==="table"){
            return <Button className={"important-btn"} onClick={toExePage}>
                测试
            </Button>
        }else {
            return <AppExecuteTestDrawer
                appSceneId={appSceneId}
                appSceneStore={appSceneStore}
            />
        }
    }

    const toExePage = () =>{
        history.push("/repository/testcase/app-scene-execute")
    }


    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item>用例详情</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
            <DetailCommon
                type={true}
                detailInfo={detailInfo}
                updateTitle={updateTitle}
                toHistory={toHistory}
                test={<>{testShow()}</>}
            />
            <AppSceneStepList />
        </div>
    )
}

export default inject('appSceneStore',"workItemStore")(observer(AppSceneDetail));
