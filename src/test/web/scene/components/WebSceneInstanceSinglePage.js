import React, {useEffect, useState} from "react";
import {Drawer, Form} from "antd";
import {observer} from "mobx-react";
import webSceneInstanceStore from "../store/webSceneInstanceStore";
import UIResultCommon from "../../../common/UIResultCommon";
import CaseBread from "../../../../common/CaseBread";


const WebSceneInstanceSinglePage =({webSceneInstanceId,name})=>{
    const { findWebSceneInstance } = webSceneInstanceStore;

    const [spinning, setSpinning] = useState(true);
    const [webStepList, setWebStepList] = useState([]);
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);

    const showDrawer = async () => {
        let res = await findWebSceneInstance(webSceneInstanceId)

        form.setFieldsValue({
            result:res?.result===1?"成功":"失败",
            stepNum:res?.stepNum,
            passNum:res?.passNum,
            failNum:res?.failNum,
            passRate:res?.passRate,
        })

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
            <a onClick={showDrawer} >{name}</a>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={900}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 52px)"}}
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
                    dataList={webStepList}
                />
            </Drawer>
        </>
    );
}

export default observer(WebSceneInstanceSinglePage);