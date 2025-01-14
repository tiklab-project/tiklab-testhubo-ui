import React from "react";
import {Button, Dropdown, Menu, Tooltip} from "antd";
import FuncUnitEdit from "../../function/components/funcUnitEdit";
import ApiUnitEdit from "../../api/http/unit/components/apiUnitEdit";
import ApiSceneEdit from "../../api/http/scene/components/apiSceneEdit";
import PostInApiToCase from "../../../integrated/postin/postinApiCopy/components/PostInApiToCase";
import ApiPerfEdit from "../../api/http/perf/components/apiPerfEdit";
import IconCommon from "../../../common/IconCommon";
import ExtensionCommon from "../../../common/ExtensionCommon";

const DropdownAdd = (props) =>{
    const {icon,AppSceneEdit,WebSceneEdit,categoryStore} = props;

    const addMenu =(
        <Menu>
            <Menu.ItemGroup  title="功能" key={"function-Group"}>
                <Menu.Item key={"function-add"}>
                    <FuncUnitEdit
                        name={"添加功能用例"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup  title="接口" key={"api-add"}>
                <Menu.Item key={"api-unit-add"}>
                    <ApiUnitEdit
                        name={"添加接口单元用例"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
                <Menu.Item key={"api-scene-add"}>
                    <ApiSceneEdit
                        name={"添加接口场景用例"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
                <Menu.Item key={"postIn-api"}>
                    <PostInApiToCase />
                </Menu.Item>
            </Menu.ItemGroup >
            <Menu.ItemGroup  title="UI" key={"ui-add"}>
                <Menu.Item key={"web-scene-add"}>

                    <ExtensionCommon
                        extension={WebSceneEdit&&<WebSceneEdit name={"添加WEB用例"} categoryStore={categoryStore} {...props} />}
                        name={"添加WEB用例"}
                    />
                </Menu.Item>
                <Menu.Item key={"app-scene-add"}>

                    <ExtensionCommon
                        extension={AppSceneEdit&&<AppSceneEdit  name={"添加APP用例"} categoryStore={categoryStore}  {...props}/>}
                        name={"添加APP用例"}
                    />
                </Menu.Item>
            </Menu.ItemGroup >
            <Menu.ItemGroup  title="性能" key={"perform-add"}>
                <Menu.Item key={"api-perf-add"}>
                    <ApiPerfEdit
                        name={"添加接口性能用例"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
            </Menu.ItemGroup >
        </Menu>
    )

    return(
        <Dropdown
            overlay={addMenu}
            placement={`${icon?"bottomLeft":"bottomRight"}`}
            overlayStyle={{width:"160px"}}
            trigger={["click"]}
        >
            {
                icon
                    ? <IconCommon
                        className={"icon-m edit-icon"}
                        icon={"chuangjiantianjiapiliangtianjia"}
                    />

                    : <Button className={"important-btn"} type="primary">添加用例</Button>
            }

        </Dropdown>
    )
}

export default DropdownAdd;