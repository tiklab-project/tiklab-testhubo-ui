import React, {useEffect, useState} from "react";
import {Button, InputNumber, Radio,Checkbox } from "antd";
import {inject, observer} from "mobx-react";

const WebPerformCofig = (props) =>{
    const {webPerformStore} = props;
    const {findWebPerform,webPerformInfo} = webPerformStore;
    
    const [exeMode, setExeMode] = useState("nft");
    const [node, setNode] = useState("single");


    useEffect(()=>{
        findWebPerform(11)
    },[])

    const onChange=(e,value)=> {
        console.log('changed',e.target.checked,value);
    }

    const executionMode = (type)=>{
        setNode(type)
    }

    const changeRadio = (e) =>{

    }

    const showClient = (data)=>{
        return data&&data.map(item=>{
            return (
                <div className={"perform-client-item"}>
                    <div>
                        <svg className="icon" aria-hidden="true">
                            <use xlinkHref= {`#icon-web`}></use>
                        </svg>
                    </div>
                    <div>
                        <div>名称：{item.name}</div>
                        <div>地址：{item.url}</div>
                        <div className={"perform-client-item-status"}>状态：<span className={"perform-client-item-status-icon"}></span>{item.status}</div>
                    </div>
                    <div className={"perform-client-item-check"}>
                        <Checkbox onChange={(e)=>onChange(e,item.id)} />
                    </div>
                </div>
            )
        })
    }


    return(
        <>
            <div className={" perfom-config-item"}>
                <div className={"perform-item-detail"}>
                    并发数:
                    <InputNumber
                        min={1}
                        max={10}
                        defaultValue={1}
                        onChange={onChange}
                    />
                </div>

            </div>
            <div  className={"perfom-config-item"} >
                执行方式:
                {/*<Button className={`${exeMode==="nft"?"exeMode":null} `} onClick={()=>executionMode("nft")}>按执行次数</Button>*/}
                {/*<Button className={`${exeMode==="time"?"exeMode":null} `} onClick={()=>executionMode("time")}>按执行时间</Button>*/}
                <Radio.Group onChange={(e)=>setExeMode(e.target.value)} value={exeMode}>
                    <Radio value={"nft"}>按执行次数</Radio>
                    <Radio value={"time"}>按执行时间</Radio>
                </Radio.Group>
            </div>
            <div className={"perfom-config-item"}>
                {
                    exeMode==="nft"
                    ?<div>
                        <span>执行次数:</span>
                        <InputNumber
                            min={1}
                            max={10000}
                            defaultValue={1}
                            onChange={onChange}
                        />
                    </div>
                    : <div>
                        <span>执行时间:</span>
                        <InputNumber
                            min={0}
                            max={59}
                            defaultValue={1}
                            onChange={onChange}
                        />
                        时
                        <InputNumber
                            min={0}
                            max={59}
                            defaultValue={1}
                            onChange={onChange}
                        />
                        分
                        <InputNumber
                            min={0}
                            max={59}
                            defaultValue={1}
                            onChange={onChange}
                        />
                        秒
                    </div>
                }

            </div>
            <div className={"perfom-config-item"}>
                分配策略:
                <Button className={`${node==="single"?"exeMode":null} `} onClick={()=>executionMode("single")}>固定节点</Button>
                <Button className={`${node==="mult"?"exeMode":null} `} onClick={()=>executionMode("mult")}>自动分配</Button>
            </div>

            {
                node==="mult"
                    ? <div className={`perfom-config-item perform-client-box`}>

                        {
                            showClient(webPerformInfo?.nodeList)
                        }
                    </div>
                    :null
            }

        </>
    )
}

export default inject("webPerformStore")(observer(WebPerformCofig));