import React from "react";
import {Tabs} from "antd";

const CaseContentCommon = (props) =>{
    const {breadcrumb,tabBarExtraContent,tabItem,changeTap} = props

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
                    onChange={changeTap}
                />
            </div>
        </>
    )
}

export default CaseContentCommon;