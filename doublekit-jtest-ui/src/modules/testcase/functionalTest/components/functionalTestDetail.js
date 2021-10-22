/**
 * @description：
 * @date: 2021-09-02 13:08
 */
import React, {useEffect, useState} from "react";
import {Form, Divider, Input, Breadcrumb, Select} from "antd";
import {inject, observer} from "mobx-react";
import FunctionalTestStep from "./functionalTestStep";
import BindModules from "./bindModules";
import './functionalTest.scss'

const { Option } = Select;
const { TextArea } = Input;
const layout = {
    labelCol: {span: 2},
    wrapperCol: {span: 16},
};

const FunctionalTestDetail = (props) => {
    const {testcaseStore,testcaseFunctionalStore} = props;
    const {findTestcase,updateTestcase} = testcaseStore;
    const {findTestCaseFunctionalList,createTestCaseFunctional,updateTestCaseFunctional} = testcaseFunctionalStore;
    const [form] =  Form.useForm();
    const [editTitle,setEditTitle] = useState();
    const [updataValue,setUpdataValue] = useState();
    const [category,setCategory] = useState()
    const [preDesc,setPreDesc] = useState('');
    const [preId,setPreId] = useState('')
    const testcaseId = localStorage.getItem('testcaseId');


    useEffect(()=> {
        findTestcase(testcaseId).then(res=>{
            setUpdataValue(res);
            setEditTitle(res.name);
            setCategory(res.category)
            form.setFieldsValue({
                name: res.name,
                grade:res.grade,
                user:res.user,
                desc:res.desc,
                status:res.status
            })
        })
    },[testcaseId])

    useEffect(()=> {
        findTestCaseFunctionalList(testcaseId).then(res=>{
            const data = res[0]
            setPreDesc(data)
            setPreId(data.id)
            if(res&&res.length>0){
                form.setFieldsValue({
                    preDesc:data.preExplain
                })
            }

        })
    },[testcaseId])

    //名称编辑
    const updateTitle = (value) =>{
        const param = {
            id:updataValue.id,
            name:value.target.innerText,
            grade:updataValue.grade,
            user:updataValue.user,
            desc:updataValue.desc,
            status:updataValue.status,
            repository:{
                id:updataValue.repository.id
            }
        }
        updateTestcase(param)
    }

    //明细编辑
    const updataDetail = async () =>{
        const values = await form.getFieldsValue()
        values.name=updataValue.name
        values.id=testcaseId;
        values.repository={id:updataValue.repository.id}
        updateTestcase(values)
    }

    //前置编辑
    const preDescEdit = (data) =>{
        debugger
        const values = {
            preExplain:data,
            testCase:{id:testcaseId}
        }
        if(preDesc){
            values.id=preId
            updateTestCaseFunctional(values)
        }else {
            createTestCaseFunctional(values)
        }
    }

    const toTestcase = () => props.history.push('/repositorypage/Testcase')

    return(
        <>
            <div className='breadcrumb'>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item ><a onClick={toTestcase}>测试用例</a></Breadcrumb.Item>
                    <Breadcrumb.Item>功能测试详情</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className={'testcase-detail'}>
                {/*<div className="web-form-header">*/}
                {/*    <div*/}
                {/*        className='teststep-title'*/}
                {/*        contentEditable={true}*/}
                {/*        suppressContentEditableWarning  //去掉contentEditable 提示的页面警告*/}
                {/*        onBlur={updateTitle}*/}
                {/*    >*/}
                {/*        {editTitle}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <Form
                    className={'form-edit1'}
                    layout="inline"
                    form={form}

                >
                    <Form.Item name="name" className={'title-name'}>
                        <Input onBlur={updataDetail} bordered={false}/>
                    </Form.Item>
                    <Form.Item label="等级" name="grade">
                        <Select onChange={updataDetail} style={{width:150}}>
                            <Option value='L1'>L1</Option>
                            <Option value='L2'>L2</Option>
                            <Option value='L3'>L3</Option>
                            <Option value='L4'>L4</Option>
                            <Option value='L5'>L5</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="执行人" name="user">
                        <Input onBlur={updataDetail} bordered={false}/>
                    </Form.Item>
                    <Form.Item label="所属模块" name="need">
                        {
                            category?category?.name:<BindModules/>
                        }
                    </Form.Item>
                </Form>
                <Form
                    form={form}
                    {...layout}
                >
                    <Form.Item label="描述" name="desc">
                        <TextArea
                            // bordered={false}
                            rows={3}
                            // value={desc}
                            onBlur={updataDetail}
                        />
                    </Form.Item>
                    <Form.Item label="前置说明" name="preDesc">
                        <TextArea
                            // bordered={false}
                            rows={3}
                            // value={preDesc}
                            onBlur={(e)=>preDescEdit(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item label="设置状态结果" name="status">
                        <Select style={{width:150}} onBlur={updataDetail}>
                            <Option value='未执行'>未执行</Option>
                            <Option value='成功'>成功</Option>
                            <Option value='失败'>失败</Option>
                            <Option value='待审核'>待审核</Option>
                            <Option value='阻塞'>阻塞</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
            <Divider  />
            <FunctionalTestStep/>
        </>
    )
}

export default inject('testcaseStore','testcaseFunctionalStore')(observer(FunctionalTestDetail));
