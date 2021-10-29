import React, { Fragment, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import StepEdit from './stepEdit';
import { Form, Button, Input, Breadcrumb } from 'antd';
import Request from './request';
import Response from './response';
import './step.scss'


const StepDetail = (props) => {
    const { stepStore } = props;

    const { findStep,deleteStep } = stepStore;

    const [form] = Form.useForm();

    const stepId = localStorage.getItem('stepId');

    useEffect(()=>{
        findStep(stepId).then((res)=>{
            form.setFieldsValue({
                name: res.name,
                stepType:res.stepType,
                path: res.path,
                desc: res.desc,
            })
        })
    },[stepId])

    // 删除步骤
    const handleDeleteStep = (stepId) => {
        deleteStep(stepId)
        props.history.push({pathname:'/repositorypage/apitest'})
    }

    //返回
    const  goBack = () => {
        props.history.push({pathname:'/repositorypage/apitest'})
    }

    return(
        <Fragment>
            <div className='breadcrumb'>
                <Breadcrumb separator=">"  >
                    <Breadcrumb.Item>用例步骤</Breadcrumb.Item>
                    <Breadcrumb.Item>步骤详情</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="apidetail-header-btn">
                <div className="title">基本信息</div>
                <div className={'apidetail-title-tool'}>
                    <Button onClick={goBack}>返回</Button>
                    <StepEdit name="编辑"  btn={'btn'} stepId={stepId}/>
                    <Button danger onClick={()=>handleDeleteStep(stepId)}>删除</Button>
                </div>
            </div>
            <Form className="apx-form form-info" form={form}>
                <Form.Item label="步骤名称" name="name" >
                    <Input  disabled bordered={false}/>
                </Form.Item>
                <Form.Item label="请求方式" name="stepType">
                    <Input disabled  bordered={false}/>
                </Form.Item>
                <Form.Item label="步骤路径" name="path">
                    <Input  disabled  bordered={false}/>
                </Form.Item>
                <Form.Item  label="步骤描述" name='desc'>
                    <Input disabled  bordered={false}/>
                </Form.Item>
            </Form>
            <div className="title ex-title">输入参数</div>
            <Request  />
            <div className="title ex-title">输出结果</div>
            <Response  />

        </Fragment>
    )
}

export default inject('stepStore')(observer(StepDetail));
