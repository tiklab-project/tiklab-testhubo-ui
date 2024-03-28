import React, {useState} from "react";
import {inject, observer} from "mobx-react";

/**
 * 头部左侧导航
 */
const HeaderMenu = (props) =>{
    const items = [
        {
            label:'主页',
            key: '/home'
        },
        {
            label:'项目',
            key: '/repository-page'
        }
    ]

    const [current, setCurrent] = useState('/home');

    /**
     * 点击跳往
     */
    const onClick = (e) => {
        props.history.push(e.key)
        setCurrent(e.key);
    };

    /**
     * 渲染导航项
     */
    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return (
                <div
                    key={item.key}
                    className={`header-menu-item ${current===item.key?"header-menu-item-action":""}`}
                    onClick={()=>onClick(item)}
                >
                    <div className={`header-menu-item-label title-font-weight-500 ${current===item.key?"header-menu-item-label-action":""}`}>
                        {item.label}
                    </div>
                </div>
            )
        })
    }

    return(
        <div className={"header-menu-box"}>
            {showMenuItem(items)}
        </div>
    )
}
export default inject("repositoryStore")(observer(HeaderMenu));