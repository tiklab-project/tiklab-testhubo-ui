import React, {useEffect} from "react";
import {Popconfirm, Space, Switch, Table} from "antd";
import ApiPerformBindScene from "./apiPerformBindScene";
import {inject, observer} from "mobx-react";

const ApiPerformSceneConfig = (props) =>{
    const {apiPerformSceneStore} = props;
    const {findApiPerformScenePage,apiPerformSceneList} =apiPerformSceneStore;


    const column =[
        {
            title: '场景名称',
            dataIndex: ['testCase','name'],
            key: 'name',
            // width: "30%",
            // render: (text, record) => (
            //     <a onClick={() => setSessionStorage(record.id)}>{text}</a>
            // )
        },
        // {
        //     title: '是否启用',
        //     dataIndex: 'testType',
        //     key: 'testType',
        //     // width: "30%",
        //     render:(text,record )=>(
        //         <Switch
        //             checkedChildren="启用"
        //             unCheckedChildren="停用"
        //             checked={text===1?true:false}
        //             onChange={(e)=>changeEnable(e,record)}
        //         />
        //     )
        // },
        {
            title: `创建时间`,
            dataIndex: ['testCase', 'createTime'],
            key: "user",
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Popconfirm
                    title="确定删除？"
                    // onConfirm={() => deleteTestCase(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <a className="table-delete"> 删除 </a>
                </Popconfirm>
            )
        },
    ]

    const apiPerfId = sessionStorage.getItem("apiPerfId")

    useEffect(()=>{
        findApiPerformScenePage(apiPerfId)
    },[])


    // const changeEnable = (e,record) => {
        // if(e===true){
        //     record.enable=1;
        // }else {
        //     record.enable=0;
        // }
        // updateMock(record)
    // }

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("apiSceneId",id);
        props.history.push("/repositorypage/apitest/scenedetail")
    }

    return(
        <>
            <div className='flex-right'>
                <ApiPerformBindScene apiPerformSceneStore={apiPerformSceneStore} />
            </div>
            <Table
                columns={column}
                dataSource={apiPerformSceneList}
                rowKey = {record => record.id}
                pagination={false}
            />
        </>
    )
}

export default inject("apiPerformSceneStore")(observer(ApiPerformSceneConfig));