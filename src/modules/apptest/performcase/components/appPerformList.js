import React, {useEffect, useState} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {useTranslation} from "react-i18next";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import AppPerformEdit from "./appPerfEdit";
import {inject, observer} from "mobx-react";

const AppPerformList = (props) =>{
    const {appPerfStore,categoryStore} = props;
    const {findAppPerfList,appPerfList,deleteAppPerf}=appPerfStore;
    const {findCategoryListTree}=categoryStore;


    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`性能名称`,
            dataIndex: ["testCase",'name'],
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage(record.testType,record.id)}>{text}</a>
            )
        },
        {
            title: `创建时间`,
            dataIndex: ['testCase','createTime'],
            key: "user",
        },
        {
            title: '操作',
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <AppPerformEdit
                        name="编辑"
                        appPerfId={record.id}
                        type={"edit"}
                    />

                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteCase(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]


    const caseType=localStorage.getItem("caseType");
    const testType=localStorage.getItem("testType");
    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = sessionStorage.getItem("repositoryId")

    useEffect(()=> {
        findPage()
    },[caseType,testType,categoryId])

    const findPage = () =>{
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findAppPerfList(param)
    }


    const deleteCase = (id) =>{
        deleteAppPerf(id).then(()=> {
            findPage();

            const params = {
                testType:testType,
                caseType:caseType,
                repositoryId:repositoryId
            }
            findCategoryListTree(params)
        })
    }


    // 保存id到缓存
    const setLocalStorage = (type,id) => {
        sessionStorage.setItem('appPerfId',id);
        props.history.push('/repositorypage/apptest/performdetail')
    }



    return(
        <div className={'inner-box'}>
            <BreadcrumbCommon breadArray={["APP","性能测试"]}/>
            <div className='case-header'>
                {/*<Input*/}
                {/*    placeholder={`搜索`}*/}
                {/*    onPressEnter={onSearch}*/}
                {/*    className='search-input'*/}
                {/*/>*/}
                <AppPerformEdit
                    name='添加用例'
                    btn={"btn"}
                />
            </div>

            <Table
                columns={columns}
                dataSource={appPerfList}
                rowKey = {record => record.id}
                pagination={false}
            />
        </div>
    )
}

export default inject("appPerfStore","categoryStore")(observer(AppPerformList));