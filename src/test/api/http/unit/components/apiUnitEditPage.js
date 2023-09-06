import React, {useEffect} from 'react';
import '../../../../testcase/components/unitcase.scss'
import ApiUnitEditPageCommon from "./apiUnitEditPageCommon";
import {useParams} from "react-router";
import {inject, observer} from "mobx-react";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import {Breadcrumb} from "antd";
import IconCommon from "../../../../../common/IconCommon";
const ApiUnitEditPage = (props) => {

    let {id} = useParams()
    const apiUnitId = sessionStorage.getItem('apiUnitId') || id;

    useEffect(async ()=>{
        //获取路由id存入
        sessionStorage.setItem('apiUnitId',id);
    },[apiUnitId])

    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <IconCommon
                        icon={"jiekou1"}
                        className="icon-s "
                        style={{margin: "3px 5px 0"}}
                    />
                    <Breadcrumb.Item>详情</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>

            <ApiUnitEditPageCommon type={true} {...props} />
        </div>
    )
}

export default inject("testcaseStore")(observer(ApiUnitEditPage));
