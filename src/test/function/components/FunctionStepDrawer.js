import React, {useEffect, useState} from "react";
import {Button, Drawer, Form, Space,Input} from "antd";
import {observer} from "mobx-react";
import IconBtn from "../../../common/iconBtn/IconBtn";
import funcUnitStepStore from "../store/funcUnitStepStore";
import IconCommon from "../../../common/IconCommon";
import {messageFn} from "../../../common/messageCommon/MessageCommon";

const {TextArea} = Input

const tailLayout = {
    wrapperCol: {
        offset: 0,
        span: 24,
    },
};

const FunctionStepDrawer = ({name,stepId,findList}) =>{
    const {updateFuncUnitStep,findFuncUnitStep} = funcUnitStepStore;
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const showDrawer = async () => {
        let info = await findFuncUnitStep(stepId)
        form.setFieldsValue(info)

        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const save = async () =>{
        let values =  await form.validateFields();
        values.id=stepId
        updateFuncUnitStep(values).then((res)=>{
            if(res.code===0){
                findList();
                messageFn("success","保存成功")
            }else {
                messageFn("error","保存失败")
            }
        })

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
                width={700}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <div style={{padding:"0 10px"}}>
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

                    <div className={"case-detail_right_box"} style={{ padding:" 10px 0"}}>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={save}
                            {...tailLayout}
                        >
                            <Form.Item label="步骤描述" name="described">
                                <TextArea
                                    placeholder="步骤描述"
                                    autoSize={{minRows:2,maxRows:4}}
                                />
                            </Form.Item>
                            <Form.Item  label="预期结果"  name="expect">
                                <TextArea
                                    placeholder="预期结果"
                                    autoSize={{minRows:2,maxRows:4}}
                                />
                            </Form.Item>
                            <Form.Item  label="实际结果" name="actual">
                                <TextArea
                                    placeholder="实际结果"
                                    autoSize={{minRows:2,maxRows:4}}
                                />
                            </Form.Item>
                            <div className={"case-save-cancel-btn"}>
                                <Form.Item>
                                    <Space>
                                        <Button
                                            className={"important-btn"}
                                            type="primary"
                                            htmlType="submit"
                                        >
                                            保存
                                        </Button>
                                        <IconBtn
                                            className="pi-icon-btn-grey"
                                            onClick={onClose}
                                            name={"取消"}
                                        />
                                    </Space>
                                </Form.Item>
                            </div>

                        </Form>
                    </div>
                </div>

            </Drawer>
        </>
    )
}


export default observer(FunctionStepDrawer);