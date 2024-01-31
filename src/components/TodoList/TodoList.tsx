import React, {useEffect, useState} from 'react';

import style from "./TodoList.module.css";
import {useAppSelector} from "../../hooks/redux";
import ListItem from "../ListItem/ListItem";
import {Typography} from "@mui/material";
import {ITodo} from "../../models/ITodo";

const TodoList = () => {
    const {tasks, filter} = useAppSelector(state => state.todoReducer)
    const [filteredTasks, setFilteredTasks] = useState<ITodo[]>([])
    console.log(tasks)
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
        <div className={style.list}>
            {!tasks.length &&
                <Typography variant="h3" gutterBottom>
                  You have no tasks
                </Typography>
            }
            {filteredTasks.map(el => <ListItem key={el.id} task={el}/>)}
        </div>
    );
};

export default TodoList;