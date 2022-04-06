import React, {useEffect} from "react";
import {Popconfirm, Space, Switch, Table} from "antd";
import AppPerformBindScene from "./appPerformBindScene";
import {inject, observer} from "mobx-react";

const AppPerformSceneConfig = (props) =>{
    const {appPerformSceneStore} = props;
    const {findAppPerformScenePage,appPerformSceneList,deleteAppPerformScene} =appPerformSceneStore;


    const column =[
        {
            title: '场景名称',
            dataIndex: 'name',
            key: 'name',
            // width: "30%",
            // render: (text, record) => (
            //     <a onClick={() => setSessionStorage(record.id)}>{text}</a>
            // )
        },{
            title: '是否启用',
            dataIndex: 'testType',
            key: 'testType',
            // width: "30%",
            render:(text,record )=>(
                <Switch
                    checkedChildren="启用"
                    unCheckedChildren="停用"
                    checked={text===1?true:false}
                    onChange={(e)=>changeEnable(e,record)}
                />
            )
        },{
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: "15%",
            render: (text, record) => (
                <Popconfirm
                    title="确定删除？"
                    onConfirm={() => deleteAppPerformScene(record.id)}
                    okText='确定'
                    cancelText='取消'
                >
                    <a className="table-delete"> 删除 </a>
                </Popconfirm>
            )
        },
    ]

    useEffect(()=>{
        findAppPerformScenePage()
    },[])


    const changeEnable = (e,record) => {
        // if(e===true){
        //     record.enable=1;
        // }else {
        //     record.enable=0;
        // }
        // updateMock(record)
    }

    const setSessionStorage = (id) =>{
        sessionStorage.setItem("appSceneId",id);
        props.history.push("/repositorypage/apptest/scenedetail")
    }

    return(
        <>
            <div className='flex-right'>
                <AppPerformBindScene />
            </div>
            <Table
                columns={column}
                dataSource={appPerformSceneList}
                rowKey = {record => record.id}
            />
        </>
    )
}

export default inject("appPerformSceneStore")(observer(AppPerformSceneConfig));