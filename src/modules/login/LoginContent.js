/*
 * @Description:
 * @Author: sunxiancheng
 * @LastEditTime: 2021-06-01 10:37:36
 */
import React from 'react';
import { Login } from 'tiklab-eam-ui'

import {inject, observer} from 'mobx-react'
// 登录
const LoginContent = (props)=> {


    return(
        <Login
            {...props}

        />
    )
}

export default LoginContent;
