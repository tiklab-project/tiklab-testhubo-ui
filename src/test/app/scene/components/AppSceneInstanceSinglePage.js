import React, {useEffect, useState} from "react";
import {Form} from "antd";
import {observer} from "mobx-react";
import appSceneInstanceStore from "../store/appSceneInstanceStore";
import UIResultCommon from "../../../common/UIResultCommon";
import CaseBread from "../../../../common/CaseBread";


const AppSceneInstanceSinglePage =(props)=>{
    const { findAppSceneInstance } = appSceneInstanceStore;

    const [spinning, setSpinning] = useState(true);
    const [appStepList, setAppStepList] = useState([]);
    const [form] = Form.useForm();

    const appSceneInstanceId = sessionStorage.getItem("appSceneInstanceId")

    useEffect(async ()=>{
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


        return () => {
            setSpinning(true);
            setAppStepList([])
        };
    },[])


    return (
        <>
            <CaseBread title={"历史详情"}/>
            <UIResultCommon
                spinning={spinning}
                form={form}
                dataList={appStepList}
            />
        </>
    );
}

export default observer(AppSceneInstanceSinglePage);