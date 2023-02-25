import React, {useState} from "react";
import {renderRoutes} from "react-router-config";
import "./repositorySetting.scss"
const RepositorySettingMenu = (props) =>{

    const routes = props.route.routes;

    const [selected, setSelected] = useState("/repository/setting/detail");

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
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#${Item.icon}`} />
                        </svg>
                        <span >
                            {Item.title}
                        </span>
                    </div>
                </li>
            )
        })
    }



    return(
        <div className={"repository-setting-box"}>
            <ul className="ws-menu-ul" style={{background: "#f5f5f5"}}>
                <li style={{
                    borderBottom:"1px solid #cecece",
                    padding:"10px 20px"
                }}
                >仓库设置</li>
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
    )
}


export default RepositorySettingMenu;