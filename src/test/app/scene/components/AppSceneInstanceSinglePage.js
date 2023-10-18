import React, {useEffect, useState} from "react";
import {Drawer, Form} from "antd";
import {observer} from "mobx-react";
import appSceneInstanceStore from "../store/appSceneInstanceStore";
import UIResultCommon from "../../../common/UIResultCommon";
import CaseBread from "../../../../common/CaseBread";


const AppSceneInstanceSinglePage =({appSceneInstanceId,name})=>{
    const { findAppSceneInstance } = appSceneInstanceStore;

    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);


    const showDrawer = async () => {
        let res = await findAppSceneInstance(appSceneInstanceId)

        form.setFieldsValue({
            result:res?.result===1?"成功":"失败",
            stepNum:res?.stepNum,
            passNum:res?.passNum,
            failNum:res?.failNum,
            passRate:res?.passRate,
        })

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
            <a onClick={showDrawer} style={{fontWeight:"bold"}}>#{name}</a>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={"70%"}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                <CaseBread
                    title={"历史详情"}
                    icon={"jiekou1"}
                    setOpen={setOpen}
                />
                <UIResultCommon
                    spinning={spinning}
                    form={form}
                    dataList={appStepList}
                />
            </Drawer>
        </>
    );
}

export default observer(AppSceneInstanceSinglePage);