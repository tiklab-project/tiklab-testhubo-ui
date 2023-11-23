import React, {useEffect, useState} from 'react';

import {observer} from "mobx-react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MenuOutlined} from "@ant-design/icons";
import IconCommon from "../../../../common/IconCommon";
import AppSceneStepEdit from "./AppSceneStepEdit";
import AppSceneStepDrawer from "./AppSceneStepDrawer";
import {Button, Col, Dropdown, Menu, Row, Tag} from "antd";
import stepCommonStore from "../../../common/stepcommon/store/StepCommonStore";
import {CASE_TYPE} from "../../../../common/dictionary/dictionary";
import IfJudgmentDrawer from "../../../common/ifJudgment/components/IfJudgmentDrawer";
import IfJudgmentEdit from "../../../common/ifJudgment/components/IfJudgmentEdit";

const {findStepCommonList,updateStepCommon,deleteStepCommon} = stepCommonStore

const AppSceneStepList = () => {

    const [stepList, setStepList] = useState([]);
    const appSceneId = sessionStorage.getItem('appSceneId')

    useEffect(async ()=> {
        await findList()
    },[appSceneId])

    const findList = async () =>{
        let list = await findStepCommonList({caseId:appSceneId,caseType:CASE_TYPE.APP})
        setStepList(list)
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = Array.from(stepList);
        const [dragItem] = reorderedItems.splice(result.source.index, 1);

        let param = {
            //排序设置成当前位置
            sort:result.destination.index,
            //源排序位置
            oldSort:result.source.index,
            id:dragItem.id,
            caseId:dragItem.caseId
        }

        updateStepCommon(param).then(()=>findList())
    };

    const renderItems = () => {
        return stepList.map((item, index) => {
            let step = item.appSceneStep

            return <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                    <>
                        <div
                            className={"step-item-box"}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            style={{
                                backgroundColor: snapshot.isDragging ? 'var(--pi-bg-grey-200)' : 'white',
                                ...provided.draggableProps.style,
                            }}
                        >
                            {
                                item.type==="if"
                                    ? <IfJudgmentDrawer
                                        name={
                                            <Row
                                                // gutter={[10,0]}
                                                className={"step-item-content"}
                                            >
                                                <Col span={1}>
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className={"step-item-box-icon"}
                                                    >
                                                        <MenuOutlined/>
                                                    </div>
                                                </Col>
                                                <Col span={1}>
                                                    <div>{item.sort}</div>
                                                </Col>
                                                <Col span={4}>
                                                    <Tag color={"processing"}>if 条件判断</Tag>
                                                </Col>
                                                <Col style={{marginLeft: "auto", height: "20px"}}>
                                                    <div className={"step-item-delete"}>
                                                        <IconCommon
                                                            className={"icon-s edit-icon"}
                                                            icon={"shanchu3"}
                                                            onClick={(e) => {
                                                                deleteStepCommon(item.id, CASE_TYPE.APP).then(() => findList())
                                                                e.stopPropagation()
                                                            }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        }
                                        stepId={item.id}
                                        findList={findList}
                                    />
                                    : <AppSceneStepDrawer
                                        name={
                                            <Row
                                                // gutter={[10,0]}
                                                className={"step-item-content"}
                                            >
                                                <Col span={1}>
                                                    <div
                                                        {...provided.dragHandleProps}
                                                        className={"step-item-box-icon"}
                                                    >
                                                        <MenuOutlined/>
                                                    </div>
                                                </Col>
                                                <Col span={1}>
                                                    <div>{item.sort}</div>
                                                </Col>
                                                <Col span={4}>
                                                    <div>{step?.name}</div>
                                                </Col>
                                                <Col span={15}>
                                                    {step?.actionType
                                                        ? <div className={"display-flex-gap"}>
                                                            <div style={{fontSize: "12px", color: "#aaa"}}>操作:</div>
                                                            <div>{step?.actionType}</div>

                                                            {
                                                                step?.parameter
                                                                    ? <>
                                                                        <div style={{fontSize: "12px", color: "#aaa"}}>参数:</div>
                                                                        <div>{step?.parameter}</div>
                                                                    </>
                                                                    : null
                                                            }

                                                        </div>
                                                        : null
                                                    }
                                                    {step?.location
                                                        ? <div className={"display-flex-gap "}>
                                                            <div style={{fontSize: "12px", color: "#aaa"}}>定位:</div>
                                                            <div>{step?.location}</div>
                                                            {
                                                                step?.locationValue
                                                                    ? <>
                                                                        <div style={{fontSize: "12px", color: "#aaa"}}>参数:</div>
                                                                        <div>{step?.locationValue}</div>
                                                                    </>
                                                                    : null
                                                            }
                                                        </div>
                                                        : null
                                                    }

                                                </Col>
                                                <Col style={{marginLeft: "auto", height: "20px"}}>
                                                    <div className={"step-item-delete"}>
                                                        <IconCommon
                                                            className={"icon-s edit-icon"}
                                                            icon={"shanchu3"}
                                                            onClick={(e) => {
                                                                deleteStepCommon(item.id, CASE_TYPE.APP).then(() => findList())
                                                                e.stopPropagation()
                                                            }}
                                                        />
                                                    </div>
                                                </Col>

                                            </Row>
                                        }
                                        stepId={item.id}
                                        findList={findList}
                                    />
                            }
                        </div>
                    </>
                )}
            </Draggable>
        });
    };


    //添加步骤
    const menu = (
        <Menu>
            <Menu.Item><AppSceneStepEdit findList={findList} /></Menu.Item>
            <Menu.Item><IfJudgmentEdit caseId={appSceneId} findList={findList}/> </Menu.Item>
        </Menu>
    );

    return (
        <>
            <div className={"table-list-box"}>
                <div style={{display:'flex',justifyContent:"space-between",margin: "10px 0"}}>
                    <Dropdown
                        overlay={menu}
                        placement="bottom"
                    >
                        <Button>添加步骤</Button>
                    </Dropdown>
                    <div style={{fontWeight:"bold"}}>步骤: ({stepList.length})</div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <div className={"step-item-box"}>
                                    <Row
                                        gutter={[10,0]}
                                        style={{padding: "8px",flexGrow:1}}
                                        className={"step-item-content-header"}
                                    >
                                        <Col span={1}/>
                                        <Col span={1}>序号</Col>
                                        <Col span={4}>名称</Col>
                                        <Col span={15}>信息</Col>
                                        <Col style={{marginLeft: "auto",height:"20px"}}>操作</Col>
                                    </Row>
                                </div>
                                <div
                                    style={{
                                        borderBottom: "1px solid #e4e4e4",
                                        borderTop: "1px solid #e4e4e4",
                                    }}
                                >
                                    {renderItems()}
                                </div>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </>
    );
};


export default observer(AppSceneStepList);