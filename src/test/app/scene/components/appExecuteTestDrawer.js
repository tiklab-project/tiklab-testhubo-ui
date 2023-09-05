import React, {useState} from "react";
import {Breadcrumb, Button, Drawer} from "antd";
import AppExecuteTestCommon from "./AppExecuteTestCommon";
import {DrawerCloseIcon} from "../../../common/BreadcrumbCommon";
import IconCommon from "../../../../common/IconCommon";


const AppExecuteTestDrawer =(props)=>{
    const {appSceneStore,appSceneId} = props;
    const {appSceneTestStatus} = appSceneStore;

    const [visible, setVisible] = useState(false);
    const [start, setStart] = useState()


    const showDrawer = async () => {
        let status = appSceneTestStatus(appSceneId);
        setStart(status)

        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <>
            <Button  className={"important-btn"}  onClick={showDrawer}> 测试 </Button>
            <Drawer
                placement="right"
                onClose={onClose}
                open={visible}
                width={"80%"}
                maskClosable={false}
                destroyOnClose={true}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                <div className={"breadcrumb-title_between"} style={{padding:"0 0 5px 0"}}>
                    <Breadcrumb className={"breadcrumb-box"}>
                        <Breadcrumb.Item>测试</Breadcrumb.Item>
                    </Breadcrumb>
                    <IconCommon
                        className={"icon-s edit-icon"}
                        icon={"shanchu2"}
                        onClick={()=>setVisible(false)}
                    />
                </div>
                <div style={{padding:"10px"}}>
                    <AppExecuteTestCommon
                        start={start}
                        setStart={setStart}
                        webSceneId={appSceneId}
                        {...props}
                    />
                </div>

            </Drawer>
        </>
    );
}

export default AppExecuteTestDrawer;