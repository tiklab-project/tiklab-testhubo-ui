/**
 * @description：
 * @date: 2021-08-26 17:02
 */
import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import TaskResultDetail from "./taskResultDetail";
import { Menu } from 'antd';

const { SubMenu } = Menu;

const TaskResult = (props) => {

    const {performanceStore} = props;

    const {mergeList,getTestData}  = performanceStore;

    const [dataList,setDataList] = useState()

    useEffect(() => {
            console.log(mergeList)
    },[mergeList])

    //左侧显示名称
    const nameView = (data) => {
        return(
            <Menu mode="inline">
                {

                    data&&data.map((item,index)=>{
                        let testSteps = item.perTestSteps
                        return <SubMenu key={index} title={item.testCaseName}>
                            {
                                testSteps.map((childItem,childIndex)=>{
                                    return <Menu.Item key={index+"child"+childIndex} onClick={()=>selectItem(childItem)}>
                                        {childItem.testStepName}
                                    </Menu.Item>
                                })
                            }
                        </SubMenu>
                    })
                }
            </Menu>
        )
    }

    //
    const selectItem = (data) => {
        getTestData(data)
    }

    return(
        <div className={'task-result'}>
            <div className={'task-result-left'}>
                {nameView(mergeList)}
            </div>
            <TaskResultDetail/>
        </div>
    )
}

export default inject('performanceStore')(observer(TaskResult));
