import React from "react";
import {Logout} from "tiklab-eam-ui"
import {inject, observer} from "mobx-react";

/**
 * 包一下平台退出页
 */
const  LoginOut = (props) => {

    return (
        <Logout {...props}/>
    );
};

export default inject("eamStore")(observer(LoginOut));