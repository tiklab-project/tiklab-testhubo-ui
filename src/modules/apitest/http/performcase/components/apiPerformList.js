import React, {useEffect, useState} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {useTranslation} from "react-i18next";
import BreadcrumbCommon from "../../../../common/breadcrumbCommon";
import {inject, observer} from "mobx-react";
import ApiPerformEdit from "./apiPerformEdit";
import "./performanceStyle.scss"

const ApiPerformList = (props) =>{
    const { apiPerformStore } = props;
    const {
        findApiPerformPage,
        deleteApiPerform,
        apiPerformList,
        totalRecord
    } = apiPerformStore;

    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex:[ "testCase","name"],
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>setStorage(record.id)}>{text}</a>
            )
        },
        {
            title: `创建时间`,
            dataIndex: ["testCase","createTime"],
            key: "createTime",
        },
        // {
        //     title: `等级`,
        //     dataIndex: "level",
        //     key: "level",
        // },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <ApiPerformEdit
                        apiPerfId={record.id}
                        name={"编辑"}
                        findPage={findPage}
                        testType={testType}
                        caseType={caseType}
                        categoryId={categoryId}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteApiPerform(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
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

    const [tableLoading,setTableLoading] = useState(true);

    const caseType=localStorage.getItem("caseType");
    const testType=localStorage.getItem("testType");
    const categoryId = sessionStorage.getItem("categoryId")

    useEffect(()=> {
        findPage();
    },[caseType,testType,categoryId])

    const findPage = () => {
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findApiPerformPage(param)
    }

    // 保存id到缓存
    const setStorage = (id) => {

        sessionStorage.setItem('apiPerfId',id);
        props.history.push('/repositorypage/apitest/performdetail')
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


    return(
        <div className={'inner-box'}>
            <BreadcrumbCommon breadArray={["API","性能测试"]}/>
            <div className='case-header'>
                <ApiPerformEdit
                    name='添加用例'
                    btn={"btn"}
                    findPage={findPage}
                    testType={testType}
                    caseType={caseType}
                    categoryId={categoryId}
                />
                <Input
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={apiPerformList}
                rowKey={record => record.id}
                pagination={{
                    current:currentPage,
                    pageSize:pageSize,
                    // total:totalRecord,
                }}
                onChange = {(pagination) => onTableChange(pagination)}
                // loading={tableLoading}
            />
        </div>
    )
}

export default inject("apiPerformStore")(observer(ApiPerformList));