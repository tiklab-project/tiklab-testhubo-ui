/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../common/backCommon";
import {Form, Input} from "antd";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

const WebUnitDetail = (props) => {
    const {webUnitStore} = props;
    const {findWebUnit,updateWebUnit} = webUnitStore;

    const [allValue,setAllValue] = useState();

    const webUnitId = sessionStorage.getItem('webUnitId');
    const [form] = Form.useForm();

    useEffect(()=> {
        findWebUnit(webUnitId).then(res=>{
            setAllValue(res);

            form.setFieldsValue({
                actionType:res.actionType,
                parameter:res.parameter,
                location: res.location,
                locationValue:res.locationValue,
                expectedResult:res.expectedResult,
            })
        })
    },[webUnitId])



    const goback = () =>{
        props.history.push("/repositorypage/webtest")
    }


    return(
        <>
            <BackCommon clickBack={goback} />
            <div className={'testcase-detail'}  style={{"borderBottom":"1px solid #e4e4e4","margin":"0 0 10px 0"}} >
                <div className="apidetail-header-btn">
                    <div className={"method-name"}>{allValue?.testCase?.name}</div>
                    
                </div>
                <div className={"method"}>
                   
                    <div className={"method-people-info"}>
                        <span className={"people-item "}>分组: {allValue?.testCase?.category?.name}</span>
                        <span className={"people-item "}>创建人: {allValue?.testCase?.createUser?.name}</span>
                        <span className={"people-item "}>更新者: {allValue?.testCase?.updateUser?.name}</span>
                        <span className={"people-item "}>更新时间: {allValue?.testCase?.updateTime}</span>
                    </div>
                </div>
            </div>
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
        </>
    )
}

export default inject('webUnitStore')(observer(WebUnitDetail));
