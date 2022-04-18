import React from 'react';
import { renderRoutes } from "react-router-config";
import './repository.scss';
import MenuAside from '../../common/menuAside';

const Repository = (props)=> {

    const router = props.route.routes;

    //项目列表左侧导航列表
    const routers = [
        {
            title: '所有用例库',
            icon: 'icon-modular',
            key: `/repository/alllist`
        },
        {
            title: `最近浏览`,
            icon: 'icon-modular',
            key: `/repository/recently`
        },
        {
            title: '创建的用例库',
            icon: 'icon-modular',
            key: `/repository/create`
        },
        {
            title: '参与的用例库',
            icon: 'icon-modular',
            key: `/repository/partake`
        },
        {
            title: '关注的用例库',
            icon: 'icon-modular',
            key: `/repository/follow`
        }
    ];

    return(
        <div className='tc-contant'>
            <div className='tc-side'>
                <MenuAside data={routers} {...props}/>
            </div>
            <div className='tccontant-contant'>
                <div className='contant-box'>
                    {renderRoutes(router)}
                </div>
            </div>

        </div>
    )


}


export default Repository;
