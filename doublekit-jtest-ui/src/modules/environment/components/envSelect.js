/**
 * @description：
 * @date: 2021-08-11 10:00
 */
import React, {useEffect, useState} from 'react';
import {inject,observer} from "mobx-react";
import EvnMana from './environment'
import {Select} from "antd";
import './envStyle.scss'
const {Option} = Select;

const EnvSelect = (props) => {
    const {environmentStore,repositoryStore} = props;
    const {findEnvironmentList,environmentList} = environmentStore;

    const {findRepository,updateRepository,envUrl} = repositoryStore;

    const repositoryId = localStorage.getItem('repositoryId')

    useEffect(()=>{
        findEnvironmentList(repositoryId).then(()=>findRepository(repositoryId))
    },[repositoryId])

    //
    const onChange = (value) => {
        if(props.belong==='testcaseEnv'){
            const param = {
                id:repositoryId,
                testEnvironment:{
                    id:value
                }
            }
            updateRepository(param).then(()=>findRepository(repositoryId))
        }
    }

    return(
        <>
        <Select
            className={'env-select'}
            onChange={onChange}
            defaultValue={envUrl}
            dropdownRender={(list)=>
                <div>
                    {list}
                    <EvnMana name={'环境管理'}/>
                </div>
            }
        >
            {
                environmentList&&environmentList.map((item)=> {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                })
            }
        </Select></>
    )
}

export default inject('environmentStore','repositoryStore')(observer(EnvSelect));
