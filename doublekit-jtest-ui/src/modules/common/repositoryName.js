import React, {useEffect, useState} from "react";
import {inject, observer} from "mobx-react";
import { UnorderedListOutlined,MacCommandOutlined } from '@ant-design/icons';
import {Menu} from 'antd';
const {SubMenu} = Menu

const RepositoryName = (props) => {
    const {repositoryStore} = props;
    const {findRepositoryPage,findRepository,repositoryList,repositoryName} = repositoryStore;
    const repositoryId = localStorage.getItem('repositoryId');

    useEffect(()=>{
        findRepositoryPage(repositoryId)
    },[repositoryId])

    useEffect(()=>{
        findRepository(repositoryId)
    },[repositoryId])

    const ListView = (data) =>{
        return data&&data.map(item=>{
            return <Menu.Item onClick={()=>toggleRepository(item.id)} key={item.id}>{item.name}</Menu.Item>
        })
    }

    const toggleRepository = (id) => {
        localStorage.setItem('repositoryId',id);
        props.history.push('/repositorypage');
        // setRepId(id)
    }

    return(
        <div className='repository-title'>
            {/*<div>log</div>*/}
            {/*<div>{name}</div>*/}
            <Menu mode="vertical" expandIcon={<UnorderedListOutlined />}>
                <SubMenu key="submenu" icon={<MacCommandOutlined />} title={repositoryName}>
                    {
                        repositoryList&&repositoryList.length?ListView(repositoryList):''
                    }
                </SubMenu>
            </Menu>
        </div>

    )
}

export default inject('repositoryStore')(observer(RepositoryName))