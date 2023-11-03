import React, {useEffect, useState} from 'react';
import apiSceneStepStore from "../store/apiSceneStepStore";

import {inject, observer} from "mobx-react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MenuOutlined} from "@ant-design/icons";
import {Col, Row, Table} from "antd";
import IconCommon from "../../../../../common/IconCommon";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import ApiSceneBindUnit from "./apiSceneBindUnit";
import ApiSceneStepDrawer from "./ApiSceneStepDrawer";

const {
    findApiSceneStepList,
    deleteApiSceneStep,
    updateApiSceneStep,
} = apiSceneStepStore;


const ApiSceneStepList = ({apiUnitStore}) => {
    const {findApiUnitList} = apiUnitStore;

    const [stepList, setStepList] = useState([]);
    let repositoryId = sessionStorage.getItem("repositoryId");
    const apiSceneId = sessionStorage.getItem("apiSceneId");
    const [visible, setVisible] = useState(false);

    useEffect(async ()=> {
        await findList()
    },[apiSceneId])

    const findList = async () =>{
        let list = await findApiSceneStepList(apiSceneId)
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

        updateApiSceneStep(dragItem).then(()=>findList())
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
                            <ApiSceneStepDrawer
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
                                        <Col span={3}>
                                            {item?.apiUnit?.testCase?.name}
                                        </Col>
                                        <Col span={2}>
                                            {item?.apiUnit?.methodType}
                                        </Col>
                                        <Col span={8}>{item?.apiUnit?.path}</Col>
                                        <Col span={3}>{item.createTime}</Col>
                                        <Col style={{marginLeft: "auto",height:"20px"}}>
                                            <div className={"step-item-delete"}>
                                                <IconCommon
                                                    className={"icon-s edit-icon"}
                                                    icon={"shanchu3"}
                                                    onClick={(e)=> {
                                                        deleteApiSceneStep(item.id).then(() => findList())
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
                        </div>
                    </>
                )}
            </Draggable>
        ));
    };


    const showConnect =()=>{
        findApiUnitList({repositoryId:repositoryId,caseType: "api-unit", testType: "api"});
        setVisible(true);
    }

    return (
        <>
            <div className={"table-list-box"}>
                <div className={`${visible?"teston-hide":"teston-show"}`} >
                    <div style={{display:'flex',justifyContent:"end",margin: "10px 0"}}>
                        <IconBtn
                            className="pi-icon-btn-grey"
                            name={"关联用例"}
                            onClick={showConnect}
                        />
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
                                            <Col span={3}>名称</Col>
                                            <Col span={2}>请求类型</Col>
                                            <Col span={8}>路径</Col>
                                            <Col span={3}>创建时间</Col>
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
                <div className={`case-bind_box ${visible?"teston-show":"teston-hide"}`}>
                    <ApiSceneBindUnit
                        visible={visible}
                        setVisible={setVisible}
                        findList={findList}
                    />
                </div>
            </div>
        </>
    );
};


export default inject("apiUnitStore")(observer(ApiSceneStepList));