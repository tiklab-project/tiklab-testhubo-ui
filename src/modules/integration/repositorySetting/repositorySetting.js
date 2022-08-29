import React from "react";
import {renderRoutes} from "react-router-config";
import "./repositorySetting.scss"
import SideMenu from "../../common/sideMenu";

const RepositorySetting = (props) =>{
    const routes = props.route.routes;

    const items=[
        {
            title: '环境管理',
            icon: 'icon-modular',
            key: '/repositorypage/envMana',
        },
        {
            title: 'Agent配置',
            key: '/repositorypage/setting/agent',
            icon: 'icon-modular',
        },{
            title: '项目成员',
            key: '/repositorypage/setting/role',
            icon: 'icon-chengyuan',
        },{
            title: '项目权限',
            key: '/repositorypage/setting/repositoryPrivilege',
            icon: 'icon-quanxian',
        }
    ]



    return(
        <div className={"repository-setting-box"}>
            {/*<SideMenu*/}
            {/*    item={items}*/}
            {/*    selectedKey={"/repositorypage/setting/agent"}*/}
            {/*    {...props}*/}
            {/*/>*/}

            <div className={"repository-setting-right"}>
                {
                    renderRoutes(routes)
                }
            </div>

        </div>
    )
}


export default RepositorySetting;