import React, {useEffect} from "react";
import { Popconfirm, Space, Table} from "antd";
import {useTranslation} from "react-i18next";
import BreadcrumbCommon from "../../../../common/breadcrumbCommon";
import {inject, observer} from "mobx-react";
import ApiPerfEdit from "./apiPerfEdit";
import "./performanceStyle.scss"

const ApiPerfList = (props) =>{
    const { apiPerfStore,categoryStore } = props;
    const {
        findApiPerfList,
        deleteApiPerf,
        apiPerfList,
    } = apiPerfStore;
    const {findCategoryListTree}=categoryStore;

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
        {
            title: ` ${t('tcoperation')}`,
            key: "action",
            align:"center",
            render: (text, record) => (
                <Space size="middle">
                    <ApiPerfEdit
                        apiPerfId={record.id}
                        name={"编辑"}
                        type={"edit"}
                    />
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteFn(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const caseType=localStorage.getItem("caseType");
    const testType=localStorage.getItem("testType");
    const categoryId = sessionStorage.getItem("categoryId")
    const repositoryId = localStorage.getItem("repositoryId")

    useEffect(()=> {
        findPage();
    },[caseType,testType,categoryId])

    const findPage = () => {
        const param = {
            caseType:caseType,
            testType:testType,
            categoryId:categoryId
        }
        findApiPerfList(param)
    }

    const deleteFn = (id) =>{
        deleteApiPerf(id).then(()=>{
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
    const setStorage = (id) => {
        sessionStorage.setItem('apiPerfId',id);

        props.history.push('/repositorypage/apitest/performdetail')
    }


    return(
        <div className={'inner-box'}>
            <BreadcrumbCommon breadArray={["API","性能测试"]}/>
            <div className='case-header'>
                <ApiPerfEdit
                    name='添加用例'
                    btn={"btn"}
                />
            </div>

            <Table
                className="tablelist"
                columns={columns}
                dataSource={apiPerfList}
                rowKey={record => record.id}
                pagination={false}
            />
        </div>
    )
}

export default inject("apiPerfStore","categoryStore")(observer(ApiPerfList));