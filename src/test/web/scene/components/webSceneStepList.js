import React, {useEffect, useState} from "react";
import {Empty, Popconfirm, Space,} from "antd";
import { observer} from "mobx-react";
import IconCommon from "../../../../common/IconCommon";
import webSceneStepStore from "../store/webSceneStepStore";
import "./webStyle.scss"
import emptyImg from "../../../../assets/img/empty.png";
import WebSceneStepAdd from "./WebSceneStepAdd";

const WebSceneStepList = (props) => {
    const {findWebSceneStepList,deleteWebSceneStep} = webSceneStepStore;

    let webSceneId = sessionStorage.getItem("webSceneId");
    const [stepList, setStepList] = useState([]);
    const [editShow, setEditShow] = useState(false);

    useEffect(async ()=>{
        await findList()
    },[webSceneId])

   const findList = async () =>{
       let list = await findWebSceneStepList(webSceneId);
       setStepList(list)
   }

   const showStepListView = (list)=>{
       return  list.map((item,index)=>{
           return (
               <div className={`web-step_li_box`} key={item.id}>
                   <div className={`web-step_li ${editShow?"web-step_add_hide":"web-step_add_show"}`}>
                       <div className={"web-step_number"}>{index+1}</div>
                       <div>
                           <div className={"web-step_li_title"}>{item.name}</div>
                           <div className={"web-step_li_param"}>
                               {
                                   showParamView("操作方法: ",item.actionType)
                               }
                               {
                                   showParamView("参数: ",item.parameter)
                               }
                               {
                                   showParamView("定位器: ",item.location)
                               }
                               {
                                   showParamView("定位器的值: ",item.locationValue)
                               }
                           </div>
                       </div>
                       <div className={"web-step_li_operation"}>
                           <Space>
                               {/*<IconCommon*/}
                               {/*    className={"icon-s edit-icon"}*/}
                               {/*    icon={"shanchu3"}*/}
                               {/*/>*/}

                               <Popconfirm
                                   title="确定删除？"
                                   onConfirm={() =>deleteWebSceneStep(item.id).then(()=>findList())}
                                   okText='确定'
                                   cancelText='取消'
                                   placement={"left"}
                               >
                                   <IconCommon
                                       className={"icon-s edit-icon"}
                                       icon={"shanchu3"}
                                   />
                               </Popconfirm>
                           </Space>
                       </div>
                   </div>

                   <div className={` ${editShow?"web-step_add_show":"web-step_add_hide"}`}>
                       <WebSceneStepAdd
                           type={"edit"}
                           findList={findList}
                           webSceneStepId={item.id}
                           setEditShow={setEditShow}
                           editShow={editShow}
                       />
                   </div>

               </div>
           )
       })
   }

   const showParamView = (title,value)=>{
        if(value){
            return <div>
                <span className={"web-step_li_param_title"}>{title} </span>
                <span className={"web-step_li_param_value"}>{value}</span>
            </div>
        }
   }

    return(
        <>
            <div className='title-space-between'>
                <div className={'test-title'}>
                    <div>场景步骤</div>
                </div>
            </div>
            <div className={"web-step_main"}>
                {
                    stepList && stepList.length>0
                        ?<div className={`web-step_content `}>
                            {showStepListView(stepList)}
                        </div>
                        :<Empty
                            description={<span ></span>}
                            image={emptyImg}
                        />
                }
                <WebSceneStepAdd findList={findList}/>
            </div>
        </>
    )
}

export default observer(WebSceneStepList)