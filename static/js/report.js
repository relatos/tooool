const baseUrl='http://175.27.163.51'

window.onload=()=>{
    console.log('onload')
    $.ajax({
        url:baseUrl+'/cxy/message/list',
        method:'get',
        success:(data)=>{
            console.log(data)

        }
    })
}