import React, {useState} from "react";
import {inject, observer} from "mobx-react";

const HeaderMenu = (props) =>{
    const items = [
        {
            label:'主页',
            key: '/home'
        },
        {
            label:'项目',
            key: '/repository'
        }
    ]

    const [current, setCurrent] = useState('/home');

    const onClick = (e) => {
        props.history.push(e.key)
        setCurrent(e.key);
    };

    const showMenuItem = (data) =>{
        return data&&data.map(item=>{
            return (
                <div
                    key={item.key}
                    className={`header-menu-item ${current===item.key?"header-menu-item-action":""}`}
                    onClick={()=>onClick(item)}
                >
                    <span>{item.label}</span>
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