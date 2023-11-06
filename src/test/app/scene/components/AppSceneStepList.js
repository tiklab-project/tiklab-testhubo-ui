import React, {useEffect, useState} from 'react';
import appSceneStepStore from "../store/appSceneStepStore";

import {observer} from "mobx-react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MenuOutlined} from "@ant-design/icons";
import IconCommon from "../../../../common/IconCommon";
import AppSceneStepEdit from "./AppSceneStepEdit";
import AppSceneStepDrawer from "./AppSceneStepDrawer";
import {Col, Row} from "antd";

const {
    findAppSceneStepList,
    deleteAppSceneStep,
    updateAppSceneStep,
} = appSceneStepStore;


const AppSceneStepList = () => {

    const [stepList, setStepList] = useState([]);
    const appSceneId = sessionStorage.getItem('appSceneId')

    useEffect(async ()=> {
        await findList()
    },[appSceneId])

    const findList = async () =>{
        let list = await findAppSceneStepList(appSceneId)
        setStepList(list)
    }

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const reorderedItems = Array.from(stepList);
        const [dragItem] = reorderedItems.splice(result.source.index, 1);

        //排序设置成当前位置
        dragItem.sort=result.destination.index
        //源排序位置
        dragItem.oldSort = result.source.index

        updateAppSceneStep(dragItem).then(()=>findList())
    };

    const renderItems = () => {
        return stepList.map((item, index) => (
            <Draggable key={item.id} draggableId={item.id} index={index}>
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
                            <AppSceneStepDrawer
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
                                                <MenuOutlined />
                                            </div>
                                        </Col>
                                        <Col span={1}>
                                            <div>{item.sort}</div>
                                        </Col>
                                        <Col span={4}>
                                            <div>{item.name}</div>
                                        </Col>
                                        <Col span={15}>
                                            {item.actionType
                                                ?<div className={"display-flex-gap"}>
                                                    <div style={{fontSize:"12px",color:"#aaa" }}>操作: </div>
                                                    <div >{item.actionType}</div>

                                                    {
                                                        item.parameter
                                                            ?<>
                                                                <div style={{fontSize:"12px",color:"#aaa" }}>参数: </div>
                                                                <div>{item.parameter}</div>
                                                            </>
                                                            :null
                                                    }

                                                </div>
                                                :null

                                            }
                                            {item.location
                                                ?<div className={"display-flex-gap "}>
                                                    <div style={{fontSize:"12px",color:"#aaa" }}>定位: </div>
                                                    <div>{item.location}</div>
                                                    {
                                                        item.locationValue
                                                            ?<>
                                                                <div style={{fontSize:"12px",color:"#aaa" }}>参数: </div>
                                                                <div>{item.locationValue}</div>
                                                            </>
                                                            :null
                                                    }
                                                </div>
                                                :null
                                            }

                                        </Col>
                                        <Col style={{marginLeft: "auto",height:"20px"}}>
                                            <div className={"step-item-delete"}>
                                                <IconCommon
                                                    className={"icon-s edit-icon"}
                                                    icon={"shanchu3"}
                                                    onClick={()=>deleteAppSceneStep(item.id).then(()=>findList())}
                                                />
                                            </div>
                                        </Col>

                                    </Row>
                                }
                                stepId={item.id}
                                findList={findList}
                            />
                        </div>
                    </>
                )}
            </Draggable>
        ));
    };

    return (
        <>
            <div className={"table-list-box"}>
                <div style={{display:'flex',justifyContent:"space-between",margin: "10px 0"}}>
                    <AppSceneStepEdit findList={findList} />
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