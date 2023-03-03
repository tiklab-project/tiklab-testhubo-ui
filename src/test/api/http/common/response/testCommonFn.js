
//处理接口响应结果中的头
export const processHeaders = (headerArr)=>{
    let obj={};
    headerArr.map(item=>{
        let itemArr = item.split(":")
        let index0=itemArr[0];
        let index1 = itemArr[1]

        //有值才合并
        if(index0){
            obj=Object.assign({},obj,{[index0] : index1})
        }
    })

    return obj
}
