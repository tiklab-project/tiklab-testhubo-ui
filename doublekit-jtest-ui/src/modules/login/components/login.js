/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:37:36
 */
import React,{ Component } from 'react';
import contentImg from '../../../assets/img/contentimg.jpg';
import { ProjectLogin, LOGIN_STATUS } from 'doublekit-frame-ui'

import {inject, observer} from 'mobx-react'
// 登录
const Login = (props)=> {

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
            url: 'http://192.168.2.6:8000/'
        }
    ]

    return(
        <ProjectLogin
            {...props}
            title={'测试管理'}
            contentImg={contentImg}
            loginGoRouter={'/'}
            // fetchMethod={fetchMethod}
            // languageUrl={pluginAddressUrl}
            pickerData={pickerData}
        />
    )
}

export default inject(LOGIN_STATUS)(observer(Login)) ;
