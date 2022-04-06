import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import {Table} from "antd";
import BackCommon from "../../../common/backCommon";
import AppPerformInstanceModal from "./appPerformInstanceModal";

const AppPerformInstance = (props) =>{
    const {appPerformInstanceStore} = props;
    const {findAppPerformInstanceList,instanceList,findAppPerformInstance} = appPerformInstanceStore;

    const [selected, setSelected] = useState();
    const [allData, setAllData] = useState();

    const appPerformId = sessionStorage.getItem("appPerformId")


    let columns= [
        {
            title: '测试用例数',
            width: '10%',
            dataIndex: 'stepNum',
            align:'center',
        },
        {
            title: '通过率',
            width: '10%',
            dataIndex: 'pass',
            align:'center',
        },
        {
            title: '通过用例数',
            dataIndex: 'passNum',
            width: '8%',
            align:'center',
        },
        {
            title: '未通过用例数',
            dataIndex: 'outNum',
            width: '15%',
            align:'center',
        },
        {
            title: '是否通过',
            width: '8%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text==='1'
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        },{
            title: '操作',
            dataIndex: 'action',
            width: '15%',
            align:'center',
            render: (text, record) => (
                <AppPerformInstanceModal name={"查看详情"} allData={record}/>
            )
        },

    ]

    useEffect(()=>{
        findAppPerformInstanceList(1)
    },[])

    const clickFindInstance = id =>{
        setSelected(id)
        findAppPerformInstance(id).then(res=>{
            setAllData(res)
        })
    }

    const showInstanceListView = (data) =>{
        return data&&data.map(item=>{
            return (
                <div className={`history-item ${selected===item.id?"history-item-selected":""}`} key={item.id} onClick={()=>clickFindInstance(item.id)}>
                    {
                        item.result===1
                            ?<div className='history-item-result '>
                                <div className={"isSucceed"}>通过</div>
                            </div>
                            :<div className='history-item-result '>
                                <div className={"isFailed"}>未通过</div>
                            </div>
                    }
                    <div className='history-item-detail'>
                        <div>{item.createTime}</div>
                        <div>
                            <span style={{margin:" 0 10px 0 0"}}>场景数：{item.sceneNum}</span>
                            <span>{item.time}</span>
                        </div>

                        <div>{item.name}</div>
                    </div>
                </div>
            )
        })
    }
    

    const toPerformDetail =()=>{
        props.history.push("/repositorypage/apptest/performdetail")
    }

    return(
        <>
            <BackCommon clickBack={toPerformDetail}/>
            <div className={"scene-instance-contant"}>
                <div className={"test-detail-history"}>
                    <div className={"header-item"}>历史列表</div>
                    {
                        showInstanceListView(instanceList)
                    }
                </div>
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
                        <div className={"header-item"}>性能测试总详情</div>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>测试结果</div>
                                <div className={"history-detail-all-item-value"}>{allData?.result}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>场景数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.sceneNum}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>测试通过率</div>
                                <div className={"history-detail-all-item-value"}>{allData?.pass}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>通过场景数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.passNum}</div>
                            </div>

                            <div className={"history-detail-all-item"}>
                                <div>未通过场景数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.outNum}</div>
                            </div>
                        </div>
                    </div>
                    <div className={" history-detail-box"}>
                        <div className={"header-item"}>场景列表</div>
                        <Table
                            columns={columns}
                            dataSource={allData?.sceneList}
                            rowKey={record => record.id}
                            pagination={false}
                        />
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default inject("appPerformInstanceStore")(observer(AppPerformInstance));