import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Breadcrumb, Input} from "antd";
import IconCommon from "../../../../common/IconCommon";
import { useParams} from "react-router";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";
import AppSceneDetail from "./appSceneDetail";

const AppSceneContent = (props) =>{
    const {appSceneStore} = props;
    const {caseName} = appSceneStore;

    let {id} = useParams()
    const appSceneId = sessionStorage.getItem('appSceneId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('appSceneId',id);

    },[appSceneId])



    return(
        <>
            <div className={"breadcrumb-title_between"} style={{border:"none"}}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <IconCommon
                        icon={"jiekou1"}
                        className="icon-s "
                        style={{margin: "3px 5px 0"}}
                    />
                    <Breadcrumb.Item>
                        <div className={"case-header_title"}>{caseName}</div>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
            <AppSceneDetail/>
        </>
    )
}

export default inject('appSceneStore')(observer(AppSceneContent));