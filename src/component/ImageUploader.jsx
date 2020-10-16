import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ImageUploader = (params) => {
    const changeImg = params.onChangeImg
    const [fileList, updateFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const props = {
        accept:"image/gif, image/jpeg, image/png",
        fileList,
        listType: "picture",
        beforeUpload: file => {
            if (file.type !== ('image/png')&&file.type !==('image/jpeg')&&file.type !==('image/gif')) {
                message.error(`${file.name} is not a image file`);
                file.status = false
            }  
            return false
        },
        onChange: info => {
            console.log('info :>> ', info);
            if (info.file.size < 2097000) {
                var reader = new FileReader();
                console.log('info.fileList :>> ', info.fileList);
                updateFileList(info.fileList.slice(-1));
                //设置formItem value值
                reader.readAsDataURL(info.file);
                reader.onload = () => {
                    //得到的reader.result为二进制文件base64  data:image/jpeg;base64...
                    changeImg(reader.result)
                }
            }else{
                message.error("The img file should be small than 2M")
            }
        },
        // disabled: fileList.length >= 1

    };
    return (
        <Upload {...props} >
            <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
    );
};

export default ImageUploader