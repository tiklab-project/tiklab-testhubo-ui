
import React, { useEffect, useState} from "react";
import { observer, inject } from "mobx-react";
import DynamicWidget from "../../home/DynamicWidget";
import {useParams} from "react-router";
import PageContent from "../../common/pageContent/PageContent";
import {Row,Col} from "antd";
import ProjectTotalAndStatusStatistics from "./ProjectTotalAndStatusStatistics";
import ProjectCaseTestStatistics from "./ProjectCaseTestStatistics";

/**
 * 项目 概况
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
            title:"测试用例",
            value:total?.caseTotal,
        },
        {
            title:"测试报告",
            value:total?.instanceTotal,
        },
        {
            title:"分组",
            value:total?.categoryTotal,
        }
    ]

    /**
     *   展示概要
     */
    const showDetailView = (data) =>{
        return data.map((item,index)=>{
            return(
                <Col span={6}>
                    <div className={"wd-total-item"} key={index}>
                        <div className={"wd-total-item-title"}>{item.value}</div>
                        <div className={"wd-total-item-name"}>{item.title}</div>
                    </div>
                </Col>
            )
        })
    }


    return (
        <PageContent>
            <div className={"ws-init-box"}>
                <div className={" ws-init-content"}>
                    <div className={"wd-total"}>
                        <div className={"title-bold"}> 概要</div>
                        <Row gutter={30} style={{width:"100%"}}>
                            {
                                showDetailView(items)
                            }
                        </Row>
                        <div className={"wd-total-box"}>
                            <Row gutter={30} style={{width:"100%"}}>
                                <ProjectTotalAndStatusStatistics />
                                <ProjectCaseTestStatistics />
                            </Row>
                        </div>
                    </div>
                    <div className={"wd-dynamic-box"}>
                        <div className={"title-bold"} style={{margin: "0 0 10px 0"}}>最近动态</div>

                        <DynamicWidget screen={{"repositoryId": repositoryId}}/>
                    </div>
                </div>
            </div>
        </PageContent>
    )

}
export default inject('repositoryStore')(observer(RepositoryOverView));
