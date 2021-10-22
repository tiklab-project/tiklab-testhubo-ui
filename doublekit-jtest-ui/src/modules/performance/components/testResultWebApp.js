import React,{useEffect,useState} from "react";
import {Menu, Table} from "antd";
import {inject, observer} from "mobx-react";

const TestResultWebApp = (props) => {
    const {performanceStore,testCaseId} = props;
    const {mergeList,executeType,taskResult}  = performanceStore;
    let columns= [
        {
            title: '操作方法',
            width: '8%',
            dataIndex: 'testMethod',
            align:'center',
        },
        {
            title: '参数',
            width: '10%',
            dataIndex: 'parament',
            align:'center',
        },
        {
            title: '定位器',
            dataIndex: 'location',
            width: '8%',
            align:'center',
        },
        {
            title: '定位器的值',
            dataIndex: 'locationPrice',
            width: '15%',
            align:'center',
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

    useEffect(() => {
        let timer
        if(executeType==='start'||executeType==='continue'){
            timer = setInterval(()=>{
                taskResult(testCaseId)
            },2000)
        }
        return () => {
            //清除定时器
            clearInterval(timer)
        }
    },[executeType])

    useEffect(() => {
        console.log(mergeList)
    },[mergeList])

    const [selectItem, setSelectItem] = useState([]);

    //左侧显示名称
    const nameView = (data) => {
        return(
            <Menu mode="inline">
                {
                    data&&data.map((item,index)=>{
                        let testSteps = item?.webOrAPPTestStepVos
                        return <Menu.Item key={item.id} onClick={()=>setSelectItem(testSteps)}>
                            {item.testCaseName}
                        </Menu.Item>
                    })
                }
            </Menu>
        )
    }

    return(
        <div className={'task-result'}>
            <div className={'task-result-left'}>
                {nameView(mergeList)}
            </div>
            <div className={'task-result-right'}>
                <div className={'task-result-title'}>用例步骤</div>
                <Table
                    columns={columns}
                    dataSource={selectItem}
                    rowKey={record => record.stepId}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default inject('performanceStore')(observer(TestResultWebApp));