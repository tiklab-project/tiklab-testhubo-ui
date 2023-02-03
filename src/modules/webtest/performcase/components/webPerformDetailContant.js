import React, {useState} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import BackCommon from "../../../common/backCommon";
import {renderRoutes} from "react-router-config";



const WebPerfomDetailContant = (props) =>{

    const [current, setCurrent] = useState('config');

    const onClick = (e) => {
        setCurrent(e.key);
    }

    const goBack = () =>{
        props.history.push("/repository/testcase/list")
    }


    return(
        <>
            <div >
                {/*<BackCommon clickBack={goBack} />*/}
                <Menu
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                >
                    <Menu.Item key="config">
                        <Link to='/repository/webtest/performdetail/config'>配置</Link>
                    </Menu.Item>
                    <Menu.Item key="test"  >
                        <Link to='/repository/webtest/performdetail/test'>测试</Link>
                    </Menu.Item>
                </Menu>

            </div>
            <div className={"content-box-center"}>
                {
                    renderRoutes( props.route.routes)
                }
            </div>
        </>
    )
}

export default WebPerfomDetailContant