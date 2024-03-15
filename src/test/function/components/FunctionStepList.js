import React, {useEffect, useState} from 'react';
import IconCommon from "../../../common/IconCommon";
import {observer} from "mobx-react";
import FunctionStepEdit from "./FunctionStepEdit";
import FunctionStepDrawer from "./FunctionStepDrawer";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MenuOutlined} from "@ant-design/icons";
import {Row, Col} from "antd";
import stepCommonStore from "../../common/stepcommon/store/StepCommonStore";
import {CASE_TYPE} from "../../../common/dictionary/dictionary";

const {findStepCommonList,updateStepCommon,deleteStepCommon} = stepCommonStore

const FunctionStepList = ({functionId}) => {

    const [stepList, setStepList] = useState([]);

    useEffect(async ()=> {
        await findList()
    },[functionId])

    const findList = async () =>{
        let list = await findStepCommonList({caseId:functionId,caseType:CASE_TYPE.FUNCTION})
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
            let step = item.funcUnitStep
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
                                            <div>{step?.described}</div>
                                        </Col>
                                        <Col span={6}>
                                            {step?.expect?<div>{step?.expect}</div>:null}
                                        </Col>
                                        <Col span={6}>
                                            {step?.actual?<div>{step?.actual}</div>:null}
                                        </Col>
                                        <Col style={{marginLeft: "auto",height:"20px"}}>
                                            <IconCommon
                                                className={"icon-s edit-icon"}
                                                icon={"shanchu3"}
                                                onClick={(e)=> {
                                                    deleteStepCommon(item.id, CASE_TYPE.FUNCTION).then(() => findList())
                                                    e.stopPropagation()
                                                }}
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
        });
    };



    return (
        <>
            <div className={"table-list-box"}>
                <div className={"display-flex-between"} style={{margin: "10px 0"}}>
                     <div> 共 {stepList.length} 个步骤</div>

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
                                <div className={"step-item-box"}>
                                    <Row
                                        gutter={[10,0]}
                                        className={"step-item-content-header"}
                                        style={{padding: "5px 10px"}}
                                    >
                                        <Col span={1}>
                                            <MenuOutlined />
                                        </Col>
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