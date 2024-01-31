import React, {FC, useState} from 'react';
import {ITodo} from "../../models/ITodo";
import DeleteIcon from '@mui/icons-material/Delete';
import style from "./ListItem.module.css"
import {Checkbox, FormControl, TextField, Typography} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux";
import {toggleComplete, removeTodo, updateTask} from "../../store/reducers/TodoSlice";
import { Reorder } from "framer-motion"

interface Task {
    task: ITodo
}

const ListItem: FC<Task> = ({task}) => {
    const dispatch = useAppDispatch()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [updatedValue, setUpdatedValue] = useState<string>(task.title)
    const onCompleteChange = () => {
        dispatch(toggleComplete(task.id))
    }
    const onRemoveClick = () => {
        dispatch(removeTodo(task.id))
    }
    const onUpdateTask = (e: React.KeyboardEvent<FormControl>) => {
        if (e.key === "Enter") {
            dispatch(updateTask(task.id, updatedValue))
            setIsEdit(false)
        }
    }
    return (
        <Reorder.Item as={"div"} value={task}>
            <div className={task.isCompleted ? style.list_item_completed : style.list_item} onDoubleClick={() => setIsEdit(true)}>
                <div className={style.list_body}>
                    {!isEdit && <Typography variant={"subtitle1"}>{task.title}</Typography>}
                    {isEdit && <TextField
                      fullWidth
                      value={updatedValue}
                      variant="standard"
                      onChange={e => setUpdatedValue(e.target.value)}
                      onKeyPress={e => onUpdateTask(e)}
                    />}
                </div>
                <div className={style.buttons}>
                    <Checkbox checked={task.isCompleted} onChange={onCompleteChange} />
                    <DeleteIcon cursor={"pointer"} onClick={onRemoveClick}/>
                </div>
            </div>
        </Reorder.Item>
    );
};

export default ListItem;