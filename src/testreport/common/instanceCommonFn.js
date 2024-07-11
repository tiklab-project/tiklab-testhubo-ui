import instanceStore from "../store/InstanceStore";
let {findInstancePage,instanceList,tableLoading,totalPage} = instanceStore;


export const findCaseInstancePage =async (belongId,type,params) =>{
    let param={
        pageParam: {
            pageSize: 15,
            currentPage: 1
        },
        type:type,
        belongId:belongId,
        ...params
    };

    return await findInstancePage(param)
}

export const cleanCaseInstanceData = () =>{
    instanceList=[];
    tableLoading=true;
    totalPage=0;
}

