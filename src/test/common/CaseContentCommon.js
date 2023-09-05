import React from "react";
import {Tabs} from "antd";

const CaseContentCommon = (props) =>{
    const {breadcrumb,tabItem} = props

    return(
        <>
            <div className={"breadcrumb-title_between"}>
                {breadcrumb}
            </div>
            <div className={"content-box-center case-tabs-box"} >
                <Tabs
                    defaultActiveKey="1"
                    items={tabItem}
                />
            </div>
        </>
    )
}

export default CaseContentCommon;