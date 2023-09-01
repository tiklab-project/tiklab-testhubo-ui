
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebSceneStepList from "./webSceneStepList";
import WebExecuteTestDrawer from "./webExecuteTestDrawer";
import DetailCommon from "../../../../common/DetailCommon";
import "./webStyle.scss"
import {useHistory, useParams} from "react-router";
import {Breadcrumb, Button} from "antd";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";

const WebSceneDetail = (props) => {
    const {webSceneStore} = props;
    const {findWebScene,updateWebScene} = webSceneStore;
    const [detailInfo,setDetailInfo]=useState();

    let history = useHistory()
    let {id} = useParams()
    const webSceneId = sessionStorage.getItem('webSceneId') || id;
    let curPage = localStorage.getItem("TOGGLE_TABLE_RO_LIST_PAGE")

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('webSceneId',id);

        findWebScene(webSceneId).then(res=>{
            setDetailInfo(res);

        })
    },[webSceneId])


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
        history.push("/repository/testcase/web-scene-instance")
    }

    const testShow = () =>{
        if(curPage==="table"){
           return <Button className={"important-btn"} onClick={toExePage}>
               测试
           </Button>
        }else {
            return  <WebExecuteTestDrawer
                webSceneId={webSceneId}
                webSceneStore={webSceneStore}
            />
        }
    }

    const toExePage = () =>{
        history.push("/repository/testcase/web-scene-execute")
    }

    return(
        <div className={"content-box-center"} >
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
                test={
                    <>{testShow()}</>
                }
            />
            <WebSceneStepList />

        </div>

    )
}

export default inject('webSceneStore',"workItemStore")(observer(WebSceneDetail));
