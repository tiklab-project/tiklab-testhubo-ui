import React, {useState} from "react";
import {renderRoutes} from "react-router-config";
import "./repositorySetting.scss"
import {ProjectNav} from "tiklab-privilege-ui"
import {useLocation} from "react-router";
/**
 * 项目设置页中的左侧导航
 */
const RepositorySettingMenu = (props) =>{
    const routes = props.route.routes;

    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname);

    let repositoryId = sessionStorage.getItem("repositoryId");

    /**
     * 点击左侧菜单，设置路由地址
     * @param {*} key
     */
    const selectKeyFun = (key)=>{
        setSelected(key)
        props.history.push(key);
    }


    const items=[
        {
            title: '项目信息',
            id: `/project/${repositoryId}/setting/info`,
            // icon: 'icon-setting',
        }, {
            title: '模块',
            // icon: 'icon-modular',
            id: `/project/${repositoryId}/setting/category`,
        },
        {
            title: '环境',
            // icon: 'icon-modular',
            id: `/project/${repositoryId}/setting/envMana`,
        },
        {
            title: '系统集成',
            // icon: 'icon-modular',
            id: `/project/${repositoryId}/setting/workspace`,
        },
        {
            title: '成员',
            id: `/project/${repositoryId}/setting/member`,
            // icon: 'icon-chengyuan',
        },{
            title: '权限',
            id: `/project/${repositoryId}/setting/privilege`,
            // icon: 'icon-quanxian',
        }
    ]


    /**
     *左侧导航循环渲染
     */
    const renderList = (data) => {
        return  data && data.map(Item=> {
            return (
                <li key={Item.id} style={{  margin:"0 auto"}} >
                    <div className={`ws-menu-li ${Item.id === selected ? "ws-menu-li-action" : null}`}
                         key={Item.id}
                         onClick={()=>selectKeyFun(Item.id)}
                    >
                        <span >
                            {Item.title}
                        </span>
                    </div>
                </li>
            )
        })
    }



    return(
        <ProjectNav
            {...props}
            domainId={repositoryId} // 项目id
            projectRouters={items} // 菜单
            outerPath={`/project/${repositoryId}/setting`} // 项目设置Layout路径
            noAccessPath={"/noaccess"}
        >
            <div className={"repository-setting-box"}>
                <ul className="ws-menu-ul">
                    <li style={{
                        borderBottom:"1px solid #e4e4e4",
                        padding:"10px 25px",
                        fontWeight:"bold",
                    }}
                    >设置</li>
                    {
                        renderList(items)
                    }
                </ul>

                <div className={"repository-setting-right padding-left-right padding-top-bottom"}>
                    {
                        renderRoutes(routes)
                    }
                </div>

            </div>
        </ProjectNav>
    )
}


export default RepositorySettingMenu;