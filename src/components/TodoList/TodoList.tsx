import React, {useEffect, useState} from 'react';

import style from "./TodoList.module.css";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import ListItem from "../ListItem/ListItem";
import {Typography} from "@mui/material";
import {ITodo} from "../../models/ITodo";
import { Reorder } from "framer-motion"
import {reorderTodos} from "../../store/reducers/TodoSlice";

const TodoList = () => {
    const dispatch = useAppDispatch()
    const {tasks, filter} = useAppSelector(state => state.todoReducer)
    const [filteredTasks, setFilteredTasks] = useState<ITodo[]>([])
    const onDrop = (tasks: ITodo[]) => {
        dispatch(reorderTodos(tasks))
    }
    useEffect(() => {
        switch (filter) {
            case "all": {
                setFilteredTasks(tasks)
                break;
            }
            case "active": {
                const filteredTasks = tasks.filter((el: ITodo) => {
                    return !el.isCompleted
                })
                setFilteredTasks(filteredTasks)
                break;
            }
            case "completed": {
                const filteredTasks = tasks.filter((el: ITodo) => {
                    return el.isCompleted
                })
                setFilteredTasks(filteredTasks)
                break;
            }
            default: {
                setFilteredTasks(tasks)
                break;
            }
        }
    }, [filter, tasks])
    return (
        <>
            <span>*-double click to edit task (press "Enter" to accept changes)</span>
            <div className={style.list}>
                {!filteredTasks.length &&
                  <Typography variant="h3" gutterBottom>
                    You have no tasks
                  </Typography>
                }
                <Reorder.Group as={"div"} axis="y" values={filteredTasks} onReorder={onDrop}>
                    {filteredTasks.map(el => <ListItem key={el.id} task={el}/>)}
                </Reorder.Group>
            </div>
        </>
    );
};

export default TodoList;