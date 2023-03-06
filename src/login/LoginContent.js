
import React from 'react';
import { Login } from 'tiklab-eam-ui'

import {inject, observer} from 'mobx-react'

/**
 * 登录页
 */
const LoginContent = (props)=> {


    return(
        <Login
            {...props}

        />
    )
}

export default LoginContent;
