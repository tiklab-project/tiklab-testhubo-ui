import React, {useEffect} from "react";
import {Input, Popconfirm, Space, Table} from "antd";
import BreadcrumbCommon from "../../../common/breadcrumbCommon";
import {inject, observer} from "mobx-react";
import FuncSceneBindUnit from "./FuncSceneBindUnit";

const FuncSceneStepList = (props) => {
    const {funcSceneStepStore} =props;
    const {findFuncSceneStepPage,funcSceneStepList} = funcSceneStepStore;

    const column = [
        {
            title:`测试用例名称`,
            dataIndex: "name",
            key: "name",
        }, {
            title: `创建人`,
            dataIndex: ['createUser', 'name'],
            key: "user",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Space size="middle">
                    <div>
                        {/*<FuncSceneStepEdit name={"编辑"}/>*/}
                    </div>
                    <Popconfirm
                        title="确定删除？"
                        // onConfirm={() => deleteTestCase(record.id)}
                        okText='确定'
                        cancelText='取消'
                    >
                        <a className="table-delete"> 删除 </a>
                    </Popconfirm>
                </Space>
            )
        },
    ]

    useEffect(()=>{
        findFuncSceneStepPage()
    },[])

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("funcSceneStepId",id);

        props.history.push("/repositorypage/functest/unitdetail")
    }


    return(
        <>
           <FuncSceneBindUnit />
            <Table
                columns={column}
                dataSource={funcSceneStepList}
                rowKey = {record => record.id}
            />

        </>
    )


}

export default inject("funcSceneStepStore")(observer(FuncSceneStepList))