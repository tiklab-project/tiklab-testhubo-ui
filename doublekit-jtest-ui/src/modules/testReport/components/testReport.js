/**
 * @description：
 * @date: 2021-08-23 17:00
 */
import React, { Fragment } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb} from 'antd';
import ReportTable from "../common/reportTable";


const TestReport = (props) => {


    return(
        <Fragment>
            <div className='breadcrumb'>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item>仓库</Breadcrumb.Item>
                    <Breadcrumb.Item>测试报告</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <ReportTable/>
        </Fragment>
    )
}

export default inject('testInstanceStore')(observer(TestReport));
