import React, {useEffect, useState} from "react";
import {Breadcrumb, Input, Tabs} from "antd";
import {DrawerCloseIcon} from "../../common/BreadcrumbCommon";
import FunctionDetail from "./FunctionDetail";
import {useParams} from "react-router";
import {inject, observer} from "mobx-react";
import IconCommon from "../../../common/IconCommon";
const FunctionContent = (props) =>{
    const {funcUnitStore} = props;
    const {findFuncUnit,caseName} = funcUnitStore;

    let {id} = useParams()
    const functionId = sessionStorage.getItem('functionId') || id;


    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('functionId',id);
    },[functionId])



    return(
        <>
            <div className={"breadcrumb-title_between"} style={{border:"none"}}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <IconCommon
                        icon={"gongneng"}
                        className="icon-s "
                        style={{margin: "3px 5px 0"}}
                    />
                    <Breadcrumb.Item>
                        <div className={"case-header_title"}>{caseName}</div>
                    </Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
            <FunctionDetail />

        </>


    )
}

export default inject('funcUnitStore')(observer(FunctionContent));