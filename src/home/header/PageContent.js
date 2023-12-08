import React, {useEffect} from "react";
import HeaderContent from "./HeaderContent";
import {renderRoutes} from "react-router-config";
import {inject, observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import { SYSTEM_ROLE_STORE } from 'thoughtware-privilege-ui/es/store';
import './portalStyle.scss'

/**
 * 整个页面
 */
 const  PageContent =(props)=> {

     const router = props.route.routes;

     const user = getUser();
     useEffect(() => {
         if (user.userId) {
             props.systemRoleStore.getSystemPermissions(user.userId,"teston")
         }
     }, [user])

    /**
     * 头部退出方法跳往退出页
     */
    const Logout = () => {
        props.history.push({
            pathname: '/logout',
            state:{
                preRoute: props.location.pathname
            }
        })
    }


    return(
        <div style={{height:"100%"}}>
            <HeaderContent
                logout={Logout}
                {...props}
            />
            {
                renderRoutes(router)
            }
        </div>

    )
}

export default inject(SYSTEM_ROLE_STORE)(observer(PageContent))