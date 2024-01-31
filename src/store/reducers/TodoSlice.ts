import {ITodo} from "../../models/ITodo";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import StorageService, {STORAGE_KEYS} from "../../services/StorageService";
import {AppDispatch} from "../store";

export type FilterType = "completed" | "active" | "all"
interface TodoState {
    tasks: ITodo[],
    filter: FilterType
}

const initialState: TodoState = {
    tasks: [],
    filter: "all"
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setTasks (state, action: PayloadAction<ITodo[]>) {
            state.tasks = action.payload
        },
        setFilter (state, action: PayloadAction<FilterType>) {
            state.filter = action.payload
        },
    },
})

export const getTodos = () => (dispatch: AppDispatch) => {
    dispatch(todoSlice.actions.setTasks(StorageService.getTasks(STORAGE_KEYS.TASKS)))
}

export const addTodo = (task: ITodo) => (dispatch: AppDispatch) => {
    const newList = [...StorageService.getTasks(STORAGE_KEYS.TASKS), task]
    StorageService.setTasks(STORAGE_KEYS.TASKS, newList)
    dispatch(todoSlice.actions.setTasks(newList))
}

export const removeTodo = (id: number) => (dispatch: AppDispatch) => {
    const newList = StorageService.getTasks(STORAGE_KEYS.TASKS).filter((el: ITodo) => {
        return el.id !== id
    })
    StorageService.setTasks(STORAGE_KEYS.TASKS, newList)
    dispatch(todoSlice.actions.setTasks(newList))
}

export const toggleComplete = (id: number) => (dispatch: AppDispatch) => {
    const newList = StorageService.getTasks(STORAGE_KEYS.TASKS).map((task: ITodo) => {
        if (task.id === id) {
            return {
                ...task,
                isCompleted: !task.isCompleted
            }
        }
        return task
    })
    StorageService.setTasks(STORAGE_KEYS.TASKS, newList)
    dispatch(todoSlice.actions.setTasks(newList))
}

export const changeFilter = (filterValue: FilterType) => (dispatch: AppDispatch) => {
    dispatch(todoSlice.actions.setFilter(filterValue))
}

export default todoSlice.reducer