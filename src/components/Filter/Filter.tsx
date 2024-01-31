import React from 'react';
import {FormControl, InputLabel, MenuItem} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {changeFilter, FilterType} from "../../store/reducers/TodoSlice";

const Filter = () => {
    const dispatch = useAppDispatch()
    const {filter} = useAppSelector(state => state.todoReducer)
    const onFilterChange = (event: SelectChangeEvent<FilterType>) => {
        dispatch(changeFilter(event.target.value))
    }
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Filter"
                onChange={onFilterChange}
            >
                <MenuItem value={"all"}>All</MenuItem>
                <MenuItem value={"active"}>Active</MenuItem>
                <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
        </FormControl>
    );
};

export default Filter;