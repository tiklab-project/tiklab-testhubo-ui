import React, {useEffect, useState} from "react";
import IconCommon from "../common/IconCommon";
import {List, Select, Skeleton} from "antd";
import PaginationCommon from "../common/pagination/Page";
import {inject, observer} from "mobx-react";
import {Axios, getUser} from "tiklab-core-ui";

const {Option} = Select;

/**
 * 动态详情页面
 */
const DynamicDetail = (props) =>{
    const {repositoryStore} = props;
    const {findRepositoryJoinList,} = repositoryStore;

    const [actionList, setActionList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataList, setDataList] = useState();
    const [repositoryIdList, setRepositoryIdList] = useState([]);

    useEffect(async ()=>{
        let content
        if(repositoryIdList.length===0){
            let idList=[];
            let res = await findRepositoryJoinList({userId: getUser().userId})
            res.map(item=>{
                idList.push( item.id)
            })
            content={repositoryId:idList}

            setRepositoryIdList(idList)
        }else {
            content={repositoryId:repositoryIdList}
        }

        let param = {
            content:content,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })
    },[])

    /**
     * 查询操作筛选下拉框
     */
    useEffect( async () =>{
        let res = await Axios.post("/oplog/type/findlogtypepage",{"bgroup":"teston"})
        if(res.code===0&&res.data.dataList){
            setActionList(res.data.dataList)
        }
    },[])

    /**
     * 查询日志列表
     */
    const findList = async (value) => {
        const params = {
            ...value,
            bgroup:"teston"
        }
        let res =  await  Axios.post('/oplog/findlogpage', params);
        setTotalPage(res.totalPage)
        setCurrentPage(res.currentPage)

        return res.data.dataList
    };


    /**
     * 返回首页
     */
    const backToHome = () => props.history.push("/home")

    const [typeSelect, setTypeSelect] = useState();
    const [actionSelect, setActionSelect] = useState();

    /**
     * 类型筛选
     */
    const typeSelectFn =(type) =>{
        let  param = {
            content:{repositoryId:repositoryIdList},
            module:type,
            actionType:actionSelect,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })

        setTypeSelect(type);
    }

    /**
     * 操作筛选
     */
    const actionSelectFn = (action) =>{
        let  param = {
            content:{repositoryId:repositoryIdList},
            actionType:action,
            module:typeSelect,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })

        setActionSelect(action)
    }

    /**
     * 分页改变
     */
    const changePage = (current) =>{
        let  param = {
            content:{repositoryId:repositoryIdList},
            pageParam: {
                pageSize: 10,
                currentPage:current
            }
        }

        findList(param).then(res => {
            setDataList(res)
        })
    }

    return(
        <div className={"dynamic-detail"}>
            <div className={"dynamic-detail-box"}>
                <div className={"dynamic-detail-header"} >
                    <IconCommon
                        icon={"31fanhui1"}
                        style={{margin:"0 10px","cursor": "pointer"}}
                        className={"icon-s"}
                        onClick={backToHome}
                    />
                    <span style={{"fontWeight":"600","fontSize":"16px"}}>动态详情</span>
                </div>
                <div className={"dynamic-select-box"}>
                    <Select
                        // defaultValue={null}
                        placeholder={"类型"}
                        className={"dynamic-select-box-item"}
                        onChange={typeSelectFn}
                        options={[
                            {
                                value: null,
                                label: '所有',
                            },{
                                value: 'repository',
                                label: '仓库',
                            },
                            // {
                            //     value: 'category',
                            //     label: '分组',
                            // },{
                            //     value: 'api',
                            //     label: '接口',
                            // },
                        ]}
                    />
                    <Select
                        // defaultValue={null}
                        placeholder={"操作"}
                        className={"dynamic-select-box-item"}
                        onChange={actionSelectFn}
                    >
                        <Option key={"default"} value={null} >所有</Option>
                        {
                            actionList.map(item=>{
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <div className={"dynamic-detail-box-list"}>
                    <List
                        className="demo-loadmore-list"
                        itemLayout="horizontal"
                        dataSource={dataList}
                        renderItem={(item) => (
                            <List.Item >
                                <List.Item.Meta
                                    description={<div  dangerouslySetInnerHTML={{__html: item.data}} />}
                                />
                                <div>{item.timestamp}</div>
                            </List.Item>
                        )}
                    />
                    <div>
                        <PaginationCommon
                            currentPage={currentPage}
                            totalPage={totalPage}
                            changePage={changePage}
                        />
                    </div>
                </div>


            </div>
        </div>
    )
}

export default inject("repositoryStore")(observer(DynamicDetail));