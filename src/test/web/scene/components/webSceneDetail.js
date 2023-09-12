import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import WebSceneStepList from "./webSceneStepList";
import "./webStyle.scss"
import {useHistory} from "react-router";
import {Button, Form, Space} from "antd";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import CaseContentCommon from "../../../common/CaseContentCommon";
import DetailCommon from "../../../../common/DetailCommon";

const WebSceneDetail = (props) => {
    const {webSceneStore} = props;
    const {findWebScene,updateWebScene} = webSceneStore;
    const [caseInfo,setCaseInfo]=useState();

    const [form] = Form.useForm()
    let history = useHistory()
    const webSceneId = sessionStorage.getItem('webSceneId');
    useEffect(()=> {
        findWebScene(webSceneId).then(res=>{
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
    },[webSceneId])

    const toExePage = () =>{
        history.push("/repository/testcase/web-scene-execute")
    }

    const updateCase = async () =>{
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
        updateWebScene(params).then(()=>{
            findWebScene(webSceneId).then(res=>{
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
        },{
            label: `测试步骤`,
            key: '2',
            children:  <WebSceneStepList />
        }
    ]

    return(
        <CaseContentCommon
            tabItem={tabItem}
            tabBarExtraContent={
                <>
                    {
                        props.planType
                            ?null
                            :<Space>
                                <IconBtn
                                    className="pi-icon-btn-grey"
                                    icon={"lishi"}
                                    onClick={()=>history.push("/repository/testcase/web-scene-instance")}
                                    name={"历史"}
                                />
                                <Button className={"important-btn"} onClick={toExePage}>
                                    测试
                                </Button>
                            </Space>
                    }
                </>

            }
        />
    )
}

export default inject('webSceneStore')(observer(WebSceneDetail));
