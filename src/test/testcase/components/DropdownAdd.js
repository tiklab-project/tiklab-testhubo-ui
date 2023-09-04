import React from "react";
import {Button, Dropdown, Menu} from "antd";
import FuncUnitEdit from "../../function/components/funcUnitEdit";
import ApiUnitEdit from "../../api/http/unit/components/apiUnitEdit";
import ApiSceneEdit from "../../api/http/scene/components/apiSceneEdit";
import PostInApiToCase from "../../../integrated/postin/postinApiCopy/components/PostInApiToCase";
import WebSceneEdit from "../../web/scene/components/webSceneEdit";
import AppSceneEdit from "../../app/scene/components/appSceneEdit";
import ApiPerfEdit from "../../api/http/perf/components/apiPerfEdit";
import IconCommon from "../../../common/IconCommon";

const DropdownAdd = (props) =>{
    const {icon} = props;

    const addMenu =(
        <Menu>
            <Menu.Item key={"function-add"}>
                <FuncUnitEdit
                    name={"添加功能用例"}
                    type={"add"}
                    {...props}
                />
            </Menu.Item>
            <Menu.SubMenu title="接口测试" key={"api-add"}>
                <Menu.Item key={"api-unit-add"}>
                    <ApiUnitEdit
                        name={"添加接口测试"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
                <Menu.Item key={"api-scene-add"}>
                    <ApiSceneEdit
                        name={"添加接口场景"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
                <Menu.Item key={"postIn-api"}>
                    <PostInApiToCase />
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="UI测试" key={"ui-add"}>
                <Menu.Item key={"web-scene-add"}>
                    <WebSceneEdit
                        name={"添加Web用例"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
                <Menu.Item key={"app-scene-add"}>
                    <AppSceneEdit
                        name={"添加App用例"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu title="性能测试" key={"perform-add"}>
                <Menu.Item key={"api-perf-add"}>
                    <ApiPerfEdit
                        name={"添加接口性能"}
                        type={"add"}
                        {...props}
                    />
                </Menu.Item>

                {/*<Menu.Item key={"web-perf-add"}>*/}
                {/*    <WebPerfEdit*/}
                {/*        name={"添加Web性能"}*/}
                {/*        type={"add"}*/}
                {/*        {...props}*/}
                {/*    />*/}
                {/*</Menu.Item>*/}
                {/*<Menu.Item key={"app-perf-add"}>*/}
                {/*    <AppPerfEdit*/}
                {/*        name={"添加App性能"}*/}
                {/*        type={"add"}*/}
                {/*        {...props}*/}
                {/*    />*/}
                {/*</Menu.Item>*/}
            </Menu.SubMenu>
        </Menu>
    )

    return(
        <Dropdown overlay={addMenu} placement="bottom">
            {
                icon
                    ? <div>
                        <IconCommon
                            className={"icon-l edit-icon"}
                            icon={"tianjia"}
                        />
                    </div>
                    : <Button className={"important-btn"}>添加用例</Button>
            }

        </Dropdown>
    )
}

export default DropdownAdd;