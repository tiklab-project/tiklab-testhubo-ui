import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MenuOutlined} from "@ant-design/icons";
import IconCommon from "../../../../common/IconCommon";
import WebSceneStepEdit from "./WebSceneStepEdit";
import WebSceneStepDrawer from "./WebSceneStepDrawer";
import {Button, Col, Dropdown, Menu, Row, Tag} from "antd";
import stepCommonStore from "../../../common/stepcommon/store/StepCommonStore";
import {CASE_TYPE} from "../../../../common/dictionary/dictionary";
import IfJudgmentEdit from "../../../common/ifJudgment/components/IfJudgmentEdit";
import IconBtn from "../../../../common/iconBtn/IconBtn";
import {IfStep} from "../../../common/caseCommonFn";

const {findStepCommonList,updateStepCommon,deleteStepCommon} = stepCommonStore

const WebSceneStepList = (props) => {
    const {webSceneId,webSceneStore} = props
    const [stepList, setStepList] = useState([]);
    const {findWebScene} = webSceneStore

    useEffect(async ()=> {
        await findList()
    },[webSceneId])

    const findList = async () =>{
        let list = await findStepCommonList({caseId:webSceneId,caseType:CASE_TYPE.WEB_SCENE})
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

    const caseStep = (item,provided)=>{
        const step =  item?.webSceneStep

        return(<WebSceneStepDrawer
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
                        <div>{step?.name}</div>
                    </Col>
                    <Col span={15}>
                        {step?.actionType
                            ?<div className={"display-flex-gap"}>
                                <div style={{fontSize:"12px",color:"#aaa" }}>操作: </div>
                                <div >{step?.actionType}</div>

                                {
                                    step?.parameter
                                        ?<>
                                            <div style={{fontSize:"12px",color:"#aaa" }}>参数: </div>
                                            <div>{step?.parameter}</div>
                                        </>
                                        :null
                                }

                            </div>
                            :null

                        }
                        {step?.location
                            ?<div className={"display-flex-gap "}>
                                <div style={{fontSize:"12px",color:"#aaa" }}>定位: </div>
                                <div>{step?.location}</div>
                                {
                                    step?.locationValue
                                        ?<>
                                            <div style={{fontSize:"12px",color:"#aaa" }}>参数: </div>
                                            <div>{step?.locationValue}</div>
                                        </>
                                        :null
                                }
                            </div>
                            :null
                        }

                    </Col>
                    <Col style={{marginLeft: "auto",height:"20px"}}>
                        <IconCommon
                            className={"icon-s edit-icon"}
                            icon={"shanchu3"}
                            onClick={(e)=> {
                                deleteStepFn(item.id)
                                e.stopPropagation()
                            }}
                        />
                    </Col>

                </Row>
            }
            stepId={item.id}
            findList={findList}
        />)
    }

    const deleteStepFn = (id)=>{
        deleteStepCommon(id, CASE_TYPE.WEB_SCENE).then(async () => {
            await findList()
            await findWebScene(webSceneId)
        })
    }

    /**
     * 步骤
     */
    const renderItems = () => {
        return stepList.map((item, index) =>{

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
                                    ?<IfStep item={item} provided={provided} deleteStepFn={deleteStepFn} findStepList={findList} />
                                    :caseStep(item,provided)
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
            <Menu.ItemGroup  title="用例步骤" key={"case-Group"}>
                <Menu.Item><WebSceneStepEdit findList={findList}  /></Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup  title="逻辑步骤" key={"other-Group"}>
                <Menu.Item><IfJudgmentEdit caseId={webSceneId} findList={findList}/> </Menu.Item>
            </Menu.ItemGroup>
        </Menu>
    );

    return (
        <>
            <div className={"table-list-box"}>
                  <div className={"display-flex-between"} style={{margin: "10px 0"}}>
                     <div> 共 {stepList.length} 个步骤</div>
                      <Dropdown
                          overlay={menu}
                          placement="bottomRight"
                          overlayStyle={{width:"150px"}}
                      >
                         <div>
                             <IconBtn
                                 className="pi-icon-btn-grey"
                                 name={"添加步骤"}
                             />
                         </div>
                     </Dropdown>
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
                                    >
                                        <Col span={1}>
                                            <MenuOutlined />
                                        </Col>
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


export default inject("webSceneStore")(observer(WebSceneStepList));