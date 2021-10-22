import React, { Fragment, useEffect, useState } from 'react';
import { observer, inject } from "mobx-react";
import {Breadcrumb, Input, Table, Space, Popconfirm,Menu,Dropdown,Button} from 'antd';
import  { useTranslation } from 'react-i18next'
import TestcaseWebEdit from "./testcaseWebEdit";
import TestcaseAppEdit from "./testcaseAppEdit";
import TestcaseApiEdit from "./testcaseApiEdit";
import FunctionalTestEdit from './functionalTestEdit'
import '../../common/component/testDetailStyle.scss'

const TestcaseList = (props) => {
    const { testcaseStore } = props;
    const {
        findTestcasePage,
        deleteTestcase,
        testcaseList,
        totalRecord
    } = testcaseStore;

    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            align:"left",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage('testcaseId',record)}>{text}</a>
            )
        },
        {
            title:`类型`,
            dataIndex: "type",
            key: "type",
            align:"center",
            render: text =>text==='Functional'?'功能测试':text

        },
        {
            title: `创建人`,
            dataIndex: ['user', 'name'],
            key: "user",
            align:"center",
        },
        {
            title: `描述`,
            dataIndex: "desc",
            key: "desc",
            align:"center",
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
            <Space size="middle">
                {
                    toggleEdit(record.type,record.id)
                }
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() =>deleteTestcase(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
                </Popconfirm>
            </Space>
            ),
        },
    ]

    const [pageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [params, setParams] = useState({
        pageParam: {
            pageSize: pageSize,
            currentPage: currentPage
        }
    })

    const repositoryId = localStorage.getItem('repositoryId');
    const [tableLoading,setTableLoading] = useState(true)

    useEffect(()=> {
        findTestcasePage(repositoryId,params).then(()=>{
            setTableLoading(false)
        });
    },[repositoryId,params])


    // 保存id到缓存
    const setLocalStorage = (testcaseId,record) => {
        localStorage.setItem(testcaseId,record.id);
        let addRouterUrl = props.history.push;
        //根据类型进入相应页面
        switch (record&&record.type){
            case 'API':
                addRouterUrl('/repositorypage/apitest');
                break
            case 'WEB':
                addRouterUrl('/repositorypage/webtest');
                break
            case 'APP':
                addRouterUrl('/repositorypage/apptest');
                break
            case 'Functional':
                addRouterUrl('/repositorypage/functionaltest');
                break
        }
    }

    //根据类型渲染相应的编辑页
    const toggleEdit = (type,id) => {
        switch (type){
            case "API" :
                return <TestcaseApiEdit name="编辑"  testcaseId={id} />
            case "WEB" :
                return <TestcaseWebEdit name="编辑"  testcaseId={id} />
            case "APP" :
                return <TestcaseAppEdit name="编辑"  testcaseId={id} />
            case "Functional" :
                return <FunctionalTestEdit name="编辑"  testcaseId={id} />
        }
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

    //添加用例下项：api，web，app
    const menu = (
        <Menu>
            <Menu.Item key={'API'}>
                <TestcaseApiEdit  name='API'/>
            </Menu.Item>
            <Menu.Item key={'WEB'}>
                <TestcaseWebEdit  name='WEB'/>
            </Menu.Item>
            <Menu.Item key={'APP'}>
                <TestcaseAppEdit  name='APP'/>
            </Menu.Item>
            <Menu.Item key={'Functional'}>
                <FunctionalTestEdit  name='功能测试'/>
            </Menu.Item>
        </Menu>
    );


    return(
        <Fragment>
            <div className='breadcrumb'>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item>仓库</Breadcrumb.Item>
                    <Breadcrumb.Item>测试用例</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className='search-btn'>
                <Input
                    placeholder={`${t('tcsearch')}`}
                    onPressEnter={onSearch}
                    className='search-input'
                />

                <Dropdown overlay={menu} placement="bottomCenter">
                    <Button className="important-btn">添加用例</Button>
                </Dropdown>
            </div>
            <Table
                key={'table'}
                className="tablelist"
                columns={columns}
                dataSource={testcaseList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
                expandable={{
                    expandedRowRender: record => {
                        let testCaseApp = record.testCaseApp;
                        return <Space
                            style={{marginLeft:160}}
                            align={"center"}
                            size={"large"}
                        >
                            <span><div>平台:</div>{testCaseApp.platformName}</span>
                            <span><div>appium地址:</div>{testCaseApp.appiumSever}</span>
                            <span><div>设备名:</div>{testCaseApp.deviceName}</span>
                            <span><div>设备地址:</div>{testCaseApp.udId}</span>
                            <span><div>App包名:</div>{testCaseApp.appPackage}</span>
                            <span><div>App入口:</div>{testCaseApp.appActivity}</span>
                        </Space>
                    },
                    rowExpandable: record => record.type === 'APP',
                }}
                loading={tableLoading}
            />

        </Fragment>
    )
}

export default inject('testcaseStore')(observer(TestcaseList));
