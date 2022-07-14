import React, {useEffect, useState} from "react";
import TestResult from "./testResult";
import {Table} from "antd";

const AllStep = (props) =>{

    const {dataSource,type} = props;

    let columns= [
        {
            title: '步骤名称',
            width: '25%',
            dataIndex: 'name',
            align:'center',
        },
        {
            title: '类型',
            width: '20%',
            dataIndex: 'stepType',
            align:'center',
        },
        {
            title: '路径',
            dataIndex: 'path',
            width: '25%',
            align:'center',
        },
        {
            title: '是否通过',
            width: '10%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text===200
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        },
        {
            title: '操作',
            width: '20%',
            dataIndex: 'action',
            align:'center',
            render: (text, record) => (
                <TestResult Id={record.id} name={'查看'}/>
            )
        }
    ]

    let appwebColumns= [
        {
            title: '操作方法',
            width: '8%',
            dataIndex: 'testMethod',
            align:'center',
        },
        {
            title: '参数',
            width: '10%',
            dataIndex: 'parameter',
            align:'center',
            ellipsis: true,
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '8%',
            align:'center',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationValue',
            width: '15%',
            align:'left',
            ellipsis: true,
        },
        {
            title: '是否通过',
            width: '8%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text==='succeed'
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        },

    ]

    const [list,setList] = useState([])

    useEffect(()=>{
        setList(dataSource)
    },[dataSource])

    return(
        <Table
            columns={type && type === "API" ? columns : appwebColumns}
            dataSource={list}
            rowKey={record => record.id}
            pagination={false}
        />
    )
}

export default AllStep;