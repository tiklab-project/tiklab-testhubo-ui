import React from "react";
import {Breadcrumb} from "antd";
import TestPlanBindCaseInstanceTable from "./testPlanBindCaseInstanceTable";

const TestPlanBindCaseInstanceList = (props) =>{


    const goToPlanInstance = () =>{
        props.history.push("/repository/plan-instance")
    }

    const goToPlanDetail = () =>{
        props.history.push("/repository/plan/detail")
    }

    return(
        <div className={"content-box-center"}>
            <Breadcrumb
                className={"breadcrumb-box header-bread"}

            >
                <Breadcrumb.Item onClick={goToPlanDetail} className={"first-item"}>详情</Breadcrumb.Item>
                <Breadcrumb.Item onClick={goToPlanInstance} className={"first-item"}>历史</Breadcrumb.Item>
                <Breadcrumb.Item>用例历史</Breadcrumb.Item>
            </Breadcrumb>
            <TestPlanBindCaseInstanceTable />
        </div>
    )
}

export default TestPlanBindCaseInstanceList;