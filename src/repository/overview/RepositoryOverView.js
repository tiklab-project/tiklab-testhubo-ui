
import React, { useEffect, useState} from "react";
import { observer, inject } from "mobx-react";
import DynamicWidget from "../../home/DynamicWidget";
import {useParams} from "react-router";

/**
 * 仓库 概况
 */
const RepositoryOverView = (props) => {
    const {repositoryStore} = props;
    const {findRepositoryTotal} = repositoryStore;

    let {id} = useParams()
    const repositoryId =  sessionStorage.getItem("repositoryId") || id;
    const [total, setTotal] = useState();

    useEffect(async ()=>{
        //获取路由id存入
        sessionStorage.setItem('repositoryId',id);

        let res = await findRepositoryTotal(repositoryId)

        setTotal(res)
    },[repositoryId])

    //概要项
    const items = [
        {
            title:"测试计划",
            value:total?.planTotal,
        },
        {
            title:"分组数",
            value:total?.categoryTotal,
        },
        {
            title:"用例数",
            value:total?.caseTotal,
        },
        {
            title:"成员",
            value:total?.memberTotal,
        }
    ]

    /**
     *   展示概要
     */
    const showDetailView = (data) =>{
        return data.map((item,index)=>{
            return(
                <div className={"wd-total-item"} key={index}>
                    <div className={"wd-total-item-title"}>{item.value}</div>
                    <div className={"wd-total-item-name"}>{item.title}</div>
                </div>
            )
        })
    }


    return (
        <div className={"ws-init-box"}>
            <div className={" ws-init-content"}>
                <div className={"wd-total"}>
                    <div className={"title-bold"}> 概要</div>
                    <div className={"wd-total-box"}>
                        {
                            showDetailView(items)
                        }
                    </div>
                </div>
                <div className={"wd-dynamic-box"}>
                    <div className={"title-bold"} style={{margin: "0 0 10px 0"}}>最近动态</div>

                    <DynamicWidget screen={{"repositoryId": repositoryId}}/>
                </div>
            </div>
        </div>
    )

}
export default inject('repositoryStore')(observer(RepositoryOverView));
