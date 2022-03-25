import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Breadcrumb, Button, Col, Form, Input, Row} from "antd";
import ToggleItemEdit from "../../../common/toggleItemEdit";
import PerformanceReport from "./performanceReport";

const PerformanceDetail = (props) => {
    const {performanceStore} = props;
    const {findPerformance,updatePerformance,performanceInfo} = performanceStore;
    const [form] = Form.useForm();
    const [executeDate,setExecuteData] = useState();
    const performanceId = localStorage.getItem('performanceId')

    useEffect(()=>{
        findPerformance(performanceId).then((res)=>{
            setExecuteData(res)
            form.setFieldsValue({
                name: res.name,
                testType:res.testType,
                user:res.user?.name,
                threadCount:res.threadCount,
                executeCount: res.executeCount,
                testcase: res.testCase.name,
            })
        })
    },[performanceId]);

    //返回
    const goBack = () => {
        props.history.push('/repositorypage/performance');
    }

    //前往历史
    const toHistory = () => {
        props.history.push('/repositorypage/performancehistory');
    }

    const itemDataObj =[
        {
            value:performanceInfo?.threadCount,
            name:'threadCount',
            title:'线程数'
        },
        {
            value:performanceInfo?.executeCount,
            name:'executeCount',
            title:'执行次数'
        },
    ]

    const itemView = (data) =>{
        return data&&data.map(item=>{
            return <ToggleItemEdit
                editValue={item.value}
                itemName={item.name}
                updataFn={updatePerformance}
                allData={performanceInfo}
                label={item.title}
                showUI={'number'}
            />
        })
    }

    return(
        <div className={'performance-box'}>
            <div className='header-flexbox'>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item ><a onClick={goBack}>性能测试</a></Breadcrumb.Item>
                    <Breadcrumb.Item>{performanceInfo?.testType}</Breadcrumb.Item>
                </Breadcrumb>
                <Button className="important-btn" onClick={goBack}>返回</Button>
            </div>
            <Form className="form-info" form={form} layout="inline">
                <div className="form-header-title-btn">
                    <ToggleItemEdit
                        editValue={performanceInfo?.name}
                        itemName={'name'}
                        updataFn={updatePerformance}
                        allData={performanceInfo}
                        showUI={'input'}
                    />
                    <div>
                        <a onClick={toHistory}>测试历史</a>
                        <PerformanceReport name={'执行测试'} performanceId={performanceId} executeDate={performanceInfo}/>
                    </div>
                </div>
                <div className={'form-default-detail'}>
                    <Form.Item  label="类型" name="testType" >
                        <Input disabled bordered={false}/>
                    </Form.Item>
                    <Form.Item label="创建人" name="user">
                        <Input disabled  bordered={false}/>
                    </Form.Item>
                </div>
                <div className={'form-edit-detail'}>
                    {itemView(itemDataObj)}
                    <ToggleItemEdit
                        editValue={performanceInfo?.testCase?.name}
                        itemName={'threadCount'}
                        updataFn={updatePerformance}
                        allData={performanceInfo}
                        label={'关联用例'}
                        showUI={'input'}
                    />
                </div>
            </Form>
        </div>
    )
}

export default inject('performanceStore')(observer(PerformanceDetail));