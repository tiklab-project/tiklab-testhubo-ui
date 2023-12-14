
import React from 'react';
import { Login } from 'thoughtware-eam-ui'


/**
 * 登录页
 */
const LoginContent = (props)=> {


    return(
        <Login
            {...props}
            title={"teston"}
            loginGoRouter="/"
            vaildUserAuthRouter={"/no-auth"}
        />
    )
}

export default LoginContent;
