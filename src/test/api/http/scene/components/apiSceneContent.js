import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import {useHistory, useParams} from "react-router";
import {Breadcrumb, Input} from "antd";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import IconCommon from "../../../../../common/IconCommon";
import ApiSceneDetail from "./ApiSceneDetail";

const ApiSceneContent = (props) => {
    const {apiSceneStore} = props;
    const {caseName} = apiSceneStore;


    let {id} = useParams()
    const apiSceneId = sessionStorage.getItem('apiSceneId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiSceneId',id);

    },[apiSceneId])



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
            <ApiSceneDetail/>
        </>
    )


}

export default inject('apiSceneStore')(observer(ApiSceneContent));
