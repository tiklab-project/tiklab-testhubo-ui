import React, {useEffect, useState} from "react";
import BackCommon from "../../../../common/backCommon";
import {inject, observer} from "mobx-react";

const ApiPerformInstance =(props)=>{
    const {apiPerformInstanceStore} = props;
    const {findApiPerformInstanceList,findApiPerformInstance,apiPerformInstanceList} = apiPerformInstanceStore;
    const [selected, setSelected] = useState();
    const [allData, setAllData] = useState();
    const [sceneSelect, setSceneSelect] = useState();
    const [sceneDetail, setSceneDetail] = useState();


    useEffect(()=>{
        findApiPerformInstanceList()
    },[])

    const clickFindInstance = id =>{
        setSelected(id)
        findApiPerformInstance(id).then(res=>{
            setAllData(res)
        })
        setSceneDetail(null)
    }

    //点击场景
    const clickFindScene = item =>{
        setSceneSelect(item.id);
        setSceneDetail(item)
    }

    const goback = () =>{
        props.history.push("/repositorypage/apitest/performdetail")
    }

    const showInstanceListView = (data) =>{
        return data&&data.map(item=>{
            return (
                <div
                    className={`history-item ${selected===item.id?"history-item-selected":""}`}
                    key={item.id}
                    onClick={()=>clickFindInstance(item.id)}
                >
                    {
                        item.result===1
                            ?<div className='history-item-result isSucceed'>通过</div>
                            :<div className='history-item-result isFailed'>未通过</div>
                    }
                    <div className='history-item-detail'>
                        <div>{item.createTime}</div>
                        <span>{item.name}</span>
                        <div>场景数:{item.num}</div>
                    </div>
                </div>
            )
        })
    }

    const showStepListView = (data)=>{
        return data&&data.map(item=>{
            return(
                <div
                    className={`history-step-item ${sceneSelect===item.id ? "history-item-selected":""}`}
                    key={item.id}
                    onClick={()=>clickFindScene(item)}
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
                    <div>{item.name}</div>
                </div>
            )
        })
    }

    return(
        <>
            <BackCommon clickBack={goback}  />
            <div className={"scene-instance-contant"}>
                <div className={"test-detail-history"}>
                    <div className={"header-item"}>历史列表</div>
                    {
                        showInstanceListView(apiPerformInstanceList)
                    }
                </div>
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
                        <div className={"header-item"}>性能测试总详情</div>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>并发数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.thread}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>执行次数</div>
                                <div className={"history-detail-all-item-value"}>{allData?.times}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>错误率</div>
                                <div className={"history-detail-all-item-value"}>{allData?.error}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>xxx</div>
                                <div className={"history-detail-all-item-value"}></div>
                            </div>

                            <div className={"history-detail-all-item"}>
                                <div>xxx</div>
                                <div className={"history-detail-all-item-value"}></div>
                            </div>
                        </div>
                    </div>
                    <div className={"history-item-box"}>
                        <div className={"scene-step-contant"}>
                            <div className={"header-item"}>场景列表</div>
                            <div>
                                {
                                    showStepListView(allData?.stepList)
                                }
                            </div>
                        </div>
                        <div className={"scene-step-detail"}>
                            <div className={"header-item"}>场景详情</div>
                            <div className={"scene-step-detail-box"}>
                                {
                                    sceneDetail
                                        ?<>
                                            <div className={"scene-step-detail-contant"}>
                                                <div className={"scene-step-detail-item"}>
                                                    <div>结果</div>
                                                    <div className={"scene-step-detail-item-value"}>{sceneDetail.result}</div>
                                                </div>
                                                <div className={"scene-step-detail-item"}>
                                                    <div>耗时</div>
                                                    <div className={"scene-step-detail-item-value"}>{sceneDetail.time}</div>
                                                </div>
                                                <div className={"scene-step-detail-item"}>
                                                    <div>步骤数</div>
                                                    <div className={"scene-step-detail-item-value"}>{sceneDetail.step}</div>
                                                </div>
                                            </div>
                                            <div className={"scene-step-detail-contant"}>
                                                <div className={"scene-step-detail-item"}>
                                                    <div>测试通过率</div>
                                                    <div className={"scene-step-detail-item-value"}>{sceneDetail.passRate}</div>
                                                </div>
                                                <div className={"scene-step-detail-item"}>
                                                    <div>通过步骤数</div>
                                                    <div className={"scene-step-detail-item-value"}>{sceneDetail.successNum}</div>
                                                </div>
                                                <div className={"scene-step-detail-item"}>
                                                    <div>未通过步骤数</div>
                                                    <div className={"scene-step-detail-item-value"}>{sceneDetail.errorNum}</div>
                                                </div>
                                            </div>
                                        </>
                                    :null

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default inject("apiPerformInstanceStore")(observer(ApiPerformInstance));