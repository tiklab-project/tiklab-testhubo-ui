import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {Axios} from "tiklab-core-ui";
const {Option} = Select

const DirectorSelect = () =>{

    const [userList, setUserList] = useState([]);

    const repositoryId = sessionStorage.getItem("repositoryId")
    useEffect(async ()=>{
        const params = {
            domainId:repositoryId,
        };
        const res = await Axios.post("/dmUser/findDmUserPage",params);
        if(res.code===0){
            setUserList(res.data.dataList)
        }
    },[])


    const showOption = (data)=>{
        return data&&data.map(item=>{
            return <Option key={item.user.id} value={item.user.id}>{item.user.nickname}</Option>
        })
    }

    return(
        <Select placeholder={"无"}>
            {showOption(userList)}
        </Select>
    )
}

export default DirectorSelect;