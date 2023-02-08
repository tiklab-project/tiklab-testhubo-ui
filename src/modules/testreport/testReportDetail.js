import React from "react";
import {Breadcrumb} from "antd";
import TestPlanBindCaseInstanceTable from "../testplan/components/testPlanBindCaseInstanceTable";

const TestReportDetail = (props) =>{

    const goToReport = () =>{
        props.history.push("/repository/report")
    }

    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goToReport} className={"first-item"}>测试报告</Breadcrumb.Item>
                <Breadcrumb.Item>报告详情</Breadcrumb.Item>
            </Breadcrumb>
            <TestPlanBindCaseInstanceTable />
        </div>
    )
}

export default TestReportDetail;