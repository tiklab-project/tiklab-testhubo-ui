import React from "react";
import "./menuSelectSytle.scss"

const MenuSelect = (props) =>{
    const {selected,selectFn,style,menuItems} = props;

    //渲染筛选项
    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`select-menu-item  ${item.key === selected ? "select-menu-item-selected" : ""}`}
                    onClick={()=>selectFn(item)}
                >
                    <span> {item.title} </span>

                </div>
            )
        })
    }

    return(
        <div className={"select-menu-box"} style={style}>
            {showMenu(menuItems)}
        </div>
    )
}

export default MenuSelect