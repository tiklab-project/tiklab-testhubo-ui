/**
 * @description：定时任务添加与编辑
 * @date: 2021-08-18 18:00
 */
import React, {useState, useCallback} from 'react';
import { observer, inject } from "mobx-react";
import moment from 'moment'
import {Form, Modal, Button, Input, Checkbox, Radio, DatePicker, Select,Divider} from 'antd';
import {week,day} from "../../../common/dictionary/dictionary";

const {Option} = Select;

const layout = {
    labelCol: {span: 3,},
    wrapperCol: {span: 22,},
};


// 添加与编辑
const QuartzMasterEdit = (props) => {
    const { quartzMasterStore, quartzMasterId, environmentStore } = props;
    const {
        findQuartzMaster,
        createQuartzMaster,
        updateQuartzMaster
    } = quartzMasterStore;
    const {findEnvironmentList,environmentList} = environmentStore;

    const repositoryId = localStorage.getItem('repositoryId')

    const [form] = Form.useForm();

    const [visible, setVisible] = React.useState(false);
    const [quartzType,setQuartzType] = useState('')

    // 弹框展示
    const showModal = () => {
        if(props.name === "编辑"){
            findQuartzMaster(quartzMasterId).then((res)=>{
                form.setFieldsValue({
                    name: res.name,
                    quartzType:res.quartzType,
                    env:res.testEnvironment?res.testEnvironment.id:null,
                    week:res.weekList,
                    type: res.type,
                    period:res.period,
                    cycleIndex:res.cycleIndex,
                    dayEndTime:endTime(res.quartzTaskList),
                    endTime:endTime(res.quartzTaskList),
                    weekEndTime:endTime(res.quartzTaskList)
                })
                setActType( res.type)
                setPeriod(res.period)
                setQuartzType(res.quartzType)
            })
        }
        findEnvironmentList(repositoryId)
        setVisible(true);
    };

    const endTime = (data) => {
        let timeArr=[];
        data&&data.map(item=>{
            timeArr.push(item.executionTime)
        })
        return timeArr
    }

    //时间数组改变为对象数组
    const quartzTaskList = (data) => {
        let quartzTaskList =[];
        data.map(item=>{
            quartzTaskList.push({'executionTime':item})
        })
        return quartzTaskList
    }

    //执行类型
    const isType = (values) => {
        if(values.type===1){
            if(values.period==='week'){
                values.weekList = values.week
                values.quartzTaskList = quartzTaskList(values.weekEndTime)
            }else{
                values.quartzTaskList = quartzTaskList(values.dayEndTime)
            }
        }else{
            values.quartzTaskList = quartzTaskList(values.endTime)
        }
    }

    // 提交
    const onFinish = async () => {
        let values = await form.validateFields();
        values.repository={id:repositoryId}
        values.testEnvironment={id:values.env}
        isType(values)
        if(props.name === "添加任务" ){
            createQuartzMaster(values).then((res)=>{
                localStorage.setItem('quartzMasterId',res.data)
                props.history.push('/repositorypage/quartzTask')
            });
        }else{
            values.id=quartzMasterId;
            updateQuartzMaster(values);
        }
        setVisible(false);
    };

    //关闭弹窗
    const onCancel = () => {
        setVisible(false)
        setActType(null)
        setPeriod(null)
    };

    //根据任务类型判断是否有环境变量
    const toggleEnv = (data) => {
        if(data==='API'){
            return (
                <Form.Item
                    label="测试环境"
                    // rules={[{ required: true, }]}
                    name="env"
                >
                    <Select>
                        {
                            environmentList&&environmentList.map(item=>{
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </Form.Item>)
        }
    }

    //设置radio值
    const [actType,setActType] = useState(null)
    const [period,setPeriod] = useState(null)

    const [datePicker,setDatePicker] = useState([])

    const onOk = (e) =>{
        let dateTime = moment(e).format('YYYY-MM-DD HH:mm')
        setDatePicker([dateTime])
        console.log(dateTime)
    }

    //执行类型  0：指定时间，1：循环
    const typeView = (data) => {
        switch (data){
            case 0:
                return (
                    <Form.Item
                        label="执行时间"
                        name="endTime"
                    >
                        <Select
                            // style={{'width':300}}
                            mode='tags'
                            dropdownRender={menu => (
                                <div>
                                    {menu}
                                    <Divider style={{ margin: '4px 0' }} />
                                    <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}
                                         onMouseDown={(e)=>e.stopPropagation()}
                                    >
                                        <DatePicker
                                            format={'YYYY-MM-DD HH:mm'}
                                            showTime={{ format:'HH:mm'}}
                                            onOk={onOk}
                                        />
                                    </div>
                                </div>
                            )}
                        >
                            {
                                datePicker&&datePicker.map(item=>{
                                    return <Option value={item}>{item}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                )
            case 1:
                return (
                    <>
                        <Form.Item
                            label="执行周期"
                            name="period"
                        >
                            <Radio.Group
                                onChange={(e)=>setPeriod(e.target.value)}
                            >
                                <Radio value={'week'}>周 </Radio>
                                <Radio value={'day'}>日</Radio>
                            </Radio.Group>

                        </Form.Item>
                        {
                            weekDayView(period)
                        }
                        <Form.Item
                            label="循环次数"
                            name="cycleIndex"
                        >
                            <Input />
                        </Form.Item>
                    </>
                )
        }
    }

    //循环中执行周期 week：周，day：日
    const weekDayView = (data) => {
        switch (data){
            case 'week':
                return (
                    <>
                        <Form.Item
                            label="星期"
                            name="week"
                        >
                            <Checkbox.Group options={week}/>
                        </Form.Item>
                        <Form.Item
                            label="时间"
                            name="weekEndTime"
                        >
                            <Checkbox.Group options={day}/>
                        </Form.Item>
                    </>
                )
            case 'day':
                return (
                    <Form.Item
                        label="时间"
                        name="dayEndTime"
                    >
                        <Checkbox.Group options={day}/>
                    </Form.Item>
                )
        }
    }


    return (
        <>
            {
                props.btn === 'btn'
                    ? <Button className="important-btn" onClick={showModal}>{props.name}</Button>
                    : <a onClick={showModal}>{props.name}</a>
            }
            <Modal
                destroyOnClose={true}
                title={props.name}
                visible={visible}
                onCancel={onCancel}
                onOk={onFinish}
                okText="提交"
                cancelText="取消"
                centered
                width={700}
            >

                <Form
                    form={form}
                    onFinish={onFinish}
                    preserve={false}
                    {...layout}
                >
                    <Form.Item
                        label="名称"
                        // rules={[{ required: true, }]}
                        name="name"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="任务类型"
                        // rules={[{ required: true, }]}
                        name="quartzType"
                    >
                        <Select
                            onChange={(e)=>setQuartzType(e)}
                        >
                            <Option value='API'>接口</Option>
                            <Option value='WEB'>WEB</Option>
                            <Option value='APP'>APP</Option>
                        </Select>
                    </Form.Item>
                    {
                        toggleEnv(quartzType)
                    }

                    <Form.Item
                        label="执行类型"
                        name="type"
                    >
                        <Radio.Group
                            onChange={(e)=>setActType(e.target.value)}
                        >
                            <Radio value={1}>循环 </Radio>
                            <Radio value={0}>指定时间</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {
                        typeView(actType)
                    }

                </Form>
            </Modal>
        </>
    );
};

export default inject('quartzMasterStore','environmentStore')(observer(QuartzMasterEdit));
