import axiosClient from './axiosClient';

const END_POINT = {
    TODOS : "todos"
}
export const getTodosAPI = () => {
    return axiosClient.get(`${END_POINT.TODOS}`)
}

export const delTodoAPI = (id) => {
    return axiosClient.delete(`${END_POINT.TODOS}/${id}`)
}

export const addTodosAPI = (data) => {
    return axiosClient.post(`${END_POINT.TODOS}`, data)
}

export const editTodosAPI = (data) => {
    return axiosClient.put(`${END_POINT.TODOS}`, data)
}