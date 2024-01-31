import React, {FC} from 'react';
import {ITodo} from "../../models/ITodo";
import DeleteIcon from '@mui/icons-material/Delete';
import style from "./ListItem.module.css"
import {Checkbox, Typography} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux";
import {toggleComplete, removeTodo} from "../../store/reducers/TodoSlice";

interface Task {
    task: ITodo
}

const ListItem: FC<Task> = ({task}) => {
    const dispatch = useAppDispatch()
    const onCompleteChange = () => {
        dispatch(toggleComplete(task.id))
    }
    const onRemoveClick = () => {
        dispatch(removeTodo(task.id))
    }
    return (
        <div className={task.isCompleted ? style.list_item_completed : style.list_item}>
            <Typography variant={"subtitle2"}>{task.title}</Typography>
            <div className={style.buttons}>
                <Checkbox checked={task.isCompleted} onChange={onCompleteChange} />
                <DeleteIcon cursor={"pointer"} onClick={onRemoveClick}/>
            </div>
        </div>
    );
};

export default ListItem;