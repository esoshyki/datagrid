import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import { changeVisibility } from '../../state/actions/columns';

const useStyles = makeStyles(theme => ({
  // formControl: {
  //   margin: theme.spacing(1),
  //   minWidth: 120,
  // },
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  // },
}));

const ColumnVisibility = ({columns, dispatch}) => {
  const classes = useStyles()

  const handleChange = ({target}) => {
    const index = target.value - 1;
    const isVisibleValue = !columns[index].isVisible;
    dispatch(changeVisibility({index, isVisibleValue}))
  }

  return (
    <FormControl >
      <InputLabel id="columns-select">Columns</InputLabel>
      <Tooltip title="Show Columns">
        <Select
          labelId="columns-select"
          id="cols-filter-select"
          value=''
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
