/*
 * @Description: 空间列表页
 */
import React, { useEffect } from 'react';
import { observer, inject } from "mobx-react";
import {Popconfirm, Space, Table} from 'antd';
import  { useTranslation } from 'react-i18next';
import FunctionalStepEdit from "./functionalStepEdit";

const FunctionalTestStep = (props) => {
    const { functionalTestStepStore } = props;
    const {
        findFunctionalStepList,
        deleteFunctionalStep,
        functionalStepList,
    } = functionalTestStepStore;

    const { t } = useTranslation();

    //列表头
    const columns = [
        {
            title:`步骤描述`,
            dataIndex: "name",
            key: "name",
            align:"center",
            width:'30%',
            editable: true,
        },
        {
            title:`预期结果`,
            dataIndex: "expectResult",
            key: "expectResult",
            align:"center",
            width:'30%',
            editable: true,
        },
        {
            title: `实际结果`,
            dataIndex: "actualResult",
            key: "actualResult",
            align:"center",
            width:'30%',
        },
        {
            title: '操作',
            align:'center',
            dataIndex: 'operation',
            width:'10%',
            render: (text, record) => (
                <Space size="middle">
                    <FunctionalStepEdit name={'编辑'} functionalStepId={record.id}/>
                    <Popconfirm
                        title="确定删除？"
                        onConfirm={() =>deleteFunctionalStep(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a href="#" style={{color:'red'}}>{t('tcdelete')}</a>
                    </Popconfirm>
                </Space>
            ),
        }
    ]

    const testcaseId = localStorage.getItem('testcaseId')


    useEffect(()=> {
        findFunctionalStepList(testcaseId)
    },[testcaseId])



    return(
        <div className={'funtionalTest-step'}>
            <FunctionalStepEdit name={'添加步骤'} />
            <Table
                columns={columns}
                dataSource={functionalStepList}
            />
        </div>
    )
}

export default inject('functionalTestStepStore')(observer(FunctionalTestStep));
