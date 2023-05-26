import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {inject, observer} from "mobx-react";
const {Option} = Select

const ProjectSelect = (props)=>{
    const {workItemStore,clickProject} = props
    const {findProjectList} = workItemStore;

    const [projectList, setProjectList] = useState([]);
    useEffect(()=>{
        findProjectList({}).then(list=>{
            setProjectList(list)
        })
    },[])

    const showOption = (list) =>{
        return list&&list.map((item,index)=>(
            <Option
                key={index}
                value={item.id}
            >
                {item.name}
            </Option>
        ))
    }

    return(
        <Select
            style={{flex: 1,}}
            placeholder="选择项目"
            onSelect={clickProject}
        >
            {
                showOption(projectList)
            }
        </Select>
    )
}

export default  inject("workItemStore")(observer(ProjectSelect));