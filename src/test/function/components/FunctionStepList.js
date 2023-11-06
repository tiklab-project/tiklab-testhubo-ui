import React, {useEffect, useState} from 'react';
import funcUnitStepStore from "../store/funcUnitStepStore";
import IconCommon from "../../../common/IconCommon";
import {observer} from "mobx-react";
import FunctionStepEdit from "./FunctionStepEdit";
import FunctionStepDrawer from "./FunctionStepDrawer";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MenuOutlined} from "@ant-design/icons";
import {Row,Col} from "antd";

const {
    findFuncUnitStepList,
    deleteFuncUnitStep,
    updateFuncUnitStep,
} = funcUnitStepStore;



const FunctionStepList = () => {

    const [stepList, setStepList] = useState([]);
    const funcUnitId = sessionStorage.getItem('functionId')

    useEffect(async ()=> {
        await findList()
    },[funcUnitId])

    const findList = async () =>{
        let list = await findFuncUnitStepList(funcUnitId)
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

        updateFuncUnitStep(dragItem).then(()=>findList())
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
                            <FunctionStepDrawer
                                name={
                                    <Row className={"step-item-content"}>
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
                                        <Col span={7}>
                                            <div>{item.described}</div>
                                        </Col>
                                        <Col span={6}>
                                            {item.expect?<div>{item.expect}</div>:null}
                                        </Col>
                                        <Col span={6}>
                                            {item.actual?<div>{item.actual}</div>:null}
                                        </Col>
                                        <Col style={{marginLeft: "auto",height:"20px"}}>
                                            <IconCommon
                                                className={"icon-s edit-icon"}
                                                icon={"shanchu3"}
                                                onClick={()=>deleteFuncUnitStep(item.id).then(()=>findList())}
                                            />
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
                    <FunctionStepEdit findList={findList} type={"add"}/>
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
                                        className={"step-item-content-header"}
                                        style={{padding: "5px 10px"}}
                                    >
                                        <Col span={1}/>
                                        <Col span={1}>序号</Col>
                                        <Col span={7}>描述</Col>
                                        <Col span={6}>期望</Col>
                                        <Col span={6}>结果</Col>
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


export default observer(FunctionStepList);