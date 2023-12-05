import { DatePicker, Modal, Select, Input, Form, Button, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/redux/modal';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs'; //Dayjs
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import UploadImage from '../UploadImage';

import { updateTask, deleteTask, addImgTask } from '@/services/task';
import useNotification from '@/customHook/useNotify';

const {VITE_ORIGIN} = import.meta.env

export default function TaskDetailModal(props) {

    const showDetailTaskModal = useSelector(state => state.modal.showDetailTaskModal);
    const data = useSelector(state => state.modal.dataDetailTaskModal);
    const dispatch = useDispatch();
    const [form] = Form.useForm()
    const { contextHolder, infoNotify, errorNotify } = useNotification()
    const [uploadImgTask, setUploadImgTask] = useState({
        base64: '',
        fileOriginObj: null
    });

    const handleOk = () => {
        form.submit()
    };

    const handleCancel = () => {
        dispatch(closeModal())
    };

    async function onFinish(values) {
        let { title, date, complete } = values
        try {
            await updateTask(data?.id, title, date, complete)
            if (uploadImgTask.fileOriginObj) {
                await addImgTask(uploadImgTask.fileOriginObj, data?.id)
            }
            infoNotify('topRight', 'Cập nhật thành công', data?.id)
            dispatch(closeModal())
            if (typeof props.ok == 'function') { props.ok() }
        } catch (error) {
            errorNotify('topRight', 'Cập nhật thất bại', data?.id)
        }
    }

    async function handleDelete(id) {
        try {
            await deleteTask(id)
            infoNotify('topRight', 'Xóa thành công', data?.id)
            dispatch(closeModal())
            if (typeof props.onDelete == 'function') { props.onDelete() }
        } catch (error) {
            errorNotify('topRight', 'Xóa thất bại', data?.id)
        }
    }


    useEffect(() => {
        let date = data?.attributes?.date ? dayjs(data?.attributes?.date) : undefined
        form.setFieldsValue({
            title: data?.attributes?.title,
            complete: data?.attributes?.complete,
            date: date
        })
    }, [data?.attributes, form])

    const arrStatus = [
        {
            label: 'False',
            value: false
        },
        {
            label: 'True',
            value: true
        }
    ]

    return (<>
        {contextHolder}
        <Modal forceRender
            title={data?.id}
            open={showDetailTaskModal}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key='delete' danger type='dashed' onClick={() => {
                    handleDelete(data?.id)
                }}>Xóa</Button>,
                <Button key='cancel' onClick={handleCancel}>Cancel</Button>,
                <Button key='ok' type='Primary' onClick={handleOk}>Ok</Button>
            ]}
        >
            <Form
                form={form}
                onFinish={onFinish}
            >
                <UploadImage setImg={setUploadImgTask} initSrc={`${VITE_ORIGIN}${data?.attributes?.image?.data?.attributes?.url}`}></UploadImage>
                <Form.Item name='title'>
                    <Input></Input>
                </Form.Item>
                <Form.Item name='complete'>
                    <Select
                        options={arrStatus}>
                    </Select>
                </Form.Item>
                <Form.Item name='date'>
                    <DatePicker></DatePicker>
                </Form.Item>
            </Form>
        </Modal>
    </>)
}

