import React, {useEffect, useState} from "react";
import BackCommon from "../../../../common/backCommon";
import {inject, observer} from "mobx-react";

const ApiPerfInstance =(props)=>{
    const {apiPerfInstanceStore} = props;
    const {findApiPerfInstanceList,findApiPerfInstance,apiPerfInstanceList} = apiPerfInstanceStore;
    const [selected, setSelected] = useState();
    const [result, setResult] = useState();
    const [sceneDetail, setSceneDetail] = useState();

    let apiPerfId = sessionStorage.getItem("apiPerfId");

    useEffect(()=>{
        findApiPerfInstanceList(apiPerfId)
    },[apiPerfId])

    const clickFindInstance = id =>{
        setSelected(id)
        findApiPerfInstance(id).then(res=>{
            setResult(res)
        })
        setSceneDetail(null)
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

                    <div className='history-item-detail'>
                        <div>{item.createTime}</div>
                        <span>{item.name}</span>
                        <div>场景数:{item.total}</div>
                    </div>
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
                        showInstanceListView(apiPerfInstanceList)
                    }
                </div>
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
                        <div className={"header-item"}>测试总详情</div>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>通过率</div>
                                <div className={"history-detail-all-item-value"}>{result?.passRate}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>失败率</div>
                                <div className={"history-detail-all-item-value"}>{result?.errorRate}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>总数</div>
                                <div className={"history-detail-all-item-value"}>{result?.total}</div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>通过数</div>
                                <div className={"history-detail-all-item-value"}>{result?.passNum}</div>
                            </div>

                            <div className={"history-detail-all-item"}>
                                <div>未通过数</div>
                                <div className={"history-detail-all-item-value"}>{result?.failNum}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default inject("apiPerfInstanceStore")(observer(ApiPerfInstance));