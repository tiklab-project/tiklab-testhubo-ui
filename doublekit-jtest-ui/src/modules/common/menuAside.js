/**
 * @description：
 * @date: 2021-08-18 15:03
 */
import React, {useState} from 'react';

const MenuAside = (props) =>{

    const {data}=props

    const [selectKey,setSelectKey] = useState();

    //点击左侧菜单，设置路由地址
    const selectKeyFun = (key)=>{
        setSelectKey(key);
        props.history.push(key);
    }

    /**
     *左侧导航循环渲染
     */
    return  <ul className="tc-menu-ul">
        {data && data.map(Item=> {
                return (
                    <li key={Item.key} >
                        <div className={`tc-menu-li ${Item.key=== selectKey ? "tc-menu-li-action" : ""}`}
                             key={Item.key}
                             onClick={()=>selectKeyFun(Item.key)}
                        >
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#${Item.icon}`}></use>
                            </svg>
                            <span >
                            {Item.title}
                        </span>
                        </div>
                    </li>
                )
            }
        )}
    </ul>
}

export default MenuAside;
