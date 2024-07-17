import React from 'react';
import './homestyle.scss';
import RepositoryRecentHome from "./RepositoryRecentHome";
import TestCaseRecentHome from "./testCaseRecentStore/TestCaseRecentHome";
import {Space,Row} from "antd";
import TotalAndStatusStatistics from "./homestatistics/TotalAndStatusStatistics";
import HomeNewCreateCaseStatistics from "./homestatistics/HomeNewCreateCaseStatistics";

/**
 * 首页
 */
const Home =(props)=> {
    return(
        <div className={"home-content"}>
            <div className={"home-content-box"}>
                <div className={"home-box-item"}>
                    <div className={"home-item-title-box"}>
                        <div className={"home-item-title"}>
                            {/*<svg className="icon-m home-item-title-icon" aria-hidden="true">*/}
                            {/*    <use xlinkHref= {`#icon-zuijinfangwen-`} />*/}
                            {/*</svg>*/}
                            <span>常用项目</span>
                        </div>
                    </div>
                    <div className={"home-box-item-detail"}>
                        <RepositoryRecentHome {...props}/>
                    </div>
                </div>
                <div className={"home-box-item-dynamic"}>
                    <div className={"home-item-title-box"}>
                        <div className={"home-item-title"}>
                            {/*<svg className="icon-m home-item-title-icon" aria-hidden="true">*/}
                            {/*    <use xlinkHref= {`#icon-rizhijilu`} />*/}
                            {/*</svg>*/}
                            <span>统计</span>
                        </div>
                    </div>
                    <Row gutter={20}>
                        <TotalAndStatusStatistics />
                        <HomeNewCreateCaseStatistics />
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default Home;
