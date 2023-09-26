import React, {useEffect, useRef, useState} from "react";
import {inject, observer} from "mobx-react";
import CaseBread from "../../../../common/CaseBread";
import UIResultCommon from "../../../common/UIResultCommon";
import {Form} from "antd";

const WebExecuteTestPage = (props) =>{
    const {webSceneStore} = props;
    const {webSceneTestStatus,webSceneTestDispatch,webSceneTestResult,setStartStatus,startStatus} = webSceneStore;

    const webSceneId = sessionStorage.getItem('webSceneId')
    const repositoryId = sessionStorage.getItem('repositoryId')
    const [spinning, setSpinning] = useState(true);
    const [webStepList, setWebStepList] = useState([]);
    const ref = useRef();
    const [form] = Form.useForm();

    useEffect(()=>{
         webSceneTestStatus().then(res =>{
             //如果执行状态为0:未开始
             if(res.code===0&&res.data===0){
                 let param = {
                     repositoryId:repositoryId,
                     webSceneId:webSceneId,
                     webDriver:"chrome"
                 }
                 //开始执行
                 webSceneTestDispatch(param)
                 setStartStatus(1)
             }
         });
    },[])


    useEffect(async ()=>{
        if(startStatus === 1){
            testResult()
        }
        return () => ref.current = null
    },[startStatus])


    const testResult = () =>{
        ref.current =  setInterval(async ()=>{
            //获取执行结果
            let res = await webSceneTestResult({webSceneId:webSceneId,webDriver:"chrome"})

            if(res.code===0){
                let data = res.data;
                setWebStepList(data?.webUnitResultList);

                let instance = data?.webSceneInstance;
                form.setFieldsValue({
                    result:instance?.result,
                    stepNum:instance?.stepNum,
                    passNum:instance?.passNum,
                    failNum:instance?.failNum,
                    passRate:instance?.passRate,
                    totalDuration:instance?.totalDuration
                })

                setSpinning(false)

                //获取执行状态，是否结束
                webSceneTestStatus().then(res =>{
                    if(res.code!==0){
                        clearInterval(ref.current)
                        return
                    }
                    if(res.data===0){
                        setStartStatus(res.data)
                        clearInterval(ref.current)

                        //如果状态变回0 还要走一遍
                        webSceneTestResult({webSceneId:webSceneId,webDriver:"chrome"})
                    }
                })
            }
        },3000);
    }


    return(
        <div className={"content-box-center"}>
            <CaseBread title={"WEB场景测试"}/>
            <UIResultCommon
                spinning={spinning}
                form={form}
                dataList={webStepList}
            />
        </div>
    )
}

export default inject('webSceneStore')(observer(WebExecuteTestPage))