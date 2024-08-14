import React, {useEffect} from "react";
import {renderRoutes} from "react-router-config";
import {inject, observer} from "mobx-react";
import {getUser} from "thoughtware-core-ui";
import { SYSTEM_ROLE_STORE } from 'thoughtware-privilege-ui/es/store';
import './portalStyle.scss'
import {useHistory} from "react-router";
import LeftMenuCommon from "../../common/LeftMenuCommon/LeftMenuCommon";

/**
 * 整个页面
 */
 const  PageContent =(props)=> {

     const router = props.route.routes;
     const user = getUser();
     const history = useHistory()
    let pathname =  history.location.pathname;

    useEffect(()=>{
        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter","/index")
    },[])

     useEffect(() => {
         if (user.userId) {
             props.systemRoleStore.getSystemPermissions(user.userId,"teston")
         }
     }, [user])

    const menuData = [
        {
            name:"主页",
            icon: "home",
            key:"home",
            router:"/index"
        },
        {
            name: "项目",
            icon: "xiangmu1",
            key: "project",
            router:"/project"
        },
        {
            name: "设置",
            icon: "setting",
            key: "setting",
            router:"/setting/version"
        },
    ]


    const showMenu = ()=>{
        if(pathname==="/index"||pathname==="/project"||pathname==="/projectAdd"){
            return<LeftMenuCommon
                menuData={menuData}
                isFirst={true}
                {...props}
            />
        }
    }

    return(
        <div className={"main-content"} >
            {showMenu()}
            <div style={{height:"100%",flex: 1}}>
                {renderRoutes(router)}
            </div>
        </div>
    )
}

export default inject(SYSTEM_ROLE_STORE)(observer(PageContent))