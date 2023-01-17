import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import BackCommon from "../../../../common/backCommon";
import {processResHeader} from "../../common/response/testResponseFnCommon";
import {TextMethodType} from "../../common/methodType";
import EmptyTip from "../../common/instance/emptyTip";
import IconCommon from "../../../../common/iconCommon";
import "./apiUnitInstanceStyle.scss"
import ResponseCommon from "../../common/response/responseCommon";


const ApiUnitInstance = (props) =>{
    const {apiUnitInstanceStore} = props;
    const {
        findApiUnitInstanceList,
        apiUnitInstanceList,
        findApiUnitInstance,
        deleteApiUnitInstance
    } = apiUnitInstanceStore;

    const [selected, setSelected] = useState();
    const [allData, setAllData] = useState();

    const apiUnitId = sessionStorage.getItem("apiUnitId")

    useEffect(()=>{
        findApiUnitInstanceList(apiUnitId)
    },[])

    //点击步骤
    const clickFindInstance = id =>{
        setSelected(id)
        findApiUnitInstance(id).then(res=>{
            setAllData(res)
        })
    }

    //删除历史
    const deleteFn = (id)=>{
        deleteApiUnitInstance(id).then(()=> findApiUnitInstanceList(apiUnitId))
    }

    //历史列表项
    const showInstanceListView = (data) =>{
        return data&&data.map(item=>{
            return (
                <div className={"history-item-box"}>
                    <div
                        className={`history-item ${selected===item.id?"history-item-selected":""}`}
                        key={item.id}
                        onClick={()=>clickFindInstance(item.id)}
                    >
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
                                <span style={{margin:" 0 10px 0 0"}}>{item.apiUnit?.methodType}</span>
                                <span>{item.elapsedTime} ms</span>
                            </div>
                            <div>{item.name}</div>
                        </div>

                    </div>
                    <IconCommon
                        icon={"shanchu1"}
                        className={"history-delete-icon icon-s"}
                        onClick={()=>deleteFn(item.id)}
                    />
                </div>

            )
        })
    }

    // 返回详情页
    const toUnitDetail =()=>{
        props.history.push("/repositorypage/testcase/api-unit-detail")
    }

    //响应结果基础信息项
    const detail = [
        {
            title:"请求地址:",
            value:allData?.requestInstance?.requestUrl,
            key:"url"
        },{
            title:"请求方式:",
            value:allData?.requestInstance?.requestType,
            key:"methodType"
        },{
            title:"状态码:",
            value:allData?.statusCode,
            key:"statusCode"
        },{
            title:"测试结果:",
            value:allData?.result ? '成功' : '失败',
            key:"result"
        },{
            title:"测试时间:",
            value:allData?.createTime,
            key:"testTime"
        },
    ]

    //响应结果基础信息展示
    const showDetail = (data) =>{
        return data.map(item=>{
            return(
                <div key={item.key} className={"history-detail-item-box"}>
                    <div style={{width:"70px",fontSize:13,color:"#a3a3a3"}}>
                        <span className={"history-detail-item-box-title"}>{item.title}</span>
                    </div>

                    {
                        item.key==="methodType"
                            ? <TextMethodType type={allData?.requestInstance?.requestType} />
                            :<span className={"history-detail-item-box-value"}>{item.value}</span>
                    }

                </div>
            )
        })
    }


    return(
        <div style={{height:"calc( 100% - 48px)"}}>
            <BackCommon clickBack={toUnitDetail}/>
            <div className={"unit-instance"}>
                <div className={"test-detail-history"}>
                    <div className={"header-item"}>历史列表</div>
                    <div className={"history-list"}>
                        {
                            showInstanceListView(apiUnitInstanceList)
                        }
                    </div>
                </div>
                <div className={"unit-instance-detail"}>
                    <div className={"header-item"}>步骤详情</div>
                    {
                        allData
                            ?<ResponseCommon
                                detail={showDetail(detail)}
                                resBody={allData?.responseInstance?.responseBody}
                                resHeader={processResHeader(allData?.responseInstance?.responseHeader)}
                                reqHeader={processResHeader(allData?.requestInstance?.requestHeader)}
                            />
                            :<EmptyTip />
                    }

                </div>
            </div>
        </div>
    )
}

export default inject("apiUnitInstanceStore")(observer(ApiUnitInstance));