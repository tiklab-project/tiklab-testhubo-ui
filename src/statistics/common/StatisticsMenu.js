import React, {useState} from "react";
import {renderRoutes} from "react-router-config";
import {useLocation} from "react-router";
import "./statisticsStyle.scss"

const items=[
    {
        title: '新增用例统计',
        id: '/repository/homestatistics/new-create',
    }, {
        title: '用例测试统计',
        id: '/repository/homestatistics/test',
    }
]


const StatisticsMenu = (props)=>{
    const location = useLocation();
    const [selected, setSelected] = useState(location.pathname);

    const selectKeyFun = (key)=>{
        setSelected(key)
        props.history.push(key);
    }

    const renderList = (data) => {
        return  data && data.map(Item=> {
            return (
                <li key={Item.id} style={{  margin:"0 auto"}} >
                    <div className={`menu-li ${Item.id === selected ? "menu-li-action" : null}`}
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
        <div className={"statistics-main"} >
            <ul className="left-menu" >
                <li style={{
                    borderBottom:"1px solid #e4e4e4",
                    padding:"10px 25px",
                    fontWeight:"bold",
                }}
                >统计</li>
                {
                    renderList(items)
                }
            </ul>

            <div className={"right-content padding-left-right padding-top-bottom"}>
                {
                    renderRoutes(props.route.routes)
                }
            </div>
        </div>
    )
}

export default StatisticsMenu;