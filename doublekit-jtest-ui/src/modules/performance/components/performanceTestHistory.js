/**
 * @description：
 * @date: 2021-08-24 16:01
 */
import React from 'react';
import {inject, observer} from "mobx-react";
import TableResult from "../common/tableResult";

const PerformanceTestHistory = (props) => {


    return(
        <>
            <TableResult
                // dateSource={}
            />
        </>
    )
}

export default inject()(observer(PerformanceTestHistory));
