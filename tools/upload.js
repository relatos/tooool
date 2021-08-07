const COS = require('cos-nodejs-sdk-v5');
const { cos_config, cos_upload } = require('../config/index')
const path = require('path')
const fs = require('fs')
// process.platform=='win32'

const cos = new COS(cos_config);
const fileP = path.join(__dirname, '../', 'revHtml', 'build', 'static',)

// console.log(fileP)
//https://shop-1256119282.file.myqcloud.com/tooools/static/img/favicon.ico
//F:\\NEW_code\\tooool\\revHtml\\aa8896\\static\\img\\favicon-d8399390be.ico
// cos.sliceUploadFile({
//     Bucket: cos_upload.Bucket, // Bucket 格式：test-1250000000
//     Region: cos_upload.Region,
//     Key: '1.zip',
//     FilePath: './1.zip'
// }, function (err, data) {
//     console.log(err, data);
// });


const getAllFile = function (dir) {
    let res = []
    function traverse(dir) {
        fs.readdirSync(dir).forEach((file) => {
            const pathname = path.join(dir, file)
            if (fs.statSync(pathname).isDirectory()) {
                traverse(pathname)
            } else {
                res.push(pathname)
            }
        })
    }
    traverse(dir)
    return res;
}


const handlePath = () => {
    const allFile = getAllFile(fileP)
    let res = []
    for (let i = 0; i < allFile.length; i++) {
        let arr = process.platform == 'win32' ? allFile[i].split("\\") : allFile[i].split("/")
        // let arr = process.platform == 'win32' ? ss.split("\\") : ss.split("/")
        for (let x = 0; x < arr.length; x++) {
            if (arr[x] == 'static') {
                arr = arr.splice(x)
                break;
            }
        }
        arr = arr.join('/')
        res.push({
            FilePath:allFile[i],
            key:arr
        })
    }
    return res
}
uploadToCOS = (FilePath, Key) => {
    return new Promise((resolve, reject) => {
        cos.uploadFile({
            Bucket: cos_upload.Bucket, /* 必须 */
            Region: cos_upload.Region,    /* 存储桶所在地域，必须字段 */
            Key: cos_upload.uploadPath+Key,              /* 必须 */
            FilePath: FilePath,                /* 必须 */
            SliceSize: 1024 * 1024 * 10,     /* 触发分块上传的阈值，超过10MB使用分块上传，非必须 */
            onTaskReady: function (taskId) {                   /* 非必须 */
                // console.log(taskId);
            },
            onProgress: function (progressData) {           /* 非必须 */
                // console.log(JSON.stringify(progressData));
            },
            onFileFinish: function (err, data, options) {
                // console.log(options.Key + '上传' + (err ? '失败' : '完成'));
            },
        }, function (err, data) {
            // console.log(err || data);
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        });
    })
}

const uploadPromise=()=>{
    // return new Promise((resolve, reject)=>{
        // return resolve(true)
    // })
    const uploadArry=handlePath()
    uploadArry.forEach(async(item)=>{
        await uploadToCOS(item.FilePath,item.key)
    })
    return true
   

}
// uploadPromise()

// console.log()




module.exports=uploadPromise


