import React,{useState} from "react";
import {Menu, Table} from "antd";
import {inject, observer} from "mobx-react";

const TestResultWebApp = (props) => {
    const {dataSource} = props;

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
            dataIndex: 'parameter',
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
            dataIndex: 'locationValue',
            width: '15%',
            align:'center',
        },
        {
            title: '耗时',
            dataIndex: 'elaTime',
            width: '10%',
            align:'center',
        },
        {
            title: '是否通过',
            width: '5%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text==='succeed'
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        },
    ]

    const [selectItem, setSelectItem] = useState([]);

    //左侧显示名称
    const nameView = (data) => {
        return(
            <Menu mode="inline">
                {
                    data&&data.map((item,index)=>{
                        let testSteps = item?.webOrAPPTestStepVos
                        return <Menu.Item key={item.id} onClick={()=>setSelectItem(testSteps)}>
                            <span style={{display:"flex",justifyContent:'space-between'}}>
                                <span>{item.testCaseName}</span>
                                <span style={{fontSize:'12px'}}>
                                    <span>耗时:{item.testCaseTime}ms</span>
                                    <span
                                        className={`${item.result==='succeed'?'isSucceed':'isFailed'}`}
                                        style={{color:"white"}}
                                    >
                                        {item.result==='succeed'?'成功':'失败'}
                                    </span>
                                </span>
                            </span>
                        </Menu.Item>
                    })
                }
            </Menu>
        )
    }

    return(
        <>
            <div className={'task-result'}>
                <div className={'task-result-left'}>
                    {nameView(dataSource)}
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
        </>
    )
}

export default inject('performanceStore')(observer(TestResultWebApp));