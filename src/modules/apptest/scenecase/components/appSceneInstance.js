import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import { Form, Table} from "antd";
import BackCommon from "../../../common/backCommon";
import AppSceneInstanceModal from "./appSceneInstanceModal";


const AppSceneInstance = (props) =>{
    const {appSceneInstanceStore} = props;
    const {findAppSceneInstanceList,instanceList,findAppSceneInstance} = appSceneInstanceStore;

    const [selected, setSelected] = useState();
    const [allData, setAllData] = useState();
    const [stepList, setStepList] = useState([]);

    let columns= [
        {
            title: '操作方法',
            width: '8%',
            dataIndex: 'actionType',
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
            title: '是否通过',
            width: '8%',
            dataIndex: 'result',
            align:'center',
            render: (text, record) => (
                text===1
                    ?<div style={{background:'#4f9854',color:'#fff'}}>通过</div>
                    :<div style={{background:'#f04949',color:'#fff'}}>未通过</div>
            )
        }
    ]



    const appSceneId = sessionStorage.getItem("appSceneId")

    useEffect(()=>{
        findAppSceneInstanceList(appSceneId)
    },[appSceneId])

    const clickFindInstance = id =>{
        setSelected(id)
        findAppSceneInstance(id).then(res=>{

            setAllData(res)
            setStepList(res.stepList)
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
                            <span style={{margin:" 0 10px 0 0"}}>用例数：{item.stepNum}</span>
                            <span>{item.time}</span>
                        </div>

                        <div>{item.name}</div>
                    </div>
                </div>
            )
        })
    }



    const toSceneDetail =()=>{
        props.history.push("/repositorypage/testcase/app-scene-detail")
    }

    return(
        <>
            <BackCommon clickBack={toSceneDetail}/>
            <div className={"scene-instance-contant"}>
                <div className={"test-detail-history"}>
                    <div className={"header-item"}>历史列表</div>
                    {
                        showInstanceListView(instanceList)
                    }
                </div>
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
                        <div className={"header-item"}>场景测试总详情</div>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>测试结果</div>
                                <div className={"history-detail-all-item-value"}>{allData?.result}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>步骤数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.stepNum}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>通过率</div>
                                <div className={"history-detail-all-item-value"}>{allData?.passRate}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>通过数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.passNum}</div>
                            </div>

                            <div className={"history-detail-all-item"}>
                                <div>未通过数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.failNum}</div>
                            </div>
                        </div>
                    </div>
                    <div className={"history-detail-all"}>
                        <div className={"header-item"}>场景列表</div>
                        <Table
                            columns={columns}
                            dataSource={stepList}
                            rowKey={record => record.id}
                            pagination={false}
                        />

                    </div>
                </div>
            </div>
        </>
    )
}

export default inject("appSceneInstanceStore")(observer(AppSceneInstance));