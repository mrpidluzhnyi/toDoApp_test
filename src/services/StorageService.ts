import {ITodo} from "../models/ITodo";

export enum STORAGE_KEYS {
    TASKS = "TASKS"
}

class StorageService {
    public getTasks (key: STORAGE_KEYS) {
        return JSON.parse(localStorage.getItem(key) || "[]")
    }
    public setTasks (key: STORAGE_KEYS, data: ITodo[]) {
        const strData = JSON.stringify(data)
        localStorage.setItem(key, strData)
    }
}

export default new StorageService();