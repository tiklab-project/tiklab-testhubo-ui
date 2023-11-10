import React, {useState} from "react";
import IconBtn from "../../../common/iconBtn/IconBtn";
import {Button, Col, Form, Input, Row, Select, Space} from "antd";
import {Axios} from "tiklab-core-ui";
import {observer} from "mobx-react";
import stepAssertCommonStore from "../store/StepAssertCommonStore";
import AssertList from "./AssertList";
import "./stepAssertStyle.scss"


const {Option} = Select

const StepAssertCommon = (props) =>{
    const {stepId,type} = props
    const {
        findStepAssertCommonList,
        findStepAssertCommon,
        createStepAssertCommon,
        updateStepAssertCommon,
        assertList
    } = stepAssertCommonStore;

    const [visible, setVisible] = useState(false);
    const [assertType, setAssertType] = useState("variable");
    const [locationList, setLocationList] = useState([]);
    const [elementType, setElementType] = useState(1);
    const [form] = Form.useForm();


    const addAssert = async () =>{
        let locationRes= await Axios.post("/location/findAllLocation");
        if(locationRes.code===0){
            setLocationList(locationRes.data)
        }
        if(type==="edit"){
            let assertInfo = await findStepAssertCommon(stepId)

            form.setFieldsValue({assertInfo})
        }

        setVisible(true);
    }


    //定位器下拉选择框渲染
    const locationView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
                placeholder={"定位器"}
            >
                {
                    data&&data.map(item=>{
                        return <Option key={item} value={item}>{item}</Option>
                    })
                }

            </Select>
        )
    }

    const onFinish = async () =>{
        let values = await  form.getFieldsValue();
        let assertParam = {
            stepId:stepId,
            type:values.type,
        }

        if(type==="edit"){
            let params;
            if(values.type==="variable"){
                params={
                    ...assertParam,
                    stepId:stepId,
                    variableAssert:{
                        variable:values.variable,
                        compare:values.compare,
                        expect:values.expect
                    }
                }
            }else {
                params={
                    ...assertParam,
                    stepId:stepId,
                    elementAssert:{
                        location:values.location,
                        locationValue:values.locationValue,
                        elementType:values.elementType,
                        expect:values.expect
                    }
                }
            }
            await updateStepAssertCommon(params)
        }else {
            let params;
            if(values.type==="variable"){
                params={
                    ...assertParam,
                    variableAssert:{
                        variable:values.variable,
                        compare:values.compare,
                        expect:values.expect
                    }
                }
            }else {
                params={
                    ...assertParam,
                    elementAssert:{
                        location:values.location,
                        locationValue:values.locationValue,
                        elementType:values.elementType,
                        expect:values.expect
                    }
                }
            }

            await createStepAssertCommon(params)
        }

        await findStepAssertCommonList({stepId:stepId})

        setVisible(false);
    }


    return(
        <div className={"table-list-box"}>
            <div className={`${visible?"teston-hide":"teston-show"}`}>
                <div style={{padding:"10px 0"}}>
                    <IconBtn
                        className="pi-icon-btn-grey"
                        name={"添加断言"}
                        onClick={addAssert}
                    />

                </div>

                <AssertList assertList={assertList}/>


            </div>
            <div className={`case-bind_box ${visible?"teston-show":"teston-hide"}`}>

                <Form
                    form={form}
                    // onFinish={onFinish}
                    preserve={false}
                    layout={"vertical"}
                    initialValues={{
                        type:"variable",
                        compare: 1 ,
                        elementType:1
                    }}
                >
                    <Row gutter={[0]}>
                        <Col span={24}>
                            <Form.Item  name="type" label="断言类型" labelCol={{span: 4}}>
                                <Select onSelect={(type)=>setAssertType(type)}>
                                    <Option value={"variable"}>值断言</Option>
                                    <Option value={"element"}>元素断言</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        {
                            assertType==="variable"
                                ?<>
                                    <Col span={10}>
                                        <Form.Item  name="variable" >
                                            <Input
                                                placeholder={"输入变量值"}
                                                className={"form-input"}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Form.Item  name="compare">
                                            <Select>
                                                <Option value={1}>等于</Option>
                                                <Option value={2}>不等于</Option>
                                                <Option value={3}>小于</Option>
                                                <Option value={4}>小于等于</Option>
                                                <Option value={5}>大于</Option>
                                                <Option value={6}>大于等于</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col  span={10}>
                                        <Form.Item  name="expect">
                                            <Input
                                                placeholder={"输入期望值"}
                                                className={"form-input"}
                                            />
                                        </Form.Item>
                                    </Col>
                                </>
                                :<>
                                    <Col  span={8}>
                                        <Form.Item  name="location" label="定位器" >
                                            {
                                                locationView(locationList)
                                            }
                                        </Form.Item>
                                    </Col>
                                    <Col  span={16}>
                                        <Form.Item  name="locationValue" label=" " >
                                            <Input placeholder={"参数"} className={"form-input"}/>
                                        </Form.Item>
                                    </Col>
                                    <Col  span={8}>
                                        <Form.Item  name="elementType" label="元素类型" >
                                            <Select onSelect={(type)=>setElementType(type)}>
                                                <Option value={1}>期望值</Option>
                                                <Option value={2}>元素存在</Option>
                                                <Option value={3}>元素不存在</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    {
                                        elementType===1
                                            ? <Col  span={16}>
                                                <Form.Item  name="expect" label=" " >
                                                    <Input
                                                        placeholder={"期望值"}
                                                        className={"form-input"}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            :null
                                    }

                                </>
                        }

                        <Col span={24}>
                            <Space>
                                <Button
                                    className={"important-btn"}
                                    onClick={onFinish}
                                >
                                    保存
                                </Button>
                                <IconBtn
                                    className="pi-icon-btn-grey"
                                    name={"取消"}
                                    onClick={()=>setVisible(false)}
                                />
                            </Space>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    )
}

export default observer(StepAssertCommon);