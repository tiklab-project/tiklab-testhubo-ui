import React, {useEffect, useState} from "react";
import {Breadcrumb} from "antd";
import {inject, observer} from "mobx-react";
import ApiPerformDetail from "../../../test/api/http/perf/components/apiPerformDetail";

const PlanToApiPerformPage = (props) =>{


    return(
        <ApiPerformDetail/>
    )
}

export default inject("apiPerfStore","testPlanStore")(observer(PlanToApiPerformPage));