import { beforeUpload, getBase64 } from '@/common/imageHeaper';
import useNotification from '@/customHook/useNotify';
import { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';

export default function UploadImage(props) {
    const { contextHolder, infoNotify, errorNotify } = useNotification()
    const [uploadImgTask, setUploadImgTask] = useState({
        base64: props.initSrc || '',
        fileOriginObj: null
    })

    useEffect(() => {
        setUploadImgTask({
            ...uploadImgTask, base64: props.initSrc
        })
    }, [props.initSrc])

    const handleChange = (info) => {
        let errorMessage = beforeUpload(info.file)
        if (errorMessage) {
            errorNotify('topRight', 'Upload không thành công', errorMessage)
            return;
        }

        getBase64(info.file, (url) => {
            setUploadImgTask({
                base64: url,
                fileOriginObj: info.fileList[0].originFileObj
            })
            props.setImg({
                base64: url,
                fileOriginObj: info.fileList[0].originFileObj
            })
        })
    };

    const uploadButton = (
        <div>
            {<PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    const uploadComponent = (
        <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={handleChange}
        >
            {uploadImgTask.base64 ? (
                <img
                    src={uploadImgTask.base64}
                    alt="avatar"
                    style={{
                        width: '100%',
                    }}
                />
            ) : (
                uploadButton
            )}
        </Upload>
    )
    return (<>
        {contextHolder}
        {uploadComponent}
    </>)
}