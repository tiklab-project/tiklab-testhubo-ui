import React from 'react';
import { renderRoutes } from "react-router-config";
import './repositoryDetail.scss';
import MenuAside from "./menuAside";
import RepositoryName from "./repositoryName";

const RepositoryDetail = (props) => {

    const route = props.route.routes;

    const routers = [
        {
            title: '概况',
            icon: 'icon-modular',
            key: `/repositorypage`
        },
        {
            title: '测试计划',
            icon: 'icon-modular',
            key: `/repositorypage/testplan`
        },
        {
            title: `测试用例`,
            icon: 'icon-modular',
            key: `/repositorypage/Testcase`
        },
        {
            title: `定时任务`,
            icon: 'icon-modular',
            key: `/repositorypage/quartzMaster`
        },
        {
            title: `性能测试`,
            icon: 'icon-modular',
            key: `/repositorypage/performance`
        },
        {
            title: `测试报告`,
            icon: 'icon-modular',
            key: `/repositorypage/testReport`
        },
        {
            title: '模块管理',
            icon: 'icon-modular',
            key: `/repositorypage/category`
        },
    ];

    return(
        <div className='tccontant'>
            <div className='tc-side'>
                <RepositoryName {...props}/>
                <MenuAside data={routers} {...props}/>
            </div>
            <div className='tccontant-contant'>
                <div className='contant-box'>
                    {renderRoutes(route)}
                </div>
            </div>
        </div>
    )
}


export default RepositoryDetail;
