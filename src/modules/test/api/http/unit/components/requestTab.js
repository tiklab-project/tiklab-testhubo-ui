import React from "react";
import {Tabs} from "antd";

const { TabPane } = Tabs;

/***
 * 请求中的tab，公共组件
 */
const RequestTab = (props) =>{

    const requestTabDictionary = {
        "header":"请求头",
        "query":"查询参数",
        "body":"请求体",
        "pre":"前置脚本",
        "after":"后置脚本",
        "assert":"断言"
    }

    //渲染tabPane
    const showTabPane = (data)=>{
        let arr = Object.keys(data)

        return arr.map(item=>{

            return(
                <TabPane tab={data[item]} key={item} >
                    <div className={"tabPane-item-box"}>
                        {
                            showTabPaneComponent(item)
                        }
                    </div>
                </TabPane>
            )
        })
    }

    //渲染相应tab下的组件
    const showTabPaneComponent =(type)=>{
        switch (type) {
            case "header":
                return props.header
            case "query":
                return props.query
            case "body":
                return props.body
            case "pre":
                return props.pre
            case "after":
                return props.after
            case "assert":
                return props.assert
        }
    }

    return(
        <Tabs  className="tabs"  >
            {
                showTabPane(requestTabDictionary)
            }
        </Tabs>
    )
}

export default RequestTab;