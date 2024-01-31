import React, {useEffect} from 'react';
import {Container, Grid, Typography} from "@mui/material";
import TodoForm from "../../components/TodoForm/TodoForm";
import style from "./Main.module.css"
import TodoList from "../../components/TodoList/TodoList";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getTodos} from "../../store/reducers/TodoSlice";
import Filter from "../../components/Filter/Filter";
import {useTypographyVariant} from "../../hooks/typography";

const Main = () => {
    const dispatch = useAppDispatch()
    const {filter} = useAppSelector(state => state.todoReducer)
    const {title, subTitle} = useTypographyVariant()
    const subtitlesMap = {
        "all": "Your all tasks",
        "active": "Your active tasks",
        "completed": "Your completed tasks",
    }
    useEffect(() => {
        dispatch(getTodos())
    }, [])

    return (
        <Container maxWidth={"md"} className={style.container}>
            <Typography variant={title} gutterBottom>
                Todo App
            </Typography>
            <TodoForm/>
            <Grid container spacing={2} display={"flex"} alignItems={"center"} marginBottom={3}>
                <Grid item xs={12} md={9}>
                    <Typography variant={subTitle} textAlign={"left"}>{subtitlesMap[filter]}</Typography>
                </Grid>
                <Grid item xs={12} md={3}><Filter/></Grid>
            </Grid>
            <TodoList/>
        </Container>
    );
};

export default Main;