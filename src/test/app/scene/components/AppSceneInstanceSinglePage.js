import React, {useState} from "react";
import {Drawer} from "antd";
import {observer} from "mobx-react";
import appSceneInstanceStore from "../store/appSceneInstanceStore";
import CaseBread from "../../../../common/CaseBread";
import AppSceneInstanceDetail from "./AppSceneInstanceDetail";


const AppSceneInstanceSinglePage =({appSceneInstanceId,name})=>{
    const { findAppSceneInstance } = appSceneInstanceStore;

    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);
    const [instanceInfo, setInstanceInfo] = useState();
    const [open, setOpen] = useState(false);


    const showDrawer = async () => {
        let res = await findAppSceneInstance(appSceneInstanceId)
        setInstanceInfo(res)
        setAppStepList(res.stepList)

        setSpinning(false);
        setOpen(true);
    }

    const onClose = () => {
        setSpinning(true);
        setAppStepList([])
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
                <AppSceneInstanceDetail
                    spinning={spinning}
                    instanceInfo={instanceInfo}
                    appStepList={appStepList}
                />
            </Drawer>
        </>
    );
}

export default observer(AppSceneInstanceSinglePage);