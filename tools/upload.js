const COS = require('cos-nodejs-sdk-v5');
const { cos_config, cos_upload } = require('../config/index')
const path=require('path')
const fs=require('fs')

const cos = new COS(cos_config);
const fileP=path.join(__dirname,'../','developHtml','static',)

console.log(fileP)
//https://shop-1256119282.file.myqcloud.com/tooools/static/img/favicon.ico

// cos.sliceUploadFile({
//     Bucket: cos_upload.Bucket, // Bucket 格式：test-1250000000
//     Region: cos_upload.Region,
//     Key: '1.zip',
//     FilePath: './1.zip'
// }, function (err, data) {
//     console.log(err, data);
// });

const getAllFile=function(dir){
    let res=[]
    function traverse(dir){
        fs.readdirSync(dir).forEach((file)=>{
            const pathname=path.join(dir,file)
            if(fs.statSync(pathname).isDirectory()){
                traverse(pathname)
            }else{
                res.push(pathname)
            }
        })
    }
    traverse(dir)
    return res;
}

console.log(getAllFile(fileP))
uploadToCOS = (local,upload) => {
    return new Promise((resolve, reject) => {
        cos.uploadFile({
            Bucket: cos_upload.Bucket, /* 必须 */
            Region: cos_upload.Region,    /* 存储桶所在地域，必须字段 */
            Key: local,              /* 必须 */
            FilePath: cos_upload.uploadPath+upload,                /* 必须 */
            SliceSize: 1024 * 1024 * 10,     /* 触发分块上传的阈值，超过10MB使用分块上传，非必须 */
            onTaskReady: function (taskId) {                   /* 非必须 */
                console.log(taskId);
            },
            onProgress: function (progressData) {           /* 非必须 */
                console.log(JSON.stringify(progressData));
            },
            onFileFinish: function (err, data, options) {
                console.log(options.Key + '上传' + (err ? '失败' : '完成'));
            },
        }, function (err, data) {
            console.log(err || data);
            if(err){
                reject(err) 
            }else{
                resolve(true)
            }
        });
    })
}



// module.exports=uploadToCOS


