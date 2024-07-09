import React, {useEffect, useState} from "react";
import {InputNumber, Radio, Form, Drawer, Tooltip, Select} from "antd";
import {observer} from "mobx-react";
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
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            findApiPerfStepFn(apiPerfStepId)
        }
    }, [open, apiPerfStepId]);


    const findApiPerfStepFn=(id)=>{
        findApiPerfStep(id).then(res => {
            form.setFieldsValue({
                threadCount: res.threadCount,
                executeType: res.executeType,
                executeCount: res.executeCount,
                timeType:res.timeType,
                timeCount:res.timeCount

            });
            setExeMode(res.executeType);
        });
    }

    const handleUpdate = async (field, value) => {
        let param = {
            id: apiPerfStepId,
            [field]: value
        };

        if(field === "executeType"){
            setExeMode(value)

            if(value===2){
                param={
                    ...param,
                    timeType:"second",
                    timeCount:1
                }
            }
        }

        if(field === "timeType"){
            param={
                ...param,
                timeCount:1
            }
        }

        await updateApiPerfStep(param);
        await findApiPerfStepList(apiPerfId)
        await findApiPerfStepFn(apiPerfStepId)
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
                                buttonStyle="solid"
                            >
                                <Radio.Button value={1}>次数</Radio.Button>
                                <Radio.Button value={2}>时间</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                        {
                            exeMode===1
                                ?<Form.Item label="执行次数" name="executeCount">
                                    <InputNumber
                                        min={1}
                                        max={100000}
                                        onChange={value => handleUpdate('executeCount', value)}
                                    />
                                </Form.Item>
                                :<>
                                    <Form.Item label="时间单位" name="timeType">
                                        <Radio.Group
                                            onChange={e => handleUpdate('timeType', e.target.value)}
                                            // value={exeMode}
                                            buttonStyle="solid"
                                        >
                                            <Radio.Button value={"hour"}>时</Radio.Button>
                                            <Radio.Button value={"minute"}>分</Radio.Button>
                                            <Radio.Button value={"second"}>秒</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                    <Form.Item label="时间数" name="timeCount">
                                        <InputNumber
                                            min={1}
                                            max={10000}
                                            onChange={value => handleUpdate('timeCount', value)}
                                        />
                                    </Form.Item>
                                </>
                        }
                    </Form>
                </div>
            </Drawer>
        </>

    )
}

export default observer(ApiPerfConfigDrawer);