
import React, {Fragment, useEffect, useState} from "react";
import { observer, inject } from "mobx-react";
import { Breadcrumb, List} from 'antd';
import { UserOutlined } from '@ant-design/icons';

const data = [
    {
        title: 'Ant Design Title 1',
    },
    {
        title: 'Ant Design Title 2',
    },
    {
        title: 'Ant Design Title 3',
    }
];

const RepositoryDetailPage = (props) => {
    // const [list, setList] = useState();
    //
    //
    // function combination(target) {
    //     let results = []
    //     let group = []
    //     function comb(arr) {
    //         let current
    //         for(let i = 0; i < arr.length; i ++) {
    //             current = arr.splice(i, 1)[0]
    //             group.push(current)
    //             if(arr.length === 0 ) results.push(group.slice())
    //             comb(arr)
    //             arr.splice(i, 0, current)
    //             group.pop()
    //         }
    //     }
    //     comb(target)
    //     return results
    // }
    //
    // let res= combination(["throw","spread","symbol","then","baby","champion","document","panther","cinnamon","skirt","output","nominee"])
    //
    // setList(res)

    return (
        <Fragment>
            <div className='breadcrumb'>
                <Breadcrumb separator=">" >
                    <Breadcrumb.Item>测试用例管理 </Breadcrumb.Item>
                    <Breadcrumb.Item>测试用例详情</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <hr/>
            <div className="det-box">
                <div className="det-item">
                    <div className="det-icon">
                        <UserOutlined style={{fontSize: "22px"}}/>
                    </div>
                    <div>
                        <p>USER-SERVICE</p>
                        <p>测试用例</p>
                    </div>
                </div>
                <div className="det-item">
                    <div className="det-icon">
                        <UserOutlined style={{fontSize: "22px"}}/>
                    </div>
                    <div>
                        <p>USER-SERVICE</p>
                        <p>测试用例</p>
                    </div>
                </div>
            </div>
            <div className="det-state">
                <p>仓库动态</p>
                <div>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                            title={item.title}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </List.Item>
                        )}
                    />

                </div>
            </div>
        </Fragment>
    )

}
export default inject('repositoryStore')(observer(RepositoryDetailPage));
