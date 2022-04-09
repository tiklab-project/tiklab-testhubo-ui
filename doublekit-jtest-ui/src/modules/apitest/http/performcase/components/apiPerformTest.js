import React, {useEffect, useState} from "react";
import Mock from "mockjs";

const ApiPerformTest = (props) =>{
    const {showResponse} = props;
    const [sceneDetail, setSceneDetail] = useState();
    const [sceneSelect, setSceneSelect] = useState();


    const list = [
        {
            id: "step1",
            name: Mock.mock('@cname'),
            createTime: Mock.mock('@datetime'),
            time:"200ms",
            result:1,
            step:10,
            successNum:5,
            errorNum:5,
            passRate:"50%"
        },
        {
            id: "step2",
            name: Mock.mock('@cname'),
            createTime: Mock.mock('@datetime'),
            result:1,
            time:"200ms",
            requestType:"get",
            statusCode:"100",
            step:10,
            successNum:5,
            errorNum:5,
            passRate:"50%"
        },
        {
            id: "step3",
            name: Mock.mock('@cname'),
            createTime: Mock.mock('@datetime'),
            result:0,
            time:"200ms",
            requestType:"post",
            statusCode:"500",
            step:10,
            successNum:5,
            errorNum:5,
            passRate:"50%"
        },
    ]


    useEffect(()=>{

    },[])

    //点击场景
    const clickFindScene = item =>{
        setSceneSelect(item.id);
        setSceneDetail(item)
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
            <div className={`test-response-after `}>
                <div className={"history-detail history-detail-box"}>
                    <div className={"history-detail-all"}>
                        <div className={"header-item"}>性能测试</div>
                        <div className={"history-detail-all-box"}>
                            <div className={"history-detail-all-item"}>
                                <div>并发数</div>
                                <div className={"history-detail-all-item-value"}></div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>执行次数</div>
                                <div className={"history-detail-all-item-value"}></div>
                            </div>
                            <div className={"history-detail-all-item"}>
                                <div>错误率</div>
                                <div className={"history-detail-all-item-value"}></div>
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
                                    showStepListView(list)
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
            {/*<div className={`test-response-before  ${showResponse === true? 'test-response-hide':'test-response-show'}`}>*/}
            {/*    <div className="test-response-before-alert">*/}
            {/*        点击<span>测试</span>按钮发送请求*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    )
}

export default ApiPerformTest;