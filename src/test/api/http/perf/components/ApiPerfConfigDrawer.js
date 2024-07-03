import React, {useEffect, useState} from "react";
import {InputNumber, Radio, Form, Popconfirm, Drawer, Tooltip} from "antd";
import {observer} from "mobx-react";
import {useHistory} from "react-router";
import apiPerfStepStore from "../store/apiPerfStepStore";
import IconCommon from "../../../../../common/IconCommon";
import CaseBread from "../../../../../common/CaseBread";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};

//压力测试配置
const ApiPerfConfigDrawer = (props) =>{
    const {apiPerfStepId,apiPerfId} = props;
    const {findApiPerfStep,updateApiPerfStep,findApiPerfStepList} = apiPerfStepStore;

    const [form] = Form.useForm();
    const [exeMode, setExeMode] = useState();
    let history = useHistory()
    const [open, setOpen] = useState(false);


    useEffect(() => {
        if (open) {
            findApiPerfStep(apiPerfStepId).then(res => {
                form.setFieldsValue({
                    threadCount: res.threadCount,
                    executeType: res.executeType,
                    executeCount: res.executeCount
                });
                setExeMode(res.executeType);

            });
        }
    }, [open, apiPerfStepId]);

    const handleUpdate = async (field, value) => {
        if(field === "executeType"){
            setExeMode(value)
        }

        const param = {
            id: apiPerfStepId,
            [field]: value
        };
        await updateApiPerfStep(param);
        await findApiPerfStepList(apiPerfId)
    };

    const toAgentPage = () => {
        history.push("/setting/agent");
    };

    const showDrawer = () => setOpen(true);
    const onClose = () => setOpen(false);

    return(
        <>
            <Tooltip title="压力配置">
                <span>
                    <IconCommon
                        className={"icon-s edit-icon"}
                        icon={"setting"}
                        onClick={showDrawer}
                    />
                </span>
            </Tooltip>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                width={500}
                destroyOnClose={true}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                closable={false}
            >
                <div style={{borderBottom:"1px solid #e4e4e4"}}>
                    <CaseBread
                        breadItem={["压力配置"]}
                        icon={"setting"}
                    />
                </div>

                <div style={{margin:"20px"}}>
                    <Form
                        form={form}
                        preserve={false}
                        {...layout}
                        labelAlign={"left"}
                    >
                        <Form.Item label="并发数" name="threadCount">
                            <InputNumber
                                min={1}
                                max={1000}
                                onChange={value => handleUpdate('threadCount', value)}
                            />
                        </Form.Item>
                        <Form.Item label="执行方式" name="executeType">
                            <Radio.Group
                                onChange={e => handleUpdate('executeType', e.target.value)}
                                value={exeMode}
                            >
                                <Radio value={1}>次数</Radio>
                                {/*<Radio value={2}>时间</Radio>*/}
                            </Radio.Group>
                        </Form.Item>
                        {
                            exeMode===1
                                &&<Form.Item label="执行次数" name="executeCount">
                                <InputNumber
                                    min={1}
                                    max={100000}
                                    onChange={value => handleUpdate('executeCount', value)}
                                />
                            </Form.Item>
                        }

                        <Form.Item
                            label="节点"
                            name="executeCount"
                        >
                            <Popconfirm
                                title="确定离开？"
                                onConfirm={toAgentPage}
                                okText='确定'
                                cancelText='取消'
                            >
                                <div style={{
                                    width: "140px",
                                    color:"#0078d6",
                                    cursor:"pointer"
                                }}>前往Agent管理页管理</div>
                            </Popconfirm>

                        </Form.Item>

                    </Form>
                </div>
            </Drawer>
        </>

    )
}

export default observer(ApiPerfConfigDrawer);