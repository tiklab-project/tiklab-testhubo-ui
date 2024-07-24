import React from 'react';
import './homestyle.scss';
import RepositoryRecentHome from "./RepositoryRecentHome";
import {Row} from "antd";
import TotalAndStatusStatistics from "./homestatistics/TotalAndStatusStatistics";
import HomeNewCreateCaseStatistics from "./homestatistics/HomeNewCreateCaseStatistics";
import PageContent from "../common/pageContent/PageContent";

/**
 * 首页
 */
const Home =(props)=> {
    return(
        <div className={"home-content"}>
            <PageContent>
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
                                <span>统计</span>
                            </div>
                        </div>
                        <Row gutter={20}>
                            <TotalAndStatusStatistics />
                            <HomeNewCreateCaseStatistics />
                        </Row>
                    </div>
                </div>
            </PageContent>
        </div>
    )
}

export default Home;
