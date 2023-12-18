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
import IfJudgmentDrawer from "../../../../common/ifJudgment/components/IfJudgmentDrawer";
import IfJudgmentEdit from "../../../../common/ifJudgment/components/IfJudgmentEdit";
import IconBtn from "../../../../../common/iconBtn/IconBtn";

const {findStepCommonList,updateStepCommon,deleteStepCommon} = stepCommonStore


const ApiSceneStepList = ({apiUnitStore,apiSceneId}) => {
    const {findApiUnitList} = apiUnitStore;

    const [stepList, setStepList] = useState([]);
    let repositoryId = sessionStorage.getItem("repositoryId");
    const [visible, setVisible] = useState(false);

    useEffect(async ()=> {
        await findList()
    },[apiSceneId])

    const findList = async () =>{
        let list = await  findStepCommonList({caseId:apiSceneId,caseType:CASE_TYPE.API_SCENE})
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
            let step = item.apiSceneStep

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
                                                                deleteStepCommon(item.id, CASE_TYPE.API_SCENE).then(() => findList())
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
                                    : <ApiSceneStepDrawer
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
                                                <Col span={3}>
                                                    {step?.apiUnit?.testCase?.name}
                                                </Col>
                                                <Col span={2}>
                                                    {step?.apiUnit?.methodType}
                                                </Col>
                                                <Col span={8}>{step?.apiUnit?.path}</Col>
                                                <Col span={3}>{item.createTime}</Col>
                                                <Col style={{marginLeft: "auto", height: "20px"}}>
                                                    <div className={"step-item-delete"}>
                                                        <IconCommon
                                                            className={"icon-s edit-icon"}
                                                            icon={"shanchu3"}
                                                            onClick={(e) => {
                                                                deleteStepCommon(item.id, CASE_TYPE.API_SCENE).then(() => findList())
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

    const showConnect =()=>{
        findApiUnitList({repositoryId:repositoryId,caseType: "api-unit", testType: "api"});
        setVisible(true);
    }

    //添加步骤
    const menu = (
        <Menu>
            <Menu.Item><a onClick={showConnect}>关联用例</a></Menu.Item>
            <Menu.Item><IfJudgmentEdit caseId={apiSceneId} findList={findList}/> </Menu.Item>
        </Menu>
    );

    return (
        <div className={"table-list-box"}>
            <div className={`${visible?"teston-hide":"teston-show"}`} >
                <div className={"display-flex-between"} style={{margin: "10px 0"}}>
                    <div> ( {stepList.length} ) 个步骤</div>
                    <Dropdown
                        overlay={menu}
                        placement="bottom"
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
                    apiSceneId={apiSceneId}
                />
            </div>
        </div>
    );
};


export default inject("apiUnitStore")(observer(ApiSceneStepList));