import React, { useState} from "react";
import {Col, Drawer, Form, Radio, Row} from "antd";
import {observer} from "mobx-react";
import {messageFn} from "../../../../common/messageCommon/MessageCommon";
import IconCommon from "../../../../common/IconCommon";
import ifJudgmentStore from "../store/IfJudgmentStore";
import IfVariableTable from "./IfVariableTable";


const IfJudgmentDrawer = ({name,stepId,findStepList}) =>{
    const {updateIfJudgment,findIfJudgment} = ifJudgmentStore

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();

    const [stepInfo, setStepInfo] = useState();

    const showDrawer = async () => {
        let info = await findIfJudgment(stepId)
        form.setFieldsValue(info)
        setStepInfo(info)

        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const onChange = (e) => {
        let param = {
            id:stepInfo?.id,
            caseId:stepInfo?.caseId,
            relation:e.target.value
        }

        updateIfJudgment(param).then((res)=>{
            if(res.code===0){
                findStepList();
                messageFn("success","保存成功")
            }else {
                messageFn("error","保存失败")
            }
        })
    };


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
                width={600}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <div className={"case-drawer-box"}>
                    <div className={"breadcrumb-title_between"} style={{borderBottom: "1px solid var(--pi-border-color)"}}>
                        <div className={"breadcrumb-left"}>

                            <div className={"case-header_title"}>if条件判断</div>
                        </div>
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu2"}
                            onClick={()=>setOpen(false)}
                        />
                    </div>
                    <div className={"case-step-info"}>
                        <Form
                            form={form}
                            preserve={false}
                            layout={"horizontal"}
                        >
                            <Row gutter={[0]}>
                                <Col span={12}>
                                    <Form.Item  name="relation" label="条件关系" labelCol={{span: 5}}>
                                        <Radio.Group onChange={onChange}>
                                            <Radio value={"and"}>AND</Radio>
                                            <Radio value={"or"}>OR</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <IfVariableTable stepId={stepId} findStepList={findStepList}/>
                    </div>
                </div>

            </Drawer>
        </>
    )
}


export default observer(IfJudgmentDrawer);