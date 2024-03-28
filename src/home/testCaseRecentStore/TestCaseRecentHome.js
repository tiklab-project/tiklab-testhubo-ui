import React, {useEffect, useState} from "react";
import {getUser} from "thoughtware-core-ui";
import {observer} from "mobx-react";
import {Empty, List, Skeleton} from "antd";
import emptyImg from "../../assets/img/empty.png";
import IconCommon from "../../common/IconCommon";

import testCaseRecentStore from "./TestCaseRecentStore";
import {CASE_TYPE} from "../../common/dictionary/dictionary";

/**
 * 最近访问的项目
 */
const TestCaseRecentHome = (props) =>{
    const {findTestCaseRecentList,testCaseRecent}=testCaseRecentStore;

    const userId = getUser().userId;
    const [dataList, setDataList] = useState([]);

    useEffect( async ()=>{
        let list = await findTestCaseRecentList({userId:userId})
        if(list==null) return
        let newList = list.slice(0,8);

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

        switchCaseType(item.testCase)
    }

    //根据不同的用例类型跳到不同的页面
    const switchCaseType = (record)=>{

        switch (record.caseType) {
            case CASE_TYPE.API_UNIT:
                toCaseDetail("apiUnitId",record)
                break;
            case CASE_TYPE.API_SCENE:
                toCaseDetail("apiSceneId",record)
                break;
            case CASE_TYPE.API_PERFORM:
                toCaseDetail("apiPerfId",record)
                break;
            case CASE_TYPE.WEB_SCENE:
                toCaseDetail("webSceneId",record)
                break;
            case CASE_TYPE.APP_SCENE:
                toCaseDetail("appSceneId",record)
                break;
            case CASE_TYPE.FUNCTION:
                toCaseDetail("functionId",record)
                break;
        }
    }
    //跳转路由
    const toCaseDetail = (setId,record)=>{
        sessionStorage.setItem(`${setId}`,record.id);
        props.history.push(`/repository/${record.caseType}/${record.id}`)
    }

    /**
     * 根据不同的类型展示不同图标
     */
    const showIcon = (caseType) =>{

        switch (caseType) {
            case "api-unit":
                return  <IconCommon
                    icon={"api1"}
                    className="ws-img-icon"
                />

            case "api-scene":
                return  <IconCommon
                    icon={"api1"}
                    className="ws-img-icon"
                />
            case "api-perform":
                return  <IconCommon
                    icon={"api1"}
                    className="ws-img-icon"
                />

            case "web-scene":
                return <IconCommon
                    icon={"diannao1"}
                    className="ws-img-icon"
                />
            case "web-perform":
                return <IconCommon
                    icon={"diannao1"}
                    className="ws-img-icon"
                />

            case "app-scene":
                return <IconCommon
                    icon={"shouji1"}
                    className="ws-img-icon"
                />
            case "app-perform":
                return <IconCommon
                    icon={"shouji1"}
                    className="ws-img-icon"
                />
            default :
                return <IconCommon
                    icon={"gongneng1"}
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
                            {showIcon(item?.testCase?.caseType)}
                            <div>
                                <div className={"home-list-item-title"}>
                                    {item.testCase?.name}
                                </div>
                                <div className={"home-list-item-other"} >
                                    <div  className={"home-list-item-other-text"}> {item?.repository?.name}</div>
                                </div>
                            </div>

                        </div>

                        <div>{item.updateTime}</div>
                    </Skeleton>
                </List.Item>
            )}
        />
    )
}

export default observer(TestCaseRecentHome);