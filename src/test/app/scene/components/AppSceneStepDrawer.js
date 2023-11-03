import React, { useState} from "react";
import {Button, Drawer, Form, Space, Input, Row, Col, Tabs, Select} from "antd";
import {observer} from "mobx-react";
import {messageFn} from "../../../../common/messageCommon/MessageCommon";
import IconCommon from "../../../../common/IconCommon";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import ScriptEdit from "../../../common/ScriptEdit";
import {Axios} from "tiklab-core-ui";
import appSceneStepStore from "../store/appSceneStepStore";

let {Option}  =  Select;

const AppSceneStepDrawer = ({name,stepId,findList}) =>{
    const {updateAppSceneStep,findAppSceneStep} = appSceneStepStore;
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const [locationList, setLocationList] = useState([]);
    const [actionTypeList, setActionTypeList] = useState([]);
    const [preScript, setPreScript] = useState();
    const [afterScript, setAfterScript] = useState();
    const [stepInfo, setStepInfo] = useState();

    const showDrawer = async () => {
        let locationRes= await Axios.post("/location/findAllLocation");
        if(locationRes.code===0){
            setLocationList(locationRes.data)
        }

        let actionTypeRes= await Axios.post("/actionType/findActionTypeList",{"type": "WEB"});
        if(actionTypeRes.code===0){
            setActionTypeList(actionTypeRes.data)
        }

        let info = await findAppSceneStep(stepId)
        form.setFieldsValue(info)
        setStepInfo(info)

        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const save = async () =>{
        let values =  await form.validateFields();
        values.id=stepId
        values.preScript=preScript;
        values.afterScript=afterScript;

        updateAppSceneStep(values).then((res)=>{
            if(res.code===0){
                findList();
                messageFn("success","保存成功")
            }else {
                messageFn("error","保存失败")
            }
        })


    }

    const changePreScript = (value) =>{
        setPreScript(value)
    }

    const changeAfterScript = (value) =>{
        setAfterScript(value)
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
            <div
                className={"link-text"}
                onClick={showDrawer}
                style={{flexGrow: 1}}
            >
                {name}
            </div>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={"70%"}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 48px)"}}
                closable={false}
            >
                <div className={"case-drawer-box"}>
                    <div className={"breadcrumb-title_between"} style={{borderBottom: "1px solid var(--pi-border-color)"}}>
                        <div className={"breadcrumb-left"}>

                            <div className={"case-header_title"}>步骤详情</div>
                        </div>
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu2"}
                            onClick={()=>setOpen(false)}
                        />
                    </div>
                    <div className={"case-step-info"}>
                        <div className={"case-step-title"}>基本信息</div>
                        <div className={"case-step_right_box"}>
                            <Form
                                form={form}
                                layout="horizontal"
                            >
                                <Row gutter={[0]}>
                                    <Col span={12}>
                                        <Form.Item  name="name" label="名称" labelCol={{span: 4}}>
                                            <Input placeholder={"名称"} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}></Col>
                                    <Col span={7}>
                                        <Form.Item  name="actionType" label="操作方法" labelCol={{span: 7}}>
                                            {
                                                functionView(actionTypeList)
                                            }
                                        </Form.Item>
                                    </Col>
                                    <Col span={17}>
                                        <Form.Item  name="parameter" >
                                            <Input
                                                placeholder={"参数"}
                                                className={"form-input"}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col  span={7}>
                                        <Form.Item  name="location" label="定位器" labelCol={{span: 7}}>
                                            {
                                                locationView(locationList)
                                            }
                                        </Form.Item>
                                    </Col>
                                    <Col  span={17}>
                                        <Form.Item  name="locationValue" >
                                            <Input placeholder={"参数"} className={"form-input"}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                        <div className={"case-step-title"}>高级设置</div>
                        <Tabs
                            defaultActiveKey="1"
                            items={[
                                {
                                    label: `前置`,
                                    key: '1',
                                    children: <ScriptEdit changeScript={changePreScript} script={stepInfo?.preScript} />
                                },
                                {
                                    label: `后置`,
                                    key: '2',
                                    children: <ScriptEdit changeScript={changeAfterScript} script={stepInfo?.afterScript} />
                                },
                            ]}
                        />
                        <div style={{position: "absolute", bottom: "10px"}}>
                        <Space>
                            <Button
                                className={"important-btn"}
                                onClick={save}
                            >
                                保存
                            </Button>
                            <IconBtn
                                className="pi-icon-btn-grey"
                                onClick={onClose}
                                name={"取消"}
                            />
                        </Space>
                    </div>
                    </div>
                </div>

            </Drawer>
        </>
    )
}


export default observer(AppSceneStepDrawer);