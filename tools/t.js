
let ss='F:\\NEW_code\\tooool\\revHtml\\aa8896\\static\\img\\girls\\1-1-63f4865b88.jpg'


let arr=process.platform=='win32'?ss.split("\\"):ss.split("/")
for(let i=0;i<arr.length;i++){
    if(arr[i]=='static'){
        arr=arr.splice(i)
        break;
    }
}
arr=arr.join('/')
console.log(arr)
