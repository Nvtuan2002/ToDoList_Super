import { useFetching } from '@/customHook/useFetching'
import { render } from '@/common/renderHelper';
import { Button, Skeleton, Pagination, Input, Form, Space, Upload, Avatar, Row } from 'antd'
import { getCompleteTasks, getUnCompleteTasks, createTask, deleteTask, addImgTask } from '@/services/task';
import {
    CloseOutlined,
    ReloadOutlined,
    DeleteOutlined,
} from "@ant-design/icons"
import { useRef, useState } from 'react';
import TaskDetailModal from '@/components/Modal/TaskDetail';
import { useDispatch } from 'react-redux';
import { openModal } from '@/redux/modal';
import { reloadTaskList } from '@/redux/taskList';
import useNotification from '@/customHook/useNotify';
import UploadImage from '@/components/UploadImage';

const { VITE_ORIGIN } = import.meta.env

export default function TaskList(props) {
    const { contextHolder, infoNotify, errorNotify } = useNotification()
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const getTasks = props.topic === 'done' ? getCompleteTasks : getUnCompleteTasks
    const { data, loading, error, page, loadPage, reload } = useFetching(getTasks)
    const [showAddNewArea, setShowAddNewArea] = useState(false)
    const [uploadImgTask, setUploadImgTask] = useState({
        base64: '',
        fileOriginObj: null
    });

    const toggleAddNewArea = () => {
        setShowAddNewArea(!showAddNewArea)
    }

    const pendingCallAPI = useRef(null)
    const onFinish = async (values) => {
        try {
            pendingCallAPI.current.disabled = true
            var newTask = await createTask(values.title)
            var newTask = newTask.data
            if (uploadImgTask.fileOriginObj) {
                await addImgTask(uploadImgTask.fileOriginObj, newTask?.id)
            }
            pendingCallAPI.current.disabled = false
            form.resetFields()
            reload()
            toggleAddNewArea()
        } catch (error) {
            pendingCallAPI.current.disabled = false
        }
    }


    const inputNewArea = (
        <Form
            onFinish={onFinish}
            form={form}
        >
            <Space>
                <UploadImage setImg={setUploadImgTask} />
                <Form.Item
                    name='title'
                    style={{ marginBottom: 0 }}
                >
                    <Input></Input>
                </Form.Item>
                <Button type='primary' htmlType='submit' ref={pendingCallAPI}>Add</Button>
                <CloseOutlined onClick={toggleAddNewArea} />
            </Space>
        </Form >
    )

    const element = (
        <>
            {contextHolder}
            <TaskDetailModal
                ok={() => {
                    dispatch(reloadTaskList())
                }}
                onDelete={() => {
                    dispatch(reloadTaskList())
                }} />
            <div className="list">
                <h3 className="list-title">{props.title}</h3>
                <Pagination current={page.page} total={page.total} showSizeChanger onChange={(page, pageSize) => {
                    loadPage(page, pageSize)
                }} />;
                <ul className="list-items">
                    {
                        loading ? Array(10).fill(0).map((item, index) => <Skeleton key={index} active />) :
                            data?.sort((task1, task2) => {
                                let date1 = new Date(task1.attributes.createdAt)
                                let date2 = new Date(task2.attributes.createdAt)
                                if (date1 > date2) { return 1 }
                                if (date1 < date2) { return -1 }
                                if (date1 == date2) { return 0 }
                            }).map(item => {
                                return <li key={item?.id}
                                    onClick={() => {
                                        dispatch(openModal(item))
                                    }}>
                                    <Row align="middle" justify="space-between">
                                        <Avatar src={`${VITE_ORIGIN}${item?.attributes?.image?.data?.attributes?.url}`}></Avatar>
                                        {item?.attributes?.title}
                                        <DeleteOutlined onClick={async (e) => {
                                            try {
                                                e.stopPropagation()
                                                await deleteTask(item?.id)
                                                infoNotify('topRight', 'Xóa thành công', item?.id)
                                                reload()
                                            } catch (error) {
                                                errorNotify('topRight', 'Xóa thất bại', item?.id)
                                            }
                                        }} />
                                    </Row>
                                </li>
                            })
                    }
                    {showAddNewArea ? inputNewArea : <button className="add-card-btn btn" onClick={toggleAddNewArea}>Add a card</button>}
                </ul>
            </div>
        </>)

    let btnReload = <Button icon={<ReloadOutlined />}
        onClick={() => {
            reload()
        }}
    >Reload</Button>

    return render(loading, error, element, btnReload)

}