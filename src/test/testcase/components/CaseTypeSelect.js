import React from "react";
import {SelectItem, SelectSimple} from "../../../common/select";


const CaseTypeSelect = (props) =>{
    const {findPage,testType} = props;


    const apiList = [
        {
            id:"api-unit",
            name:"接口单元用例"
        },{
            id:"api-scene",
            name:"接口场景用例"
        }
    ]

    const uiList = [
       {
            id:"web-scene",
            name:"WEB场景用例"
        },{
            id:"app-scene",
            name:"APP场景用例"
        }
    ]


    return(
        <>
            {
                testType==="api"
                    ? <SelectSimple
                        name="workStatus"
                        onChange={(value) => findPage(value)}
                        title={testType === "api" && "接口类型"}
                        ismult={true}
                    >
                        <div className="select-group-title">接口</div>
                        {
                            apiList.map(item => {
                                return <SelectItem
                                    value={item.id}
                                    label={item.name}
                                    key={item.id}
                                />
                            })
                        }
                    </SelectSimple>
                    : null
            }

            {
                testType==="ui"
                    ? <SelectSimple
                        name="workStatus"
                        onChange={(value) => findPage(value)}
                        title={testType === "ui" && "UI类型"}
                        ismult={true}
                    >
                        <div className="select-group-title">UI</div>
                        {
                            uiList.map(item => {
                                return <SelectItem
                                    value={item.id}
                                    label={item.name}
                                    key={item.id}
                                />
                            })
                        }
                    </SelectSimple>
                    : null
            }
        </>
    )
}

export default CaseTypeSelect;

