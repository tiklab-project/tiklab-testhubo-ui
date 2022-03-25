import React,{useEffect,useState} from 'react';
import {Input, Tabs, Table, Space, Popconfirm, Button, Form, Divider, Breadcrumb} from 'antd';
import { inject,observer } from 'mobx-react';
import StepEdit from '../../unitcase/components/apiUnitcaseEdit';
import EnvSelect from "../../../integration/environment/components/envSelect";
import TestReportApi from "../../unitcase/components/testReportApi";


const StepList = (props) => {
    const {testcaseStore,stepStore} = props;
    const {findTestcase,updateTestcase} = testcaseStore;
    const {
        findStepPage,
        deleteStep,
        stepList,
        totalRecord,
        getSelectItem
    } = stepStore;

    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            align:"center",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage('stepId',record.id)}>{text}</a>
            )
        },
        {
            title:`类型`,
            dataIndex: "stepType",
            key: "stepType",
            align:"center",
        },
        {
            title: `地址`,
            dataIndex: "path",
            key: "path",
            align:"center",
        },
        {
            title: `描述`,
            dataIndex: "desc",
            key: "desc",
            align:"center",
        },
        {
            title: `操作`,
            key: "action",
            align:"center",
            render: (text, record) => (
            <Space size="middle">
                {/*<a onClick={()=>onPerformCase([record])}>测试</a>*/}
                <StepEdit name="编辑"  stepId={record.id} />
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>deleteStep(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <a href="#" style={{color:'red'}}>删除</a>
                </Popconfirm>
            </Space>
            ),
        },
    ]

    const [baseInfo,setBaseInfo]=useState();
    const [editTitle,setEditTitle] = useState()
    const [form] = Form.useForm()

    const testcaseId = localStorage.getItem('testcaseId');
    useEffect(()=>{
        findTestcase(testcaseId).then(res=>{
            setBaseInfo(res);
            setEditTitle(res.name)
            form.setFieldsValue({
                type:res.type,
                person:res.user.name,
                createTime:res.createTime
            })
        })
    },[])

    useEffect(()=> {
        findStepPage(testcaseId);
    },[testcaseId])

    const goBack = () => {
        props.history.push('/repositorypage/testcase');
    }

    // 保存id到缓存
    const setLocalStorage = (stepId,id) => {
        localStorage.setItem(stepId,id);
        props.history.push('/repositorypage/steppage');
    }

    //
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            getSelectItem(selectedRows)
        },
    };

    const updateTitle = (value) =>{
        const param = {
            name:value.target.innerText,
            type:baseInfo.type,
            desc:baseInfo.desc,
            id:baseInfo.id,
            repository:{
                id:baseInfo.repository.id
            }
        }
        updateTestcase(param)
    }

    return(
        <>
        <div className='header-flexbox'>
            <Breadcrumb separator=">" >
                <Breadcrumb.Item ><a onClick={goBack}>测试用例 </a></Breadcrumb.Item>
                <Breadcrumb.Item>接口</Breadcrumb.Item>
            </Breadcrumb>
            <EnvSelect belong={'testcaseEnv'}/>
        </div>
        <div className={'testcase-webUI-form'}>
            <div className="web-form-header">
                <div
                    className='teststep-title'
                    contentEditable={true}
                    suppressContentEditableWarning  //去掉contentEditable 提示的页面警告
                    onBlur={updateTitle}
                >
                    {editTitle}
                </div>
                <div>
                    <TestReportApi testcaseId={testcaseId} name={'测试历史'} />
                    <TestReportApi testcaseId={testcaseId} name={'执行测试'} />
                </div>

            </div>
            <Form
                className={'web-form2'}
                layout="inline"
                form={form}
            >
                <Form.Item label="类型" name="type">
                    <Input disabled bordered={false}/>
                </Form.Item>
                <Form.Item label="创建人" name="person">
                    <Input disabled bordered={false}/>
                </Form.Item>
                <Form.Item label="创建时间" name="createTime">
                    <Input disabled bordered={false}/>
                </Form.Item>
            </Form>
        </div>
        <Divider  />
        <div className={'test-title'}>
            <div>测试步骤</div>
        </div>
        <div >
            <div className='flex-right'>
                <StepEdit  name='添加步骤' btn={'btn'}/>
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={stepList}
                rowKey={record => record.id}
                rowSelection={{...rowSelection}}
            />
        </div>
    </>
    )


}

export default inject('testcaseStore','stepStore','performCaseStore')(observer(StepList));
