import React, {useEffect, useState} from "react";
import {Col, Empty, Row, Spin} from "antd";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import "./homestyle.scss"
import RepositoryIcon from "../common/RepositoryIcon";

/**
 * 最近访问的项目
 */
const RepositoryRecentHome = (props) =>{
    const {repositoryStore} = props;
    const {findRepositoryRecentList,repositoryRecent}=repositoryStore;

    const [dataList, setDataList] = useState([]);
    const [spinning, setSpinning] = useState(true);

    const userId = getUser().userId;

    useEffect(async ()=>{
        let list = await findRepositoryRecentList(userId)

        let newList
        if(list&&list.length>4){
            newList = list.slice(0,4);
        }else {
            newList=list;
        }
        setSpinning(false)
        setDataList(newList)
    },[userId])

    /**
     * 去往详情页
     */
    const toDetail = (repositoryId) => {
        sessionStorage.setItem("repositoryId",repositoryId)
        //给左侧导航设置一个选择项
        localStorage.setItem("leftRouter",`/project/${repositoryId}/testcase`)

        let params = {
            repository: {id:repositoryId},
            userId:userId
        }
        repositoryRecent(params);

        props.history.push(`/project/${repositoryId}/testcase`);
    }

    /**
     * 渲染最近访问项
     */
    const showRecent=(list)=>{
        return list&&list.map(item=>{
            return(
                <Col span={6} key={item.id}>
                    <div key={item.id} className={"home-recent-item"} onClick={()=>toDetail(item.id)}>
                        <div className={"home-recent-item-left"}>
                            <RepositoryIcon iconUrl={item.iconUrl} className={"repository-icon"}/>
                            <div className={"home-recent-item-left-name text-ellipsis"}>{item.name}</div>
                        </div>
                        <div style={{display:"flex","justifyContent":"space-between"}}>
                            <div className={"home-recent-item-num"}>
                                <div className={"home-recent-item-num-title"}>测试计划</div>
                                <div>{item.planNum}</div>
                            </div>
                            <div className={"home-recent-item-num"}>
                                <div className={"home-recent-item-num-title"}>成员数</div>
                                <div>{item.memberNum}</div>
                            </div>
                        </div>
                    </div>
                </Col>

            )
        })
    }



    return(
        <Spin spinning={spinning}>
            <div className={"home-recent-box"}>
                <Row gutter={[20,20]}>
                    {
                        dataList&&dataList.length>0
                            ?<>{showRecent(dataList)}</>
                            :  !spinning
                                    ?<Empty description={<span>暂无访问</span>}/>
                                    :<div style={{height: 110}}/>
                    }
                </Row>

            </div>

        </Spin>

    )
}

export default inject("repositoryStore")(observer(RepositoryRecentHome));