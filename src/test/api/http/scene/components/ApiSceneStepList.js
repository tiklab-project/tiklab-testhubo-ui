import React, {useEffect, useState} from 'react';
import {inject, observer} from "mobx-react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {MenuOutlined} from "@ant-design/icons";
import {Col, Dropdown, Menu, Row, Tag} from "antd";
import IconCommon from "../../../../../common/IconCommon";
import ApiSceneBindUnit from "./apiSceneBindUnit";
import ApiSceneStepDrawer from "./ApiSceneStepDrawer";
import stepCommonStore from "../../../../common/stepcommon/store/StepCommonStore";
import {CASE_TYPE} from "../../../../../common/dictionary/dictionary";
import IfJudgmentEdit from "../../../../common/ifJudgment/components/IfJudgmentEdit";
import IconBtn from "../../../../../common/iconBtn/IconBtn";
import {TextMethodType} from "../../common/methodType";
import {IfStep} from "../../../../common/caseCommonFn";

const {findStepCommonList,updateStepCommon,deleteStepCommon} = stepCommonStore


const ApiSceneStepList = (props) => {
    const {apiSceneId,apiSceneStore} = props
    const {findApiScene} = apiSceneStore
    const [stepList, setStepList] = useState([]);

    useEffect(async ()=> {
        await findList()
    },[apiSceneId])

    const findList = async () =>{
        let list = await  findStepCommonList({caseId:apiSceneId,caseType:CASE_TYPE.API_SCENE})
        setStepList(list)
    }

    /**
     * 拖拽排序
     * @param result
     */
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

    /**
     * 用例步骤
     */
    const caseStep = (item,provided)=>{
        let step = item.apiSceneStep

        return(<ApiSceneStepDrawer
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
                            {step?.apiUnit?.testCase?.name}
                        </Col>
                        <Col span={10}>
                            <div className={"display-flex-gap"}>
                                <TextMethodType type={step?.apiUnit?.methodType} />
                                <span>{step?.apiUnit?.path}</span>
                            </div>
                        </Col>
                        <Col span={3}>{item.createTime}</Col>
                        <Col style={{marginLeft: "auto", height: "20px"}}>
                            <div className={"step-item-delete"}>
                                <IconCommon
                                    className={"icon-s edit-icon"}
                                    icon={"shanchu3"}
                                    onClick={(e) => {
                                        deleteStepFn(item.id)
                                        e.stopPropagation()
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                }
                stepId={item.apiSceneStep?.apiUnit?.id}
                findList={findList}
            />
        )
    }

    const deleteStepFn = (id)=>{
        deleteStepCommon(id, CASE_TYPE.API_SCENE).then(async () => {
            await findList()
            await findApiScene(apiSceneId)
        })
    }


    const renderItems = () => {
        return stepList.map((item, index) => {
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
                                    ? <IfStep item={item} provided={provided} deleteStepFn={deleteStepFn} findStepList={findList} />
                                    : caseStep(item,provided)
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
                <Menu.Item key={"function-add"}>
                    <ApiSceneBindUnit
                        findList={findList}
                        apiSceneId={apiSceneId}
                    />
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup  title="逻辑步骤" key={"other-Group"}>
                <Menu.Item>
                    <IfJudgmentEdit caseId={apiSceneId} findList={findList}/>
                </Menu.Item>
            </Menu.ItemGroup>

        </Menu>
    );

    return (
        <div className={"table-list-box"}>
            <div className={"display-flex-between"} style={{margin: "10px 0"}}>
                <div> 共 {stepList.length} 个步骤</div>
                <Dropdown
                    overlay={menu}
                    placement="bottomRight"
                    overlayStyle={{width:"150px"}}
                >
                    <span>
                      <IconBtn
                          className="pi-icon-btn-grey"
                          name={"添加步骤"}
                      />
                    </span>
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
                                        style={{padding: "8px",flexGrow:1}}
                                        className={"step-item-content-header"}
                                    >
                                        <Col span={1}>
                                            <MenuOutlined />
                                        </Col>
                                        <Col span={1} className={"case-step-header-title"}>序号</Col>
                                        <Col span={4} className={"case-step-header-title"}>名称</Col>
                                        <Col span={10} className={"case-step-header-title"}>步骤概要</Col>
                                        <Col span={3} className={"case-step-header-title"}>创建时间</Col>
                                        <Col style={{marginLeft: "auto",height:"20px"}}  className={"case-step-header-title"}>操作</Col>
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
    );
};


export default inject("apiUnitStore",'apiSceneStore')(observer(ApiSceneStepList));