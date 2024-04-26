import React, {useEffect, useState} from "react";
import {Badge, Drawer} from "antd";
import {BellOutlined} from "@ant-design/icons";
import {Axios, getUser} from "thoughtware-core-ui";
import "./messageStyle.scss"
import TemplateList from "../../common/templateList/TemplateList";

const MessageDrawer = (props) =>{

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);

    const [count, setCount] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [length, setLength] = useState();

    const [open, setOpen] = useState(false);


    useEffect(()=>{
        let params = {
            status:0,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }
        findList(params).then(res=>{
            setTotalPage(res.totalPage)
            setLength(res.totalRecord)
        })

    },[])

    //抽屉展示
    const showDrawer = () => {
        let params = {
            status:0,
            pageParam: {
                pageSize: 10,
                currentPage:1
            }
        }
        findList(params).then(res=>{
            setData(res.dataList);
            setList(res.dataList);
            setInitLoading(false);
        })

        setOpen(true);
    };

    //加载更多
    const onLoadMore = () => {
        setLoading(true);
        setCount(count+1)
        setList(
            data.concat(  [...new Array(5)].map(() => ({  loading: true })) ),
        );

        if(count<=totalPage){
            let params = {
                pageParam: {
                    pageSize: 10,
                    currentPage:count+1
                }
            }

            findList(params).then(res=>{
                const newData = data.concat(res.dataList);
                setData(newData);
                setList(newData);
                setLoading(false);
            })
        }
    }

    //查询接口
    const findList = async (params) =>{
        const param = {
            sendType: 'site',
            receiver: getUser().userId,
            bgroup:"teston",
            ...params
        }

        let res = await Axios.post('/message/messageItem/findMessageItemPage', param);
        if (res.code === 0) {

            return res.data;
        }
    }


    //是否展示 加载更多
    const loadMore =()=>{
       return  count<totalPage&&!initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <a onClick={onLoadMore}>加载更多</a>
            </div>
        ) : null;
    }

    //关闭抽屉
    const onClose = () => {
        setOpen(false)

        setTotalPage(1)
        setCount(1)
    }

    //消息筛选项
    const items=[
        {
            title: '未读',
            key: 0,
            value:0
        },
        {
            title: `已读`,
            key: 1,
            value:1
        },
    ]
    const [selectItem, setSelectItem] = useState(0);
    //渲染筛选项
    const showMenu = (data) =>{
        return data&&data.map(item=>{
            return(
                <div
                    key={item.key}
                    className={`msg-header-menu-item  ${item.key === selectItem ? "msg-header-menu-item-selected" : ""}`}
                    onClick={()=>selectFun(item)}
                >
                    <span> {item.title} </span>
                </div>
            )
        })
    }

    const selectFun = (item) =>{
        let params = {
            status:item.value,
            pageParam: {
                pageSize: 10,
                currentPage:1
            },
        }
        findList(params).then(res=>{
            setData(res.dataList);
            setList(res.dataList);
            setInitLoading(false);
        })

        setSelectItem(item.key)
    }



    //点击以后未读改为已读
    const readFn = async (item)=>{
        const updateParams = {
            id:item.id,
            message:{id: item.message.id },
            status:1,
            bgroup:"teston"
        }
        const res =  await Axios.post('/message/messageItem/updateMessageItem', updateParams);
        if(res.code===0){
            let params = {
                status:0,
                pageParam: {
                    pageSize: 10,
                    currentPage:1
                }
            }
            findList(params).then(res=>{
                setList(res.dataList);
            })
        }
    }


    return (
        <div>
            <Badge count={length}>
                <BellOutlined className={"header-icon-item"}  onClick={showDrawer}/>
            </Badge>
            <Drawer
                title="消息"
                placement="right"
                onClose={onClose}
                visible={open}
                mask={false}
                width={360}
                maskStyle={{background:"transparent"}}
                contentWrapperStyle={{top:48,height:"calc(100% - 50px)"}}
                extra={
                    <div className={"msg-select-box"}>
                        {
                            showMenu(items)
                        }
                    </div>
                }
            >

                <TemplateList dynamicList={list} type={"message"} readFn={readFn}/>
                {
                    loadMore()
                }
            </Drawer>
        </div>
    );
}

export default MessageDrawer;