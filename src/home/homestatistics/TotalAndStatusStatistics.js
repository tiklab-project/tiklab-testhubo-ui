import React, {useEffect, useRef} from "react";
import * as echarts from 'echarts';
import {Axios, getUser} from "tiklab-core-ui";
import { getPieDoughnutOption} from "../../statistics/casetest/CaseTestPieDoughnut";
import {Card, Col,Select} from "antd";
import {inject, observer} from "mobx-react";
const {Option} = Select

const TotalAndStatusStatistics = (props) =>{
    const {repositoryStore} = props
    const {findRepositoryJoinList,repositoryList} = repositoryStore;

    const chartRef = useRef(null);
    const chartInstance = useRef(null)

    useEffect(async () => {
        chartInstance.current = echarts.init(chartRef.current);
        await getStatisticsData({repositoryId:null})

        const handleResize = () => chartInstance.current.resize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            chartInstance.current.dispose();
        };
    }, []);

    const getStatisticsData = async (param) =>{
        let res =  await Axios.post("/statistics/getTotalAndStatusStatistics",param)
        let data = res.data
        const option = getPieDoughnutOption(data);
        chartInstance.current.setOption(option);
    }

    useEffect(()=>{
        findRepositoryJoinList({userId: getUser().userId})
    },[])

    const selectRepository = async (id) =>{
        await getStatisticsData({repositoryId:id==="all"?null:id})
    }

    return(
        <Col span={12}>
            <Card title={"用例总数/状态数"} bordered={false} className={"statistic-card-item"}>
                <div className={"statistics-status-select"}>
                    <Select bordered={false} defaultValue={"all"} onSelect={selectRepository} style={{width:"100px"}}>
                        <Option key={'all'} value={"all"}>所有</Option>
                        {
                            repositoryList&&repositoryList.map(item=>{
                                return <Option key={item.id} value={item.id}>{item.name}</Option>
                            })
                        }
                    </Select>
                </div>
                <div
                    ref={chartRef}
                    style={{ width: '100%', height: '400px' }}
                ></div>
            </Card>
        </Col>
    )
}

export default inject("repositoryStore")(observer(TotalAndStatusStatistics))