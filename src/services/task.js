import axios from "axios";
import { upload } from "./upload";
import { store } from '@/redux/store'

export const getTaskByStatus = async (status = true, page, pageSize, signal) => {
    const { startDate, endDate } = store.getState().taskList.filters
    let queryFilterDate = ''
    if (startDate && endDate) {
        queryFilterDate = `&filters[date][$between]=${startDate}&filters[date][$between]=${endDate}`
    }
    const response = await axios.get(`/tasks?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[complete]=${status}${queryFilterDate}&sort[0]=createdAt:desc`, { signal });
    return response.data;
}

export const getCompleteTasks = async (page, pageSize, signal) => {
    return getTaskByStatus(true, page, pageSize, signal)
}

export const getUnCompleteTasks = async (page, pageSize, signal) => {
    return getTaskByStatus(false, page, pageSize, signal)
}

export const createTask = async (title) => {
    const response = await axios.post(`/tasks`, {
        "data": {
            "title": title
        }
    });
    return response.data;
}

export const updateTask = async (id, title, date, complete) => {
    const response = await axios.put(`/tasks/${id}`, {
        "data": {
            "title": title,
            "date": date,
            "complete": complete
        }
    });
    return response.data;
};

export const deleteTask = async (id) => {
    const response = await axios.delete(`/tasks/${id}`);
    return response.data;
};


export const addImgTask = async (files, idTask) => {
    const response = await upload(files, 'api::task.task', idTask, 'image');
    return response.data;
};

export const searchTask = async (txt) => {
    const response = await axios.get(`/tasks?pagination[page]=1&pagination[pageSize]=10&filters[title][$contains]=${txt}&populate=*`);
    return response.data;
}