import React, { useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Input, Select, Space, Tooltip} from 'antd';
import Request from './request';
import EdiText from "react-editext";
import './unitcase.scss'
import {dictionary} from "../../../../../common/dictionary/dictionary";
import ApiUnitTestResult from "./apiUnitTestResult";
import {messageFn} from "../../../../../common/messageCommon/MessageCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import MethodType from "../../common/methodType";
import ApiEnvDropDownSelect from "../../../../../support/environment/components/apiEnvDropDownSelect";
import apiUnitTestDispatchStore from "../store/apiUnitTestDispatchStore";
import assertParamStore from "../store/assertParamStore";
import Response from "./response";

const {Option} = Select;

const ApiUnitEditPageCommon = (props) => {
    const { apiUnitStore,apiEnvStore } = props;
    const { findApiUnit,updateApiUnit } = apiUnitStore;
    const { apiUnitExecute } = apiUnitTestDispatchStore;
    const { envUrl } = apiEnvStore;
    const {findAssertParamList} = assertParamStore

    const addRouter = props.history.push;

    const [form] = Form.useForm();
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    const [showValidateStatus, setShowValidateStatus ] = useState()
    const [resData, setResData] = useState();
    const [name,setName]=useState();
    const [methodType,setMethodType] =useState();
    const [path, setPath] = useState();
    const [assertList, setAssertList] = useState();
    const [isTest, setIsTest] = useState(false);
    const [testResult, setTestResult] = useState();

    useEffect(async ()=>{
        let res = await findApiUnit(apiUnitId)
        setResData(res)
        setName(res.testCase.name);
        setMethodType(res.methodType);
        setPath(res.path)

    },[apiUnitId])

    //测试
    const clickTest = async ()=>{
        findAssertParamList(apiUnitId).then(res=>{
            setAssertList(res)
        })

        let values = await form.validateFields()

        //测试环境为空提示
        if(!envUrl&&!values.host){
            return messageFn("error","请填写测试地址")
        }

        //执行测试
        let res = await apiUnitExecute(apiUnitId,envUrl?envUrl:values.host)
        if(res.code===0){
            setTestResult(res.data)

            setIsTest(true)
        }

        if(res.code===60000){
            messageFn("error","Agent错误")
        }


    }

    const toHistory = () =>{
        addRouter("/repository/testcase/api-unit-instance")
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
        console.log(e)

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
        <>

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
                        props.type
                            ?<Space>
                                <IconBtn
                                    className="pi-icon-btn-grey"
                                    icon={"lishi"}
                                    onClick={toHistory}
                                    name={"历史"}
                                />
                                <ApiEnvDropDownSelect />
                                <IconBtn
                                    className="important-btn"
                                    icon={"fasong-copy"}
                                    onClick={clickTest}
                                    name={"测试"}
                                />
                            </Space>
                            :null
                    }

                </div>


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

                <div className={"method"}>
                    <div className={"method-people-info"}>
                        <span className={"people-item "}>分组: {resData?.testCase?.category?.name}</span>
                        <span className={"people-item "}>更新人: {resData?.testCase?.updateUser?.name}</span>
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

        </>
    )
}

export default inject('apiUnitStore',"apiEnvStore",)(observer(ApiUnitEditPageCommon));
