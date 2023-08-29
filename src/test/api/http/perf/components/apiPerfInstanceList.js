import React from "react";
import {Breadcrumb} from "antd";
import ApiPerfInstanceTable from "./apiPerfInstanceTable";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";

const ApiPerfInstanceList = (props) =>{

    const apiPerfId = sessionStorage.getItem("apiPerfId")


    const goBack = () =>{
        props.history.push(`/repository/testcase/api-perform/${apiPerfId}`)
    }

    return(
        <div className={"content-box-center"}>
            <div className={"breadcrumb-title_between"}>
                <Breadcrumb className={"breadcrumb-box"}>
                    <Breadcrumb.Item onClick={goBack} className={"first-item"}>用例详情</Breadcrumb.Item>
                    <Breadcrumb.Item >测试历史</Breadcrumb.Item>
                </Breadcrumb>
                <DrawerCloseIcon />
            </div>
            <ApiPerfInstanceTable apiPerfId={apiPerfId}/>
        </div>
    )
}

export default ApiPerfInstanceList;