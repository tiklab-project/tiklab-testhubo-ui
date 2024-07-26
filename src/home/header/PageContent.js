import React, {useEffect} from "react";
import HeaderContent from "./HeaderContent";
import {renderRoutes} from "react-router-config";
import {inject, observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import { SYSTEM_ROLE_STORE } from 'thoughtware-privilege-ui/es/store';
import './portalStyle.scss'
import LeftNavCommon from "../../common/leftMenu/LeftNavCommon";
import {useHistory} from "react-router";

/**
 * 整个页面
 */
 const  PageContent =(props)=> {

     const router = props.route.routes;
     const user = getUser();
     const history = useHistory()


    useEffect(()=>{
        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/home")
    },[])

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

    const menuData = [
        {
            name:"主页",
            icon: "home",
            key:"home",
            router:"/home"
        },
        {
            name: "项目",
            icon: "xiangmu1",
            key: "project",
            router:"/project"
        },
    ]


    const clickAddRouter = (item) => {
        props.history.push(item.router)

        //点击左侧导航，设置选择项,用于刷新后还能选择。
        localStorage.setItem("leftRouter",item.router);
    };

    const clickSetting =  () => {
        props.history.push("/setting/version")
        localStorage.setItem("leftRouter","/setting/version");
    }

    const showMainMenu = ()=>{
        let pathname =  history.location.pathname;
        if(pathname.startsWith("/home")||pathname.startsWith("/project")){
            return<div className={"ws-detail-left"} style={{padding:"10px 0"}}>
                <LeftNavCommon
                    menuData={menuData}
                    clickAddRouter={clickAddRouter}
                    clickSetting={clickSetting}
                />
            </div>
        }
    }

    return(
        <div style={{height:"100%"}}>
            <HeaderContent
                logout={Logout}
                {...props}
            />
            <div className={"ws-detail-main-content"} >
                {showMainMenu()}
                <div style={{height:"100%",flex: 1}}>
                    {
                        renderRoutes(router)
                    }
                </div>
            </div>
        </div>
    )
}

export default inject(SYSTEM_ROLE_STORE)(observer(PageContent))