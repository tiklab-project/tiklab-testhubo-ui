import React from "react";
import {Tabs} from "antd";

const CaseContentCommon = (props) =>{
    const {breadcrumb,tabBarExtraContent,tabItem} = props

    return(
        <>
            <div className={" case-tabs-box"} >
                {
                breadcrumb
                    ?<div className={"breadcrumb-title_between"}>
                        {breadcrumb}
                    </div>
                    :null
                }

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