/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import {Form, Input} from "antd";
import ApiSceneTestResult from "../../../apitest/http/scenecase/components/apiSceneTestResult";
import DetailCommon from "../../../common/detailCommon";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

const WebUnitDetail = (props) => {
    const {webUnitStore} = props;
    const {findWebUnit,updateWebUnit} = webUnitStore;

    const [detailInfo,setDetailInfo]=useState();

    const webUnitId = sessionStorage.getItem('webUnitId');
    const [form] = Form.useForm();

    useEffect(()=> {
        findWebUnit(webUnitId).then(res=>{
            setDetailInfo(res);

            form.setFieldsValue({
                actionType:res.actionType,
                parameter:res.parameter,
                location: res.location,
                locationValue:res.locationValue,
                expectedResult:res.expectedResult,
            })
        })
    },[webUnitId])

    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateWebUnit(param)
    }


    const goback = () =>{
        props.history.push("/repositorypage/testcase/list")
    }


    return(
        <>
            {/*<BackCommon clickBack={goback} />*/}
            <div className={"content-box-center"}>
                <DetailCommon
                    detailInfo={detailInfo}
                    updateTitle={updateTitle}
                />
                <div style={{"width":"600px"}}>
                <Form
                    form={form}
                    preserve={false}
                    {...layout}
                >
                    <Form.Item
                        label="操作方法"
                        name="actionType"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="参数"
                        name="parameter"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="定位器"
                        name="location"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="定位器的值"
                        name="locationValue"
                    >
                        <Input />
                    </Form.Item>


                    {/*<Form.Item*/}
                    {/*    label="期望"*/}
                    {/*    name="expectedResult"*/}
                    {/*>*/}
                    {/*    <Input />*/}
                    {/*</Form.Item>*/}
                    <Form.Item
                        label="描述"
                        name="desc"
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </div>
            </div>
        </>
    )
}

export default inject('webUnitStore')(observer(WebUnitDetail));
