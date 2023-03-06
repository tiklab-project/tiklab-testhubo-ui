import React from "react";
import {Select} from "antd";

const {Option} = Select;

/**
 * 文件下拉款
 * formdata会用到
 */
const FileTextSelect = (props) => {
    const {defaultValue,handleSave,rowData,setNewRowAction} = props;

    const selectChange = (e) =>{
        let newData = {
            ...rowData,
            dataType:e
        }
        handleSave(newData);

        //可编辑表格里的下拉框，选中后面操作会显示
        setNewRowAction&&setNewRowAction(true)
    }

    return(
        <Select
            style={{width:120}}
            defaultValue={defaultValue}
            onChange={(e)=>selectChange(e)}
            bordered={false}
        >
            <Option value={"text"}>text</Option>
            <Option value={"file"}>file</Option>
        </Select>
    )
}

export default FileTextSelect;