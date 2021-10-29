import React, {useEffect} from "react";
import {inject, observer} from "mobx-react";
import { UnorderedListOutlined,MacCommandOutlined } from '@ant-design/icons';
import {Menu} from 'antd';
const {SubMenu} = Menu

const RepositoryNameTitle = (props) => {
    const {repositoryStore} = props;
    const {findRepositoryPage,findRepository,repositoryList,repositoryName} = repositoryStore;
    const repositoryId = localStorage.getItem('repositoryId');

    // useEffect(()=>{
    //     findRepositoryPage(repositoryId)
    // },[repositoryId])
    //
    // useEffect(()=>{
    //     findRepository(repositoryId).then(res=>{
    //
    //     })
    // },[repositoryId])
    //
    // const ListView = (data) =>{
    //     return data&&data.map(item=>{
    //         return <Menu.Item onClick={()=>toggleRepository(item.id)} key={item.id}>{item.name}</Menu.Item>
    //     })
    // }
    //
    // const toggleRepository = (id) => {
    //     localStorage.setItem('repositoryId',id);
    //     props.history.push('/repositorypage');
    //     // setRepId(id)
    // }
    //


    return(
        <div className='repository-title-box'>
            <div className={'repository-name-box'}>
                <svg className="repository-name-icon" aria-hidden="true">
                    <use xlinkHref= {`#icon-home`}></use>
                </svg>
                <span>{repositoryName}</span>
                <svg className="repository-name-icon" aria-hidden="true">
                    <use xlinkHref= {`#icon-menu`}></use>
                </svg>
            </div>
            <div className={'repository-name-menu'}>
                list
            </div>
        </div>

    )
}

export default inject('repositoryStore')(observer(RepositoryNameTitle))