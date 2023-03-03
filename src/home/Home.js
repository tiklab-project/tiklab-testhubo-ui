import React, {useEffect} from 'react';
import './homestyle.scss';
import RepositoryRecentHome from "../repository/repository/components/RepositoryRecentHome";
import {RightOutlined} from "@ant-design/icons";
import DynamicWidget from "./DynamicWidget";
import {inject, observer} from "mobx-react";
import {getUser} from "tiklab-core-ui";


// 首页
const Home =(props)=> {
    const {repositoryStore} = props;
    const {findRepositoryJoinList} = repositoryStore;

    useEffect(()=>{
        findRepositoryJoinList({userId: getUser().userId})
    },[])

    //去往动态详情页
    const changeDynamic =() =>{
        props.history.push("/dynamic")
    }

    //去往空间页
    const toRepository =() =>{
        props.history.push("/repository")
    }


    return(
        <div className={"home-content"}>
            <div className={"home-content-box"}>
                <div className={"home-box-item"}>
                    <div className={"home-item-title-box"}>
                        <div className={"home-item-title"}>
                            <svg className="icon-m home-item-title-icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-zuijinfangwen-`} />
                            </svg>
                            <span>最近访问</span>
                        </div>
                        <RightOutlined onClick={toRepository} />
                    </div>
                    <div className={"home-box-item-detail"}>
                        <RepositoryRecentHome {...props}/>
                    </div>
                </div>
                <div className={"home-box-item-dynamic"}>
                    <div className={"home-item-title-box"}>
                        <div className={"home-item-title"}>
                            <svg className="icon-m home-item-title-icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-rizhijilu`} />
                            </svg>
                            <span>动态信息</span>
                        </div>
                        <RightOutlined onClick={changeDynamic} />
                    </div>
                    <div style={{"padding":" 0 20px"}}>
                        <DynamicWidget />
                    </div>
                </div>
            </div>
        </div>

    )
}

export default inject("repositoryStore")(observer(Home));
