import React,{useEffect,useState} from 'react';
import { inject,observer } from 'mobx-react';
import { useParams} from "react-router";
import {Breadcrumb} from "antd";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import IconCommon from "../../../../../common/IconCommon";
import ApiPerformDetail from "./apiPerformDetail";

const ApiPerfContent = (props) => {
    const {apiPerfStore} = props;
    const {caseName} = apiPerfStore;

    let {id} = useParams()
    const apiPerfId = sessionStorage.getItem('apiPerfId') || id;

    useEffect(()=>{
        //获取路由id存入
        sessionStorage.setItem('apiPerfId',id);

    },[apiPerfId])


    return(
        <>
            <div className={"breadcrumb-title_between"}>
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
            <ApiPerformDetail/>
        </>
    )
}

export default inject('apiPerfStore')(observer(ApiPerfContent));
