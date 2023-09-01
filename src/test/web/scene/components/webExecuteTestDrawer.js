import React, { useState} from "react";
import {Breadcrumb, Button, Drawer} from "antd";
import WebExecuteTestCommon from "./WebExecuteTestCommon";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";


const WebExecuteTestDrawer =(props)=>{
    const {webSceneStore,webSceneId} = props;
    const {webSceneTestStatus} = webSceneStore;

    const [start, setStart] = useState()
    const [visible, setVisible] = useState(false);

    const showDrawer = async () => {
        //打开先获取执行状态
        let status = webSceneTestStatus(webSceneId);
        setStart(status)
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <Button className={"important-btn"}  onClick={showDrawer}> 测试 </Button>
            <Drawer
                title="WEB场景测试"
                placement="right"
                onClose={onClose}
                visible={visible}
                width={"80%"}
                destroyOnClose={true}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
            >
                <div className={"breadcrumb-title_between"}>
                    <Breadcrumb className={"breadcrumb-box"}>
                        <Breadcrumb.Item>测试</Breadcrumb.Item>
                    </Breadcrumb>
                    <DrawerCloseIcon />
                </div>
                <WebExecuteTestCommon
                    start={start}
                    setStart={setStart}
                    webSceneId={webSceneId}
                    {...props}
                />
            </Drawer>
        </>
    );
}

export default WebExecuteTestDrawer;