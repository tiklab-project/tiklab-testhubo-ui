import React, { useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Input, Select, Space} from 'antd';
import Request from './request';
import {dictionary} from "../../../../../common/dictionary/dictionary";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import MethodType from "../../common/methodType";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import Response from "./response";
import {useHistory} from "react-router";
import ApiUnitExecuteTest from "./apiUnitExecuteTest";

const {Option} = Select;

const ApiUnitEditPageCommon = (props) => {
    const { apiUnitStore } = props;
    const { findApiUnit,updateApiUnit } = apiUnitStore;

    const history = useHistory()
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    const [showValidateStatus, setShowValidateStatus ] = useState()
    const [resData, setResData] = useState();
    const [name,setName]=useState();
    const [methodType,setMethodType] =useState();
    const [path, setPath] = useState();


    useEffect(async ()=>{
        let res = await findApiUnit(apiUnitId)
        setResData(res)
        setName(res.testCase.name);
        setMethodType(res.methodType);
        setPath(res.path)

    },[apiUnitId])



    const toHistory = () =>{
        history.push("/repository/api-unit-instance")
    }

    //编辑名称
    const editName = () => {
        if(name!==resData.testCase?.name) {
            let param = {
                id: apiUnitId,
                testCase: {
                    id: apiUnitId,
                    name: name,
                }
            }
            updateApiUnit(param).then(() => {
                findApiUnit(apiUnitId).then(res=>setResData(res))
            })
        }

        setShowValidateStatus(null)
    };

    //编辑请求类型
    const selectMethodType = (methodType) =>{
        let param = {
            id:apiUnitId,
            testCase:{id:apiUnitId},
            methodType:methodType
        }

        setMethodType(methodType)
        updateApiUnit(param).then(() => {
            findApiUnit(apiUnitId).then(res=>setResData(res))
        })
    }

    //编辑名称
    const editPath = (e) => {
        if(path!==resData.path) {
            let param = {
                id: apiUnitId,
                testCase:{id:apiUnitId},
                path: path
            }
            updateApiUnit(param).then(() => {
                findApiUnit(apiUnitId).then(res=>setResData(res))
            })
        }

        setShowValidateStatus(null)
    };

    return(
        <div >
            <div className={"api-unit-base"}>
                <div className='header-box-space-between'>
                    <div style={{height:32,"display":"flex","gap":"10px","alignItems":"center"}}>
                        <Select
                            style={{width:75,height:32}}
                            value={methodType}
                            onSelect={selectMethodType}
                            showArrow={showValidateStatus === "methodType"}
                            onMouseEnter={()=>{setShowValidateStatus("methodType")}}
                            onMouseLeave={()=>{setShowValidateStatus(null)}}
                        >
                            {
                                dictionary.requestType.map(item=>{
                                    return <Option value={item}  key={item}>
                                        <MethodType type={item} />
                                    </Option>
                                })
                            }
                        </Select>

                        <div className={"api-base-info-box-name"}>
                            <Input
                                defaultValue={name}
                                onPressEnter={editName}
                                onBlur={editName}
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                onFocus={()=>setShowValidateStatus("editName")}
                                suffix={
                                    showValidateStatus === "editName"
                                        ? <span/>
                                        :null
                                }
                            />
                        </div>
                    </div>

                    {
                        props.planType
                            ? null
                            : <ApiEnvDropDownSelect />
                    }

                </div>

                <div className='header-box-space-between'>
                    <div className={'api-base-edit-url-box'} style={{width: "480px"}}>
                    <Input
                        defaultValue={path}
                        onPressEnter={editPath}
                        onBlur={editPath}
                        onFocus={()=>setShowValidateStatus("editPath")}
                        value={path}
                        onChange={(e)=>setPath(e.target.value)}
                        suffix={
                            showValidateStatus === "editPath"
                                ? <span/>
                                :null
                        }
                    />
                </div>

                    {
                        props.planType
                            ? null
                            :<Space>
                                <IconBtn
                                    className="pi-icon-btn-grey"
                                    icon={"lishi"}
                                    onClick={toHistory}
                                    name={"历史"}
                                />
                                <ApiUnitExecuteTest apiUnitId={apiUnitId}/>
                            </Space>
                    }

                </div>
                <div className={"method"}>
                    <div className={"method-people-info"}>
                        <span className={"people-item "}>分组: {resData?.testCase?.category?.name||"未设置"}</span>
                        <span className={"people-item "}>更新人: {resData?.testCase?.updateUser?.name||"未更新"}</span>
                        <span className={"people-item "}>更新时间: {resData?.testCase?.updateTime}</span>
                    </div>
                </div>
            </div>


            <div className="header-title ex-title">请求</div>
            <div className={"white-bg-box"}>
                <Request />
            </div>

            <div className='header-title ex-title'> 响应</div>
            <Response />

        </div>
    )
}

export default inject('apiUnitStore')(observer(ApiUnitEditPageCommon));