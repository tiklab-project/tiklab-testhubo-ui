
import React from "react";
import { observer } from "mobx-react";
import DynamicWidget from "./DynamicWidget";
import {useParams} from "react-router";
import PageCenter from "../../common/pageContent/PageCenter";
import {Row} from "antd";
import ProjectTotalAndStatusStatistics from "./ProjectTotalAndStatusStatistics";
import CaseTestResultNumberStatistics from "../../statistics/common/CaseTestResultNumberStatistics";
import StatisticsCaseTrend from "../../statistics/common/StatisticsCaseTrend";
import CaseNumberStatistics from "../../home/homestatistics/CaseNumberStatistics";

/**
 * 项目 概况
 */
const RepositoryOverView = (props) => {
    let {id} = useParams()
    const repositoryId =  sessionStorage.getItem("repositoryId") || id;


    return (
        <PageCenter>
            <div className={"ws-init-box"}>
                <div className={" ws-init-content"}>
                    <div className={"wd-total"}>
                        <div className={"header-box-title title-bold"}>用例统计</div>
                        <CaseNumberStatistics />
                        <Row gutter={20}>
                            <StatisticsCaseTrend repositoryId={repositoryId} />
                            <ProjectTotalAndStatusStatistics />
                        </Row>

                    </div>
                    <div className={"wd-total"}>
                        <div className={"header-box-title title-bold"}>用例执行统计</div>
                        <CaseTestResultNumberStatistics repositoryId={repositoryId}/>
                    </div>

                    <div className={"wd-dynamic-box"}>
                        <div className={"header-box-title title-bold"} style={{margin: "0 0 25px 0"}}>最近动态</div>
                        <DynamicWidget screen={{"repositoryId": repositoryId}}/>
                    </div>
                </div>
            </div>
        </PageCenter>
    )

}
export default observer(RepositoryOverView);
