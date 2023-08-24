import React from "react";
import {Breadcrumb} from "antd";
import ApiPerfInstanceTable from "./apiPerfInstanceTable";

const ApiPerfInstanceList = (props) =>{

    const apiPerfId = sessionStorage.getItem("apiPerfId")

    const toTestCase = () =>{
        props.history.push("/repository/testcase")
    }

    const goBack = () =>{
        props.history.push(`/repository/testcase/api-perform/${apiPerfId}`)
    }

    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={toTestCase} className={"first-item"}>测试用例</Breadcrumb.Item>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>性能详情</Breadcrumb.Item>
                <Breadcrumb.Item>性能历史</Breadcrumb.Item>
            </Breadcrumb>
            <ApiPerfInstanceTable apiPerfId={apiPerfId}/>
        </div>
    )
}

export default ApiPerfInstanceList;