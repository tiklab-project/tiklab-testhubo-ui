import React, {useState} from "react";
import {renderRoutes} from "react-router-config";
import "./repositorySetting.scss"
const RepositorySetting = (props) =>{

    const routes = props.route.routes;

    const [selected, setSelected] = useState("/repositorypage/setting/envMana");

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
            title: '环境管理',
            // icon: 'icon-modular',
            key: '/repositorypage/setting/envMana',
        },
        {
            title: 'Agent配置',
            key: '/repositorypage/setting/agent',
            // icon: 'icon-modular',
        },{
            title: '成员',
            key: '/repositorypage/setting/role',
            // icon: 'icon-chengyuan',
        },{
            title: '权限',
            key: '/repositorypage/setting/privilege',
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
            {/*<SideMenu*/}
            {/*    item={items}*/}
            {/*    selectedKey={"/repositorypage/setting/agent"}*/}
            {/*    {...props}*/}
            {/*/>*/}
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


export default RepositorySetting;