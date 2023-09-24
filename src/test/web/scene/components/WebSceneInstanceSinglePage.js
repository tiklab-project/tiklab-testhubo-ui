import React, {useEffect, useState} from "react";
import {Form} from "antd";
import {observer} from "mobx-react";
import webSceneInstanceStore from "../store/webSceneInstanceStore";
import UIResultCommon from "../../../common/UIResultCommon";
import CaseBread from "../../../../common/CaseBread";


const WebSceneInstanceSinglePage =(props)=>{
    const { findWebSceneInstance } = webSceneInstanceStore;

    const [spinning, setSpinning] = useState(true);
    const [webStepList, setWebStepList] = useState([]);
    const [form] = Form.useForm();

    const webSceneInstanceId = sessionStorage.getItem("webSceneInstanceId")

    useEffect(async ()=>{
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


        return () => {
            setSpinning(true);
            setWebStepList([])
        };
    },[])


    return (
        <>
            <CaseBread title={"历史详情"}/>
            <UIResultCommon
                spinning={spinning}
                form={form}
                dataList={webStepList}
            />
        </>
    );
}

export default observer(WebSceneInstanceSinglePage);