import React, {useState} from 'react';
import { renderRoutes } from "react-router-config";
import './repository.scss';
import SideMenu from "../../common/sideMenu";
import BreadcrumbEx from "../../common/breadcrumbEx";

const Repository = (props)=> {

    const router = props.route.routes;

    //项目列表左侧导航列表
    const items = [
        {
            title: '所有用例库',
            icon: 'icon-modular',
            key: `/repository/all`
        },{
            title: `最近浏览`,
            icon: 'icon-modular',
            key: `/repository/recent`
        },
        {
            title: '创建的用例库',
            icon: 'icon-modular',
            key: `/repository/create`
        },
        {
            title: '参与的用例库',
            icon: 'icon-modular',
            key: `/repository/join`
        },
        // {
        //     title: '关注的用例库',
        //     icon: 'icon-modular',
        //     key: `/repository/follow`
        // }
    ];

    const [selected, setSelected] = useState("/repository/all");

    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    className={`repository-header-menu-item  ${item.key === selected ? "repository-header-menu-item-selected" : null}`}
                    onClick={()=>selectKeyFun(item.key)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }

    const selectKeyFun = (key)=>{
        setSelected(key)
        props.history.push(key);
    }


    return(
        <div className='tccontant-contant'>
            <BreadcrumbEx list={["仓库","仓库列表"]} />
            <div className={"repository-header-menu"}>
                {showMenu(items)}
            </div>

            <div className='contant-box'>
                {renderRoutes(router)}
            </div>
        </div>
    )


}


export default Repository;
