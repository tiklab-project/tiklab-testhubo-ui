import React, {useEffect, useState} from 'react';
import './homestyle.scss';
import {getUser} from "tiklab-core-ui";
import HomeEcharts from "./homeEcharts";
import RepositoryRecentHome from "../../repository/components/repositoryRecentHome";
import {findRepositoryHomeTotal} from "../../repository/api/repositoryApi";


// 首页
const Home =(props)=> {

    const [totalData, setTotalData] = useState();

    let userInfo = getUser();
    useEffect(()=>{
        let param = new FormData();
        param.append("userId",userInfo.userId)
        findRepositoryHomeTotal(param).then(res=>{
            let data = res.data;
            let newArr = [];
            for(let key in data){
                newArr.push(data[key])
            }
            setTotalData(newArr)
        })
    },[])

    const toRepository = () =>{
        props.history.push("/repository/create")
    }

    return(
        <div className={"teston-home-box"}>
            <div className={"teston-home"}>
                <div className={"teston-home-left"}>
                    <div className={"teston-home-left-user"}>
                        <svg className="teston-home-left-user-icon" aria-hidden="true">
                            <use xlinkHref={`#icon-a-ziyuan106`}/>
                        </svg>
                        <div className={"teston-home-left-user-info"}>
                            <div className={"teston-home-left-user-info-name"}>{userInfo.name}</div>
                            <div className={"teston-home-left-user-info-mail"}>{userInfo.email}</div>
                        </div>
                    </div>
                    <div className={"teston-home-left-start"}>
                        <div className={"teston-home-left-header"}>开始</div>
                        <div className={"teston-home-left-rep"}  onClick={toRepository}>
                            <svg className="teston-home-left-icon" aria-hidden="true">
                                <use xlinkHref={`#icon-menu`}/>
                            </svg>
                            <div className={"teston-home-left-rep-title"}>仓库</div>
                        </div>

                    </div>

                </div>
                <div className={"teston-home-right"}>
                    <div className={"teston-home-right-item"}>
                        <div className={"teston-home-header"}>仓库详情</div>
                        <HomeEcharts totalData={totalData} />
                    </div>
                    <div className={"teston-home-right-item teston-home-right-recent"}>
                        <div className={"teston-home-header"}>最近浏览</div>
                        <RepositoryRecentHome  {...props}/>
                    </div>


                </div>

            </div>
        </div>

    )
}

export default Home;
