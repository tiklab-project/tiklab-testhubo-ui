
// import md5 from './md5';
import md5 from 'blueimp-md5'

var dk = {
    md5:md5,
    header:{
        set: function (key, value){
            var header={
                'key':key,
                'value':value,
            }
            return header
        },
    },
    query:{
        set: function (key, value){
            var query={
                'key':key,
                'value':value,
            }
            return query
        },
    },
}

function execute(express){
    return eval(express)
}

export {dk,execute,md5}
