/**
 * @description：
 * @date: 2021-08-19 17:01
 */
import React, {useEffect, useState} from "react";
import {Button, Form, Input} from "antd";
import {inject, observer} from "mobx-react";
import QuartzTestcase from "./quartzTestcase";

const QuartzTask = (props) => {
    const {quartzMasterStore} = props;
    const {findQuartzMaster} = quartzMasterStore;
    const [form] = Form.useForm();
    const [type,setype] = useState();
    const [period,setPeriod] = useState();
    const [quartzType,setQuartzType] = useState()
    const quartzMasterId = localStorage.getItem('quartzMasterId');

    useEffect(()=>{
        findQuartzMaster(quartzMasterId).then((res)=>{
            setype(res.type);
            setPeriod(res.period)
            setQuartzType(res.quartzType)
            form.setFieldsValue({
                name: res.name,
                quartzType:res.quartzType,
                type:res.type===0?'指定时间':'循环',
                period:res.period==="week"?'星期':'日',
                cycleIndex:res.cycleIndex,
                env:res.testEnvironment?res.testEnvironment.name:null,
                endtime:res.quartzTaskList?res.quartzTaskList.map(item=>item.executionTime):''

            })
        })
    },[quartzMasterId])

    //返回
    const goBack = () => props.history.push('/repositorypage/quartzMaster');

    return(
        <>
            <div className='header-flexbox'>
                <Button className="important-btn" onClick={goBack}>返回</Button>
            </div>
            <div className="title ex-title">基本信息</div>
            <Form className="apx-form form-info" form={form}>
                <Form.Item label='任务名称' name='name' >
                    <Input  disabled bordered={false}/>
                </Form.Item>
                <Form.Item label='任务类型' name='quartzType' >
                    <Input  disabled bordered={false}/>
                </Form.Item>
                {
                    quartzType==='API'
                        ?<Form.Item label='测试环境' name='env' >
                                <Input  disabled bordered={false}/>
                         </Form.Item>
                        :''
                }

                <Form.Item label='执行类型' name='type' >
                    <Input  disabled bordered={false}/>
                </Form.Item>
                {
                    type===0 ?<>
                            <Form.Item label='执行时间' name='endtime' >
                                <Input  disabled bordered={false}/>
                            </Form.Item>

                        </>
                        :
                        <>
                            <Form.Item label='执行周期' name='period' >
                                <Input  disabled bordered={false}/>
                            </Form.Item>
                            {
                                period==='week'?
                                    <>
                                        <Form.Item label='星期' name='week' >
                                            <Input  disabled bordered={false}/>
                                        </Form.Item>
                                        <Form.Item label='执行时间' name='endtime' >
                                            <Input  disabled bordered={false}/>
                                        </Form.Item>
                                    </>
                                    :
                                    <>
                                        <Form.Item label='执行时间' name='endtime' >
                                            <Input  disabled bordered={false}/>
                                        </Form.Item>
                                    </>
                            }
                        </>
                }
            </Form>
            <div className="title ex-title">用例添加</div>
            <QuartzTestcase quartzType={quartzType}/>
        </>
    )
}

export default inject('quartzMasterStore')(observer(QuartzTask));
