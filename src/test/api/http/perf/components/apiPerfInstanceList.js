import React from "react";
import {Breadcrumb} from "antd";
import ApiPerfInstanceTable from "./apiPerfInstanceTable";
import {DrawerCloseIcon} from "../../../../common/BreadcrumbCommon";
import {ArrowLeftOutlined} from "@ant-design/icons";

const ApiPerfInstanceList = (props) =>{

    const apiPerfId = sessionStorage.getItem("apiPerfId")


    const goBack = () =>{
        props.history.push(`/repository/testcase/api-perform/${apiPerfId}`)
    }

    return(
        <div className={"content-box-center"}>
            <div
                className={"breadcrumb-title_between"}
                style={{height:"36px"}}
            >
                <ArrowLeftOutlined onClick={goBack} style={{cursor:"pointer"}}/>

                <DrawerCloseIcon />
            </div>
            <ApiPerfInstanceTable apiPerfId={apiPerfId}/>
        </div>
    )
}

export default ApiPerfInstanceList;