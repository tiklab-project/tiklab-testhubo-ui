/*
 * @Description: 详情页中的点击编辑按钮显示编辑
 */
import React, {useRef, useState} from "react";
import {Form, Input,InputNumber} from "antd";
import './toggleItemEdit.scss';

const ToggleItemEdit = (props) =>{
    const {editValue,itemName,updataFn,allData,label,showUI} = props;
    const inputRef = useRef(null);
    //切换展示与编辑
    const [edit, setEdit] = useState(false);
    const [allValue, setAllValue] = useState();
    const [newEdit, setNewEdit] = useState();
    //判断获取焦点后是否改变值
    const [isEdit, setIsEdit] = useState(false);

    //编辑后存入新值
    const nameChange = (e) => {
        setIsEdit(true)
        let obj = {};
        if(allData.type==="APP"){
            let app = {};
            app[itemName]=e
            obj={
                testCaseApp:{
                    ...allData.testCaseApp,
                    ...app
                }
            }
        }else {
            obj[itemName] = e;
        }
        setNewEdit(e)
        setAllValue({
            ...allData,
            ...obj
        })
    }

    //input框失去焦点保存
    const inputBlur = () =>{
        debugger
        if(isEdit){
            updataFn(allValue)
        }
        setEdit(false)
    }

    //点击编辑图标自动获取焦点
    const clickIcon = () =>{
        setEdit(true)
        const timer = setInterval(() => {
            if(inputRef.current) {
                inputRef.current.focus()
                clearInterval(timer)
            }
        }, 100)
    }

    //根据传入的类型展示不同的组件
    const toggleUI = (showUI) =>{
        switch (showUI){
            case 'input':
                return <Input
                    ref={inputRef}
                    autoComplete="off"
                    onChange={(e)=>nameChange(e.target.value)}
                    onBlur={inputBlur}
                />
            case 'number':
               return <InputNumber
                   min={1}
                   max={100}
                   ref={inputRef}
                   onChange={nameChange}
                   onBlur={inputBlur}
                />
        }
    }

    return(
        <div>
            {
                !edit && <div className={`tie-item `}>
                    {
                        label?<span>{label}<span className={'tie-item-dot'}>:</span></span>:null
                    }
                    <span className={`${label?'':'tie-item-title'}`}>{newEdit?newEdit:editValue}</span>
                    <svg className="tie-edit-icon" aria-hidden="true" onClick={clickIcon}>
                        <use xlinkHref= {`#icon-bianjishuru-xianxing`}></use>
                    </svg>
                </div>
            }
            {
                edit && <>
                    <Form.Item
                        label={label?label:null}
                        name={itemName}
                    >
                        {toggleUI(showUI)}
                    </Form.Item>
                </>
            }
        </div>
    )

}

export default ToggleItemEdit