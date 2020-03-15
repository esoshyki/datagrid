import { CSVLink } from "react-csv";
import ArrowDropDownCircleOutlinedIcon from '@material-ui/icons/ArrowDropDownCircleOutlined';

const csv = ({columns, renderedData}) => {
  const headers = columns.map(col => {
    return {
      label: col.title, key: col.dataKey
    }
  })

  const data = [...renderedData]

  return <CSVLink data={data} headers={headers}><ArrowDropDownCircleOutlinedIcon style={{width: "30px", height: "30px", marginLeft: "10px"}}/></CSVLink>
}

export default csv