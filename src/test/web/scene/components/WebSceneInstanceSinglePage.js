import React, {useState} from "react";
import { Drawer} from "antd";
import {observer} from "mobx-react";
import webSceneInstanceStore from "../store/webSceneInstanceStore";
import CaseBread from "../../../../common/CaseBread";
import WebSceneInstanceDetail from "./WebSceneInstanceDetail";


const WebSceneInstanceSinglePage =({webSceneInstanceId,name})=>{
    const { findWebSceneInstance } = webSceneInstanceStore;

    const [spinning, setSpinning] = useState(true);
    const [webStepList, setWebStepList] = useState([]);
    const [open, setOpen] = useState(false);
    const [instanceInfo, setInstanceInfo] = useState();

    const showDrawer = async () => {
        let res = await findWebSceneInstance(webSceneInstanceId)

        setInstanceInfo(res)
        setWebStepList(res.stepList)

        setSpinning(false);
        setOpen(true);
    }

    const onClose = () => {
        setSpinning(true);
        setWebStepList([])
        setOpen(false);
    };


    return (
        <>
            <span className={"link-text"} onClick={showDrawer} >{name}</span>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={900}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                //contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <CaseBread
                    breadItem={["历史详情"]}
                    icon={"api1"}
                    setOpen={setOpen}
                />
                <WebSceneInstanceDetail
                    spinning={spinning}
                    webStepList={webStepList}
                    instanceInfo={instanceInfo}
                />
            </Drawer>
        </>
    );
}

export default observer(WebSceneInstanceSinglePage);