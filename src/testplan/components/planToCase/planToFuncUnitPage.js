import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import FunctionDetail from "../../../test/function/components/FunctionDetail";

const PlanToFuncUnitPage = (props) =>{


    return(
        <>
            <FunctionDetail />

        </>
    )
}

export default inject("funcUnitStore","testPlanStore")(observer(PlanToFuncUnitPage));