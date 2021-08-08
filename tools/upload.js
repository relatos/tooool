/**
 * 上传cos主要逻辑
 * 测试自动化构建
 */
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
            Bucket: upload_config.Bucket, 
            Region: upload_config.Region,  
            Key: upload_config.uploadPath + Key,            
            FilePath: FilePath,              
            SliceSize: 1024 * 1024 * 10,   
            onTaskReady: function (taskId) {      
            },
            onProgress: function (progressData) {    
            },
            onFileFinish: function (err, data, options) {
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
    uploadArry.forEach(async (item) => {
        await uploadToCOS(item.FilePath, item.key)
    })
    return true
}




module.exports = uploadPromise


