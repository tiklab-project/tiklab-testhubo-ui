
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import AppSceneStepList from "./appSceneStepList";
import "./appStyle.scss"
import {useHistory} from "react-router";
import {Button, Form, Space} from "antd";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import CaseContentCommon from "../../../common/CaseContentCommon";
import DetailCommon from "../../../../common/DetailCommon";

const AppSceneDetail = (props) => {
    const {appSceneStore} = props;
    const {findAppScene,updateAppScene} = appSceneStore;
    const [caseInfo,setCaseInfo]=useState();

    const [form] = Form.useForm()
    let history = useHistory()
    const appSceneId = sessionStorage.getItem('appSceneId');
    useEffect(()=> {
        findAppScene(appSceneId).then(res=>{
            setCaseInfo(res);

            let testCase = res.testCase
            form.setFieldsValue({
                name: testCase.name,
                category:testCase.category?.id,
                updateTime:testCase.updateTime,
                createTime:testCase.createTime,
                status:testCase.status,
                priorityLevel:testCase.priorityLevel,
                director:testCase.director?.id,
            })
        })
    },[appSceneId])


    const toExePage = () =>{
        history.push("/repository/testcase/app-scene-execute")
    }

    //更新名称
    const updateCase = async (e) =>{
        let newData = await form.getFieldsValue()
        const params = {
            id:caseInfo.id,
            testCase: {
                ...caseInfo.testCase,
                name:newData.name,
                category:{id:newData.category||"nullstring"},
                status:newData.status,
                priorityLevel:newData.priorityLevel,
                director: {id:newData.director},
            }
        }
        updateAppScene(params).then(()=>{
            findAppScene(appSceneId).then(res=>{
                setCaseInfo(res);
            })
        })
    }


    const tabItem=[
        {
            label: `详细信息`,
            key: '1',
            children:<DetailCommon
                type={true}
                detailInfo={caseInfo}
                updateCase={updateCase}
                form={form}
            />
        },
        {
            label: `测试步骤`,
            key: '2',
            children:<AppSceneStepList />
        }
    ]
    return(
        <CaseContentCommon
            tabItem={tabItem}
            tabBarExtraContent={
                <Space>
                    <IconBtn
                        className="pi-icon-btn-grey"
                        icon={"lishi"}
                        onClick={()=>history.push("/repository/testcase/app-scene-instance")}
                        name={"历史"}
                    />
                    <Button className={"important-btn"} onClick={toExePage}>
                        测试
                    </Button>
                </Space>
            }
        />
    )
}

export default inject('appSceneStore')(observer(AppSceneDetail));
