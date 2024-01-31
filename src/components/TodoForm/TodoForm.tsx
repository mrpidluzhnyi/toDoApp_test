import React, {useState} from 'react';
import {Button, FormControl, Grid, TextField} from "@mui/material";
import {useAppDispatch} from "../../hooks/redux";
import {addTodo} from "../../store/reducers/TodoSlice";

const TodoForm = () => {
    const dispatch = useAppDispatch()
    const [task, setTask] = useState<string>("")
    const onInputChange = (value: string) => {
        setTask(value)
    }
    const addTask = () => {
        const date = new Date()
        if (!task) return
        dispatch(addTodo({
            id: date.getTime(),
            title: task,
            isCompleted: false,
            createdAt: date.toString()
        }))
        setTask("")
    }
    const onEnterPress = (e: React.KeyboardEvent<FormControl>) => {
        if (e.key === "Enter") addTask()
    }


    return (
        <Grid container spacing={2} display={"flex"} alignItems={"center"} marginBottom={5}>
            <Grid item xs={12} md={9}>
                <TextField
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyPress={e => onEnterPress(e)}
                    value={task}
                    fullWidth
                    placeholder={"Enter your task..."}
                    variant="outlined"
                />
            </Grid>
            <Grid item xs={12} md={3}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={() => addTask()}
                >
                    Add task
                </Button>
            </Grid>
        </Grid>
    );
};

export default TodoForm;