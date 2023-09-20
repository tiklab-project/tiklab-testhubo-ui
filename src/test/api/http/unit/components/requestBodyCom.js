import React, {useState} from "react";
import {Radio} from "antd";
import RequestNoBody from "./requestNoBody";

//请求体中的 类型 设置，不同类型展示不同组件
const RequestBodyCom = (props) =>{
    const {radioValue,updateFn,setRadioType} = props;

    const onChange = (type) => {
        updateFn({bodyType: type})
        setRadioType(type)
    }

    //渲染对应类型的组件
    const showItemComponent = (data)=>{
        switch(data) {
            case "none":
                return <RequestNoBody/>
            case "formdata":
                return props.form
            case "formUrlencoded":
                return props.formUrlencoded
            case "json":
                return props.json
            case "raw":
                return props.raw
            // case 'binary':
            //     return ""
        }
    }

    const bodyTypeDictionary ={
        none:"none",
        formdata:"form-data",
        formUrlencoded:"x-www-form-urlencoded",
        json:"json",
        raw:"raw",
        // binary:"binary"
    }

    //渲染body选项
    const showRadioItem = (data)=>{
        let arr = Object.keys(data)

        return arr.map(item=>{
            return <Radio value={item} key={item}>{data[item]}</Radio>
        })
    }

    return(
        <>
            <div className='request-radio'>
                <Radio.Group
                    value={radioValue}
                    onChange = {(e)=>onChange(e.target.value)}
                >
                    {showRadioItem(bodyTypeDictionary)}
                </Radio.Group>
            </div>
            <div>
                {
                    showItemComponent(radioValue)
                }
            </div>

        </>
    )
}

export default RequestBodyCom;