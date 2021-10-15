/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-05-27 14:00:23
 */
import React,{ Component } from 'react';
import { renderRoutes } from "react-router-config";
import { Portal, LOGIN_STATUS } from 'doublekit-framework-ui';
import {inject, observer} from 'mobx-react'
// import { Search } from '../../modules/index';
import './portalStyle.scss'
const homeRouter = [
    {
        to:'/',
        title:'主页',
        key: 'home'
    },
    {
        to:'/repository/alllist',
        title:'仓库',
        key: 'repository'
    },
    {
        to:'/systemManagement/organ/org',
        title:'系统管理',
        key: 'systemManagement'
    }
]


const pickerData = [
    {
        value: 'project',
        label: 'Project系统',
        url: 'http://192.168.2.10:3001/'
    },
    {
        value: 'apibox',
        label: 'Apibox系统',
        url: 'http://192.168.2.8:3001/'
    },
    {
        value: 'protal',
        label: 'protal系统',
        url: 'http://192.168.2.6:8090/'
    }
]

class Poroute extends Component {
    render() {
        const router = this.props.route.routes;
        return(

            <Portal
                {...this.props}
                routers={homeRouter}
                fetchMethod = {fetchMethod}
                languageUrl={pluginAddressUrl}
                redirect={'/login'}
                userMessageLink = {'/MessageUser'}
                // searchComponent = {<Search  {...this.props}/>}
                pickerData={pickerData}

            >
                {renderRoutes(router)}
            </Portal>
        )
    }
}

export default inject(LOGIN_STATUS)(observer(Poroute))
