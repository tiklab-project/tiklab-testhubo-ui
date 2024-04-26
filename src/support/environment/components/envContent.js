import React, {useState} from "react";
import {Col, Tabs,Row} from "antd";
import ApiEnvList from "./apiEnvList";
import AppEnvList from "./appEnvList";
import ApiEnvEdit from "./apiEnvEdit";
import AppEnvEdit from "./appEnvEdit";

const { TabPane } = Tabs;

const EnvContent = (props)=>{

    const [activeKey, setActiveKey] = useState("api");

    const onChange = (activeKey) =>{
        setActiveKey(activeKey)
    }

    const showEditView = (type) =>{
        switch (type) {
            case "api":
               return <ApiEnvEdit name="添加环境" type="add"  />
            // case "web":
            //     return <WebEnvEdit name="添加环境" type="add" />
            case "app":
                return <AppEnvEdit name="添加环境" type="add" />
        }
    }


    return(
        <Row>
            <Col
                xs={{ span: "24" }}
                sm={{ span: "24" }}
                md={{ span: "24" }}
                lg={{ span: "24" }}
                xl={{ span: "20", offset: "2" }}
                xxl={{ span: "18", offset: "3" }}
            >
                <div  className={"header-box-space-between"} >
                    <div className={'header-box-title'}>环境</div>
                    {
                        showEditView(activeKey)
                    }
                </div>
                <div className={"env-tab-box"}>
                    <Tabs defaultActiveKey="api"  onChange={onChange}>
                        <TabPane tab="API环境" key="api">
                            <div style={{marginTop:"10px"}}>
                                <ApiEnvList />
                            </div>
                        </TabPane>
                        <TabPane tab="APP环境" key="app">
                            <div style={{marginTop:"10px"}}>
                                <AppEnvList />
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </Col>
        </Row>
    )
}

export default EnvContent;