import { CSVLink } from "react-csv";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'

const csv = ({columns, renderedData}) => {
  const headers = columns.map(col => {
    return {
      label: col.title, key: col.dataKey
    }
  })

  const data = [...renderedData]

  return (
    <CSVLink data={data} headers={headers}>
      <Tooltip title="Download in CSV">
        <Button variant="contained" color="primary" >
          Download CSV
        </Button>
      </Tooltip>
    </CSVLink>)
}

export default csv