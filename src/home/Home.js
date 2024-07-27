import React from 'react';
import './homestyle.scss';
import RepositoryRecentHome from "./RepositoryRecentHome";
import {Row,Col} from "antd";
import TotalAndStatusStatistics from "./homestatistics/TotalAndStatusStatistics";
import CaseNumberStatistics from "./homestatistics/CaseNumberStatistics";
import CaseTestResultNumberStatistics from "../statistics/common/CaseTestResultNumberStatistics";
import StatisticsCaseTrend from "../statistics/common/StatisticsCaseTrend";

/**
 * 首页
 */
const Home =(props)=> {
    return(
        <div className={"home-content"}>
            <Row style={{height:"100%"}}>
                <Col
                    md={{ span: 24, offset: 0 }}
                    lg={{ span: 20, offset: 2 }}
                    xl={{ span: 18, offset: 3 }}
                    xll={{ span: 16, offset: 4 }}
                >
                <div className={"home-content-box"}>
                    <div className={"home-box-item"}>
                        <div className={"home-item-title-box"}>
                            <div className={"home-item-title"}>
                                <span>常用项目</span>
                            </div>
                        </div>
                        <RepositoryRecentHome {...props}/>
                    </div>
                    <div className={"home-box-item-dynamic"}>
                        <div className={"home-item-title-box"}>
                            <div className={"home-item-title"}>
                                <span>用例统计</span>
                            </div>
                        </div>
                        <CaseNumberStatistics />
                        <Row gutter={20}>
                            <StatisticsCaseTrend />
                            <TotalAndStatusStatistics />
                        </Row>
                    </div>
                    <div className={"home-box-item-dynamic"}>
                        <div className={"home-item-title-box"} style={{margin: "30px 0 10px"}}>
                            <div className={"home-item-title"}>
                                <span>用例执行统计</span>
                            </div>
                        </div>
                        <CaseTestResultNumberStatistics />
                    </div>
                </div>
                </Col>
            </Row>
        </div>
    )
}

export default Home;
