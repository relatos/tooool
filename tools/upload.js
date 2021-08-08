const COS = require('cos-nodejs-sdk-v5');
const { cos_config } =global.process.env.SecretId?{}:require('../config/index')
const upload_config=require('../config/upload')
const path = require('path')
const fs = require('fs')
const cos = new COS({
    SecretId: process.env.SecretId||cos_config.SecretId,
    SecretKey: process.env.SecretKey||cos_config.SecretKey,
});
const fileP = path.join(__dirname, '../', 'revHtml', 'build', 'static',)



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
        for (let x = 0; x < arr.length; x++) {
            if (arr[x] == 'static') {
                arr = arr.splice(x)
                break;
            }
        }
        arr = arr.join('/')
        res.push({
            FilePath: allFile[i],
            key: arr
        })
    }
    return res
}
uploadToCOS = (FilePath, Key) => {
    return new Promise((resolve, reject) => {
        cos.uploadFile({
            Bucket: upload_config.Bucket, /* 必须 */
            Region: upload_config.Region,    /* 存储桶所在地域，必须字段 */
            Key: upload_config.uploadPath + Key,              /* 必须 */
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
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        });
    })
}

const uploadPromise = () => {
    const uploadArry = handlePath()
    //saaaadsdsd
    uploadArry.forEach(async (item) => {
        await uploadToCOS(item.FilePath, item.key)
    })
    return true
}




module.exports = uploadPromise


