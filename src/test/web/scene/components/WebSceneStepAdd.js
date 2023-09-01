import React, {useState} from "react";
import {Form, Input, Select, Row, Col, Button, Space} from "antd";
import {Option} from "antd/es/mentions";
import {Axios} from "tiklab-core-ui";
import {observer} from "mobx-react";
import webSceneStepStore from "../store/webSceneStepStore";
import IconBtn from "../../../../common/iconBtn/IconBtn";

const {
    createWebSceneStep,
    updateWebSceneStep,
    findWebSceneStep,
} = webSceneStepStore

const WebSceneStepAdd = (props) =>{
    const { webSceneStepId,findList,type,setEditShow,editShow } = props;

    const [locationList, setLocationList] = useState([]);
    const [actionTypeList, setActionTypeList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
    const webSceneId = sessionStorage.getItem("webSceneId")

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();

        values.webSceneId=webSceneId;
        if(type ==="edit"){
            values.id=webSceneStepId

            if(!values.location){
                values.location="nullstring"
            }

            if(!values.locationValue){
                values.locationValue="nullstring"
            }

            if(!values.parameter){
                values.parameter="nullstring"
            }

            if(!values.actionType){
                values.actionType="nullstring"
            }

            updateWebSceneStep(values).then(()=> findList())
        }else {
            createWebSceneStep(values).then(()=> findList())

            form.resetFields();
        }

        setVisible(false);
        setEditShow(false)

    };

    // 弹框展示
    const showAdd = async () => {
        let locationRes= await Axios.post("/location/findAllLocation");
        if(locationRes.code===0){
            setLocationList(locationRes.data)
        }

        let actionTypeRes= await Axios.post("/actionType/findActionTypeList",{"type": "WEB"});
        if(actionTypeRes.code===0){
            setActionTypeList(actionTypeRes.data)
        }

        if(props.type==="edit"){
            findWebSceneStep(webSceneStepId).then(res=>{
                form.setFieldsValue({
                    name:res.name,
                    actionType:res.actionType,
                    parameter:res.parameter,
                    location: res.location,
                    locationValue:res.locationValue,
                    expectedResult:res.expectedResult,
                })
            })
        }

        setVisible(true);
    };

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
                {/*<Option>{' '}</Option>*/}
            </Select>
        )
    }

    //操作方法下拉选择框渲染
    const functionView = (data) => {
        return(
            <Select
                showSearch={true}
                allowClear={true}
                placeholder={"操作方法"}
                className={"form-select"}
            >
                {
                    data&&data.map(item=>{
                        return (
                            <Option key={item.id} value={item.name}>
                                <div>{item.name}</div>
                                <div style={{color:'#a9a9a9',fontSize:12}}>{item.description}</div>
                            </Option>
                        )
                    })
                }
            </Select>
        )
    }



    return(
        <>
            <div className={` ${visible||editShow?"web-step_add_hide":"web-step_add_show"}`}>
                <div className={`web-step_add`} onClick={showAdd}>
                    <div>  添加步骤  </div>
                </div>
            </div>

            <div className={` ${visible||editShow?"web-step_add_show":"web-step_add_hide"}`}>
                <div className={"web-step_add_form"}>
                    <Form
                        form={form}
                        preserve={false}
                        onFinish={onFinish}
                    >
                        <Row gutter={[0,10]}>
                            <Col span={12}>
                                <Form.Item name="name">
                                    <Input placeholder={"名称"} className={"form-input form-input-first"}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}></Col>
                            <Col span={6}>
                                <Form.Item name="actionType" >
                                    {
                                        functionView(actionTypeList)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={18}>
                                <Form.Item name="parameter" >
                                    <Input
                                        placeholder={"参数"}
                                        className={"form-input"}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item name="location">
                                    {
                                        locationView(locationList)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={18}>
                                <Form.Item name="locationValue" >
                                    <Input placeholder={"定位器的值"} className={"form-input"}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item >
                                    <Space>
                                        <Button
                                            className={"important-btn"}
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            创建
                                        </Button>
                                        <IconBtn
                                            className="pi-icon-btn-grey"
                                            onClick={()=>setVisible(false)}
                                            name={"取消"}
                                        />
                                    </Space>
                                </Form.Item>
                            </Col>

                        </Row>


                        {/*<Form.Item*/}
                        {/*    label="期望"*/}
                        {/*    name="expectedResult"*/}
                        {/*>*/}
                        {/*    <Input />*/}
                        {/*</Form.Item>*/}
                    </Form>
                </div>

            </div>

        </>
    )
}

export default observer(WebSceneStepAdd);