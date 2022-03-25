import React, {useEffect, useState} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import {useTranslation} from "react-i18next";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import AppPerformcaseEdit from "./appPerformcaseEdit";

const AppPerformcaseList = (props) =>{
    // const { performanceStore } = props;
    // const {
    //     findPerformancePage,
    //     deletePerformance,
    //     performanceList,
    //     totalRecord
    // } = performanceStore;

    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`名称`,
            dataIndex: "name",
            key: "name",
            render: (text,record) =>(
                <a onClick = {()=>setLocalStorage(record.testType,record.id)}>{text}</a>
            )
        },
        {
            title: `类型`,
            dataIndex: "testType",
            key: "testType",
        },
        {
            title: `创建人`,
            dataIndex: ['user', 'name'],
            key: "user",
        },
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <div>
                        {/*<PerformanceEdit name="编辑"  performanceId={record.id} />*/}
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        // onConfirm={() =>deletePerformance(record.id)}
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
    const repositoryId = sessionStorage.getItem('repositoryId')

    useEffect(()=> {
        // findPerformancePage(repositoryId,params).then(()=>{
        //     setTableLoading(false)
        // });
    },[params])

    // 保存id到缓存
    const setLocalStorage = (type,id) => {
        localStorage.setItem('performanceId',id);
        props.history.push('/repositorypage/performancedetail')
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
                <Input
                    placeholder={`搜索`}
                    onPressEnter={onSearch}
                    className='search-input'
                />
                <AppPerformcaseEdit  name='添加用例' btn={"btn"} />
            </div>

            <Table
                className="tablelist"
                columns={columns}
                // dataSource={performanceList}
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

export default AppPerformcaseList;