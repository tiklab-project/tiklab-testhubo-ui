import React, {useEffect, useState} from 'react';
import funcUnitStepStore from "../store/funcUnitStepStore";
import IconCommon from "../../../common/IconCommon";
import {observer} from "mobx-react";
import FunctionStepEdit from "./FunctionStepEdit";
import FunctionStepDrawer from "./FunctionStepDrawer";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MenuOutlined} from "@ant-design/icons";

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
                            <div className={"display-flex-gap"}>
                                <div
                                    {...provided.dragHandleProps}
                                    className={"step-item-box-icon"}
                                >
                                    <MenuOutlined />
                                </div>

                                <FunctionStepDrawer
                                    name={
                                        <div className={"step-item-content"}>
                                            <div>{item.sort}</div>
                                            <div>{item.described}</div>
                                            {item.expect?<div>{item.expect}</div>:<div className={"step-item-null"}>未设置期望</div>}
                                            {item.actual?<div>{item.actual}</div>:<div className={"step-item-null"}>未设置实际结果</div>}
                                        </div>
                                    }
                                    stepId={item.id}
                                    findList={findList}
                                />

                                <div className={"step-item-delete"}>
                                    <IconCommon
                                        className={"icon-s edit-icon"}
                                        icon={"shanchu3"}
                                        onClick={()=>deleteFuncUnitStep(item.id).then(()=>findList())}
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Draggable>
        ));
    };

    return (
        <>
            <div className={"table-list-box"}>
                <div style={{display:'flex',justifyContent:"end",margin: "0 0 10px 0"}}>
                    <FunctionStepEdit findList={findList} type={"add"}/>
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
                                {renderItems()}
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