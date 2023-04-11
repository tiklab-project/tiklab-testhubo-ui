
import React from 'react';
import { Login } from 'tiklab-eam-ui'


/**
 * 登录页
 */
const LoginContent = (props)=> {


    return(
        <Login
            {...props}
            title={"Postin"}
            loginGoRouter="/"
            vaildUserAuthRouter={"/no-auth"}
        />
    )
}

export default LoginContent;
