/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Breadcrumb, Form, Input} from "antd";
import DetailCommon from "../../../common/detailCommon";
import LeftRightBox from "../../../common/leftRightBox";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

const AppUnitDetail = (props) => {
    const {appUnitStore} = props;
    const {findAppUnit,updateAppUnit} = appUnitStore;

    const [detailInfo,setDetailInfo]=useState();

    const appUnitId = sessionStorage.getItem('appUnitId');
    const [form] = Form.useForm();

    useEffect(()=> {
        findAppUnit(appUnitId).then(res=>{
            setDetailInfo(res);

            form.setFieldsValue({
                actionType:res.actionType,
                parameter:res.parameter,
                location: res.location,
                locationValue:res.locationValue,
                expectedResult:res.expectedResult,
            })
        })
    },[appUnitId])

    //更新名称
    const updateTitle = (value) =>{
        const param = {
            id:detailInfo.id,
            testCase: {
                ...detailInfo.testCase,
                name:value,
            }
        }
        updateAppUnit(param)
    }


    const goBack = () =>{
        props.history.push("/repository/testcase")
    }


    return(
        <div className={"content-box-center"}>
            <Breadcrumb className={"breadcrumb-box"}>
                <Breadcrumb.Item onClick={goBack} className={"first-item"}>用例列表</Breadcrumb.Item>
                <Breadcrumb.Item>单元详情</Breadcrumb.Item>
            </Breadcrumb>

            <DetailCommon
                detailInfo={detailInfo}
                updateTitle={updateTitle}
            />
            <LeftRightBox
                left={<div style={{fontWeight:"bold"}}>用例录入</div>}
            />
            <div className={"case-unit-step-box"}>
                <Form
                    form={form}
                    preserve={false}
                    {...layout}
                    labelAlign={"left"}
                >
                    <Form.Item
                        label="操作方法"
                        name="actionType"
                    >
                        <Input bordered={false}/>
                    </Form.Item>
                    <Form.Item
                        label="参数"
                        name="parameter"
                    >
                        <Input bordered={false}/>
                    </Form.Item>
                    <Form.Item
                        label="定位器"
                        name="location"
                    >
                        <Input bordered={false}/>
                    </Form.Item>
                    <Form.Item
                        label="定位器的值"
                        name="locationValue"
                    >
                        <Input bordered={false}/>
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
                        <Input bordered={false}/>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
}

export default inject('appUnitStore')(observer(AppUnitDetail));
