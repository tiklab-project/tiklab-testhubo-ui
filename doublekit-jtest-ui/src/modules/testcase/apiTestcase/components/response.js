import React, { Fragment, useState, useEffect } from 'react';
import { observer, inject } from 'mobx-react';
import ResponseHeader from "./responseHeader";
import JsonResponse  from "./jsonResponse";
import RawResponse from './rawResponse';
import { Tabs, Radio } from 'antd';
const { TabPane } = Tabs;

// 输出参数 返回头部与返回结果的切换
const Response = (props) =>{
    const { responseResultStore } = props;
    const {
        findResponseResult,
        createResponseResult,
        updateResponseResult,
        responseResultInfo
    } = responseResultStore;

    const [ radioValue, setRadioValue ] = useState()

    const stepId = localStorage.getItem('stepId');
    useEffect(()=> {
        findResponseResult(stepId).then((res)=>{
            let initRadioValue ={resultType :'json'};
            if(res === null){
                res = Object.assign(initRadioValue);
                createResponseResult(res);
            }else{
                setRadioValue(res.resultType)
            }
        })
    },[responseResultInfo])

    // radio切换，更新为当前radio的值
    const onChange = e => {
        let changeRadioValue = {resultType : e.target.value};
        updateResponseResult(changeRadioValue);
    };


    return(
        <Fragment>
            <Tabs defaultActiveKey="1" type="card">
                <TabPane tab="返回头部" key="1">
                    <ResponseHeader  {...props}/>
                </TabPane>
                <TabPane tab="返回结果" key="2">
                <div className='request-radio'>
                        <Radio.Group
                            name="radiogroup"
                            onChange={(e)=>onChange(e)}
                            defaultValue={radioValue}
                        >
                            <Radio value={'json'}>json </Radio>
                            <Radio value={'raw'}>raw</Radio>
                        </Radio.Group>
                    </div>
                    <div>
                        {
                            (()=> {
                                switch(radioValue) {
                                    case 'json':
                                        return <JsonResponse {...props}/>
                                    case 'raw':
                                        return <RawResponse {...props}/>
                                    default:
                                        return <JsonResponse {...props}/>
                                }
                            })()
                        }
                    </div>
                </TabPane>
            </Tabs>
        </Fragment>
    )

}

export default inject('responseResultStore')(observer(Response));
