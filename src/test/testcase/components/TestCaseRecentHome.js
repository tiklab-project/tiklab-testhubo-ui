import React, {useEffect, useState} from "react";
import {getUser} from "tiklab-core-ui";
import {inject, observer} from "mobx-react";
import {Empty, List, Skeleton, Tag} from "antd";
import emptyImg from "../../../assets/img/empty.png";
import {ApiOutlined, LaptopOutlined, TabletOutlined, TestCaseOutlined} from "@ant-design/icons";
import IconCommon from "../../../common/IconCommon";

/**
 * 最近访问的仓库
 */
const TestCaseRecentHome = (props) =>{
    const {testCaseRecentStore} = props;
    const {findTestCaseRecentList,testCaseRecent}=testCaseRecentStore;

    const userId = getUser().userId;
    const [dataList, setDataList] = useState([]);

    useEffect( async ()=>{
        let list = await findTestCaseRecentList({userId:userId})
        let newList = list.slice(0,4);

        setDataList(newList)
    },[userId])

    /**
     * 去往详情页
     */
    const toDetail = (item) => {
        let repositoryId = item.repository.id;
        let testCaseId  =  item.testCase.id

        //设置最近打开的接口
        let params = {
            repository:{id:repositoryId},
            user:{id:getUser().userId},
            testCase:{id:testCaseId},
        }

        testCaseRecent(params)

        sessionStorage.setItem("repositoryId",repositoryId)
        toTestCasePage(item.testCase)
    }


    //点击名称 先通过测试类型分类
    const toTestCasePage =(record)=>{

        switch (record.testType) {
            case "api":
            case "ui":
            case "perform":
                switchCaseType(record);
                break;
            case "function":
                sessionStorage.setItem(`functionId`,record.id);
                props.history.push(`/repository/function-detail`)
                break;
        }
    }
    //再根据不同的用例类型跳到不同的页面
    const switchCaseType = (record)=>{

        switch (record.caseType) {
            case "api-unit":
                toDetailAddRouterCommon("apiUnitId",record)
                break;
            case "api-scene":
                toDetailAddRouterCommon("apiSceneId",record)
                break;
            case "api-perform":
                toDetailAddRouterCommon("apiPerfId",record)
                break;
            case "web-scene":
                toDetailAddRouterCommon("webSceneId",record)
                break;
            case "web-perform":
                toDetailAddRouterCommon("webPerfId",record)
                break;
            case "app-scene":
                toDetailAddRouterCommon("appSceneId",record)
                break;
            case "app-perform":
                toDetailAddRouterCommon("appPerfId",record)
                break;
        }
    }
    //跳转路由
    const toDetailAddRouterCommon = (setId,record)=>{
        sessionStorage.setItem(`${setId}`,record.id);
        props.history.push(`/repository/${record.caseType}-detail`)
    }

    /**
     * 根据不同的类型展示不同图标
     */
    const showIcon = (caseType) =>{

        switch (caseType) {
            case "api-unit":
                return  <IconCommon
                    icon={"jiekou1"}
                    className="ws-img-icon"
                />

            case "api-scene":
                return  <IconCommon
                    icon={"jiekou1"}
                    className="ws-img-icon"
                />
            case "api-perform":
                return  <IconCommon
                    icon={"jiekou1"}
                    className="ws-img-icon"
                />

            case "web-scene":
                return <IconCommon
                    icon={"diannao"}
                    className="ws-img-icon"
                />
            case "web-perform":
                return <IconCommon
                    icon={"diannao"}
                    className="ws-img-icon"
                />

            case "app-scene":
                return <IconCommon
                    icon={"shouji"}
                    className="ws-img-icon"
                />
            case "app-perform":
                return <IconCommon
                    icon={"shouji"}
                    className="ws-img-icon"
                />
            default :
                return <IconCommon
                    icon={"gongneng"}
                    className="ws-img-icon"
                />
        }
    }

    return(
        <List
            className="demo-loadmore-list"
            // loading={initLoading}
            itemLayout="horizontal"
            dataSource={dataList}
            locale={{
                emptyText: <Empty
                    imageStyle={{ height: 120 }}
                    description={<span>暂无动态</span>}
                    image={emptyImg}
                />,
            }}
            renderItem={(item) => (
                <List.Item className={"home-list-api"} onClick={()=>toDetail(item)}>
                    <Skeleton avatar title={false} loading={item.loading} active>
                        <div className={"home-list-item"}>
                            {showIcon(item.testCase.caseType)}
                            <div>
                                <div className={"home-list-item-title"}>
                                    {item.testCase?.name}
                                </div>
                                <div className={"home-list-item-other"} >
                                    <div className={"home-list-item-other-text"} >仓库 :  </div>
                                    <div  className={"home-list-item-other-text"}> {item.repository.name}</div>
                                </div>
                            </div>

                        </div>

                        <div>{item.updateTime}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
        // <div className={"home-recent-box"}>
        //     {
        //         dataList&&dataList.length>0
        //             ?showRecent(dataList)
        //             : <Empty
        //                 description={<span>暂无访问</span>}
        //                 image={emptyImg}
        //             />
        //     }
        //
        // </div>
    )
}

export default inject("testCaseRecentStore")(observer(TestCaseRecentHome));