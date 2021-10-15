import React, { Fragment, useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import RequestHeader from "./requestHeader";
import QueryParam from './queryParam';
import FormParam from './formParam';
import JsonParam  from "./jsonParam";
import RawParam from './rawParam';
import PreParam from './preParam';
import BackParam from './afterParam';
import AssertParam from './assertParam';
import { Tabs, Radio } from 'antd';
const { TabPane } = Tabs;

// 输出参数 请求头部与请求参数的切换
const Request = (props) => {
    const { requestBodyStore } = props;
    const {
        findRequestBody,
        createRequestBody,
        updateRequestBody,
        requestBodyInfo
    } = requestBodyStore;

    const [radioValue, setRadioValue] = useState()

    const stepId = localStorage.getItem('stepId');
    useEffect(()=>{
        findRequestBody(stepId).then((res) => {
            if(res === null){
                let initRadioValue ={bodyType :'form'};
                res = Object.assign(initRadioValue);
                createRequestBody(res);
            }else{
                setRadioValue(res.bodyType)
                sessionStorage.setItem('apiReqRadio',res.bodyType)
            }
        })
    },[requestBodyInfo])

    //radio变化，更新radio的值
    const onChange = e => {
        let changeRadioValue = {bodyType : e.target.value}
        updateRequestBody(changeRadioValue)
    };

    //根据radio值，渲染相应的请求体
    const changeFormat = (radioValue) => {
        switch(radioValue) {
            case 'form':
                return <FormParam  />
            case 'json':
                return <JsonParam />
            case 'raw':
                return <RawParam />
            case 'binary':
                return <RequestHeader />
        }
    }

    //获取输入参数的tabskey，用于默认key
    const defaultActiveKey = () => {
        let tabkey = sessionStorage.getItem('apiReqTabs')
        if(tabkey){
            return tabkey
        }else {
            return '1'
        }
    }

    //获取请求体的radio值
    const radioDefaultValue = () => {
        if(radioValue){
            return radioValue
        }else {
            return sessionStorage.getItem('apiReqRadio')
        }
    }

    return(
        <Fragment>
            <Tabs
                defaultActiveKey={defaultActiveKey}
                type="card"
                className="tabs"
                onChange = {(e)=>sessionStorage.setItem('apiReqTabs',e)}
            >
                <TabPane tab="请求头部" key="1" >
                    <RequestHeader   />
                </TabPane>
                <TabPane tab="查询参数" key="2">
                    <QueryParam  />
                </TabPane>
                <TabPane tab="请求体" key="3">
                    <div className='request-radio'>
                        <Radio.Group
                            name="radiogroup"
                            onChange={(e)=>onChange(e)}
                            defaultValue={radioDefaultValue}
                        >
                            <Radio value={'form'}>form </Radio>
                            <Radio value={'json'}>json</Radio>
                            <Radio value={'raw'}>raw</Radio>
                            <Radio value={'binary'}>binary</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        {
                            changeFormat(radioValue)
                        }
                    </div>
                </TabPane>
                <TabPane tab="前置脚本" key="4">
                    <PreParam />
                </TabPane>
                <TabPane tab="后置脚本" key="5">
                    <BackParam  />
                </TabPane>
                <TabPane tab="断言" key="6">
                    <AssertParam  />
                </TabPane>
            </Tabs>
        </Fragment>
    )

}

export default inject('requestBodyStore')(observer(Request));
