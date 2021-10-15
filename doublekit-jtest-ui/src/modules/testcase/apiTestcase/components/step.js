import React,{useEffect,useState} from 'react';
import {Input, Tabs, Table, Space, Popconfirm, Button, Form, Divider, Breadcrumb} from 'antd';
import { inject,observer } from 'mobx-react';
import StepEdit from './stepEdit';
import EnvSelect from "../../../environment/components/envSelect";
import TestReportApi from "./testReportApi";


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

    const [pageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

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
        findStepPage(testcaseId,params);
    },[testcaseId,params])

    const goBack = () => {
        props.history.push('/repositorypage/testcase');
    }

    // 保存id到缓存
    const setLocalStorage = (stepId,id) => {
        localStorage.setItem(stepId,id);
        props.history.push('/repositorypage/steppage');
    }

    //分页
    const onTableChange = (pagination) => {
        setCurrentPage(pagination.current)
        const newParams = {
            ...params,
            pageParam: {
                pageSize: pageSize,
                currentPage: pagination.current
            },
        }
        setParams(newParams)
    }

    //搜索
    const onSearch = (e) => {
        setCurrentPage(1)
        let newParams = {
            pageParam: {
                pageSize: pageSize,
                currentPage: 1
            },
        }
        if (e.target.value) {
            newParams = {
                pageParam: {
                    pageSize: pageSize,
                    currentPage: 1
                },
                name:e.target.value,
            }
        }
        setParams(newParams)
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
            <div className='search-btn'>
                <Input
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <StepEdit  name='添加步骤' btn={'btn'}/>
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={stepList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}

                rowSelection={{...rowSelection}}
            />
        </div>
        {/*<Tabs defaultActiveKey="1"  type="card">*/}
        {/*    <TabPane tab="测试步骤" key="1">*/}
        {/*        <div >*/}
        {/*            <div className='search-btn'>*/}
        {/*                <Input*/}
        {/*                    placeholder={`搜索`}*/}
        {/*                    onPressEnter={onSearch}*/}
        {/*                    className='search-input'*/}
        {/*                />*/}
        {/*                <StepEdit  name='添加步骤' btn={'btn'}/>*/}
        {/*            </div>*/}

        {/*            <Table*/}
        {/*                className="tablelist"*/}
        {/*                columns={columns}*/}
        {/*                dataSource={stepList}*/}
        {/*                rowKey={record => record.id}*/}
        {/*                pagination={{*/}
        {/*                    current:currentPage,*/}
        {/*                    pageSize:pageSize,*/}
        {/*                    total:totalRecord,*/}
        {/*                }}*/}
        {/*                onChange = {(pagination) => onTableChange(pagination)}*/}

        {/*                rowSelection={{...rowSelection}}*/}
        {/*            />*/}
        {/*        </div>*/}
        {/*    </TabPane>*/}
        {/*    <TabPane tab="测试报告" key="2">*/}
        {/*        <TestReport/>*/}
        {/*    </TabPane>*/}

        {/*</Tabs>*/}
    </>
    )


}

export default inject('testcaseStore','stepStore','performCaseStore')(observer(StepList));
