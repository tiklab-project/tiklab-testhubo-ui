import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Breadcrumb, Input} from "antd";
import { useParams} from "react-router";
import ApiUnitEditPageCommon from "./apiUnitEditPageCommon";
import IconCommon from "../../../../../common/IconCommon";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";


const ApiUnitContent = (props) =>{
    const {apiUnitStore} = props;
    const {caseName} = apiUnitStore;


    let {id} = useParams()
    const apiUnitId = sessionStorage.getItem('apiUnitId') || id;

    useEffect(()=> {
        //获取路由id存入
        sessionStorage.setItem('apiUnitId',id);

    },[apiUnitId])


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
            <ApiUnitEditPageCommon/>
        </>
    )
}

export default inject('apiUnitStore')(observer(ApiUnitContent));