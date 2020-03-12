import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  select: {
    marginLeft: 15
  }
}));

const ColumnVisibility = ({columns, setColumns}) => {
  const classes = useStyles()

  const handleChange = ({target}) => {
    const index = target.value - 1;
    const newColumns = [...columns];
    const visibility = columns[index].isVisible
    newColumns[index].isVisible = !visibility;
    setColumns(newColumns)
  }

  return (
    <FormControl className={classes.formControl}>
      <Tooltip title="Show Columns">
        <Select
          labelId="cols-simple-select-label"
          id="cols-filter-select"
          value='Columns'
          onChange={handleChange}
          className={classes.select}
        >
          {columns.map(column => (
            <MenuItem key={column.title} value={column.id}>
              <Checkbox checked={column.isVisible}/>
              <ListItemText primary={column.title} />
            </MenuItem>
          ))}
        </Select>
      </Tooltip>
    </FormControl>
  )
}

export default ColumnVisibility
