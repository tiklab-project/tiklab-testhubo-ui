import React from "react";
import {Tabs} from "antd";

const CaseContentCommon = (props) =>{
    const {breadcrumb,tabBarExtraContent,tabItem} = props

    return(
        <>
            {
                breadcrumb
                    ?<div className={"breadcrumb-title_between"}>
                        {breadcrumb}
                    </div>
                    :null
            }

            <div className={"content-box-center case-tabs-box"} >
                <Tabs
                    defaultActiveKey="1"
                    items={tabItem}
                    tabBarExtraContent={tabBarExtraContent}
                />
            </div>
        </>
    )
}

export default CaseContentCommon;