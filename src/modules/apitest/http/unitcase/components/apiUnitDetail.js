import React, { useEffect, useState} from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Input, Select, Space, Tooltip} from 'antd';
import Request from './request';
import EdiText from "react-editext";
import './unitcase.scss'
import {dictionary} from "../../../../common/dictionary/dictionary";
import ApiUnitTestResult from "./apiUnitTestResult";
import {messageFn} from "../../../../common/messageCommon/messageCommon";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import IconCommon from "../../../../common/iconCommon";
import ApiEnvSelect from "../../../../sysmgr/environment/components/apiEnvSelect";

const {Option} = Select;

const ApiUnitDetail = (props) => {
    const { apiUnitStore,apiEnvStore,apiUnitTestDispatchStore,assertParamStore } = props;
    const { findApiUnit,updateApiUnit } = apiUnitStore;
    const { apiUnitExecute } = apiUnitTestDispatchStore;
    const { envUrl } = apiEnvStore;
    const {findAssertParamList} = assertParamStore

    const addRouter = props.history.push;

    const [form] = Form.useForm();
    const apiUnitId = sessionStorage.getItem('apiUnitId');

    const [name,setName]=useState();

    const [assertList, setAssertList] = useState();
    const [isTest, setIsTest] = useState(false);
    const [testResult, setTestResult] = useState();

    useEffect(async ()=>{
        let res = await findApiUnit(apiUnitId)
        setName(res.testCase.name);

        form.setFieldsValue({
            name: res.testCase.name,
            methodType: res.methodType,
            path: res.path,
        })

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
        addRouter("/repository/api-unit-instance")
    }

    //编辑名称
    const editName = (value) => {
        let param = {
            id:apiUnitId,
            testCase:{
                id:apiUnitId,
                name:value,
            }
        }
        updateApiUnit(param)
    };

    const changeCaseInfo = async () =>{
        let value = await form.validateFields();
        delete value.host
        let param = {
            id:apiUnitId,
            testCase:{id:apiUnitId},
            ...value
        }
        updateApiUnit(param)
    }


    //请求地址
    const showHost = () =>{
        if(envUrl&&envUrl.trim().length!==0){
            return (
                <Tooltip placement="top" title={"请从环境管理修改"}>
                    <div className={"test-host-url"} >
                        {envUrl}
                    </div>
                </Tooltip>
            )
        }else {
            return (
                <Form.Item
                    className='formItem'
                    name="host"
                >
                    <Input  placeholder={"测试请输入http开头的完整URL"} />
                </Form.Item>
            )
        }
    }

    const goBack = () =>{
        props.history.push("/repository/testcase")
    }


    return(
        <div className={"content-box-center"}>
            <div className='header-box-space-between'>
                <div style={{height:32,"display":"flex","gap":"10px","alignItems":"center"}}>
                    <IconCommon
                        icon={"31fanhui1"}
                        className={"icon-s"}
                        style={{cursor: "pointer"}}
                        onClick={goBack}
                    />


                    <EdiText
                        value={name}
                        tabIndex={2}
                        onSave={editName}
                        startEditingOnFocus
                        submitOnUnfocus
                        showButtonsOnHover
                        viewProps={{ className: 'edit-api-title' }}
                        editButtonClassName="ediText-edit"
                        saveButtonClassName="ediText-save"
                        cancelButtonClassName="ediText-cancel"
                        editButtonContent={
                            <svg className="icon" aria-hidden="true">
                                <use xlinkHref= {`#icon-bianji1`} />
                            </svg>
                        }
                        hideIcons
                    />
                </div>

                <Space>
                    <a onClick={toHistory}>测试历史</a>
                    <ApiEnvSelect {...props}/>
                </Space>

            </div>
            <div className={"test-base"}>
                <Form form = {form} layout={"inline"}>
                    <div className={"test-url"}>
                        <Form.Item name="methodType" noStyle>
                            <Select
                                style={{width: 100,height:40}}
                                onSelect={changeCaseInfo}
                            >
                                {
                                    dictionary.requestType.map(item=>{
                                        return <Option value={item}  key={item}>{item}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                        {showHost()}
                        <Form.Item
                            className='formItem'
                            name="path"
                            rules={[{required: true, message: '接口路径'}]}
                        >
                            <Input onBlur={changeCaseInfo}/>
                        </Form.Item>
                        <Space className={"test-base-item"}>
                            <IconBtn
                                className="important-btn"
                                icon={"fasong-copy"}
                                onClick={clickTest}
                                name={"测试"}
                            />
                        </Space>
                    </div>
                </Form>
            </div>

            <div className="header-title ex-title">请求</div>
            <div className={"white-bg-box"}>
                <Request />
            </div>

            <div className='header-title ex-title'> 响应</div>

            <ApiUnitTestResult
                testResponse={testResult}
                showResponse={isTest}
                assertList={assertList}
            />

        </div>
    )
}

export default inject('apiUnitStore',"apiEnvStore","apiUnitTestDispatchStore",'assertParamStore')(observer(ApiUnitDetail));
