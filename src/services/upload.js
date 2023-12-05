import axios from "axios";

export const upload = async (files, ref, refid, field) => {
    var formData = new FormData(); //upload phải sử dụng formData
    formData.append('files', files);
    formData.append('ref', ref);
    formData.append('refId', refid);
    formData.append('field', field);
    const response = await axios({
        method: 'POST',
        url: '/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};