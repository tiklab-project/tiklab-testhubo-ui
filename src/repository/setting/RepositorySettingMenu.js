import React, {useState} from "react";
import {renderRoutes} from "react-router-config";
import "./repositorySetting.scss"
import {ProjectNav} from "tiklab-privilege-ui"
import {useLocation} from "react-router";
/**
 * 仓库设置页中的左侧导航
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
            title: '仓库信息',
            key: '/repository/setting/detail',
            // icon: 'icon-setting',
        }, {
            title: '模块',
            // icon: 'icon-modular',
            key: '/repository/setting/category',
        },
        {
            title: '环境管理',
            // icon: 'icon-modular',
            key: '/repository/setting/envMana',
        },
        {
            title: '集成项目',
            // icon: 'icon-modular',
            key: '/repository/setting/workspace',
        },
        {
            title: 'Agent配置',
            key: '/repository/setting/agent',
            // icon: 'icon-modular',
        },{
            title: '成员',
            key: '/repository/setting/role',
            // icon: 'icon-chengyuan',
        },{
            title: '权限',
            key: '/repository/setting/privilege',
            // icon: 'icon-quanxian',
        }
    ]


    /**
     *左侧导航循环渲染
     */
    const renderList = (data) => {
        return  data && data.map(Item=> {
            return (
                <li key={Item.key} style={{  margin:"0 auto"}} >
                    <div className={`ws-menu-li ${Item.key === selected ? "ws-menu-li-action" : null}`}
                         key={Item.key}
                         onClick={()=>selectKeyFun(Item.key)}
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
            outerPath={`/repository/setting`} // 项目设置Layout路径
        >
            <div className={"repository-setting-box"}>
                <ul className="ws-menu-ul" style={{background: "#f5f5f5"}}>
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

                <div className={"repository-setting-right"}>
                    {
                        renderRoutes(routes)
                    }
                </div>

            </div>
        </ProjectNav>
    )
}


export default RepositorySettingMenu;