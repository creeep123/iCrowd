import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const ImageUploader = () => {
    const [fileList, updateFileList] = useState([]);
    const props = {
        fileList,
        listType:"picture-card",
        beforeUpload: file => {
            if (file.type !== 'image/png') {
                message.error(`${file.name} is not a png file`);
            }
            return file.type === 'image/png';
        },
        onChange: info => {
            console.log(info.file);
            // console.log(info.fileList);
            // file.status is empty when beforeUpload return false
            updateFileList(info.fileList.filter(file => !!file.status));
        },
        disabled: fileList.length === 1

    };
    return (
        <Upload {...props} >
            {/* <Button icon={<UploadOutlined />}>Upload png only</Button> */}
            {fileList.length < 1 && '+ Upload'}
        </Upload>
    );
};

export default ImageUploader