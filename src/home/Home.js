import React from 'react';
import './homestyle.scss';
import RepositoryRecentHome from "./RepositoryRecentHome";
import TestCaseRecentHome from "./testCaseRecentStore/TestCaseRecentHome";

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
                            <svg className="icon-m home-item-title-icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-zuijinfangwen-`} />
                            </svg>
                            <span>常用仓库</span>
                        </div>
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
                            <span>常用用例</span>
                        </div>
                    </div>
                    <div style={{"padding":" 0 20px"}}>
                        <TestCaseRecentHome {...props}/>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home;
