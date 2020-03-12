/*
[
  {
  "name":"Fiona Kuhlman",
  "email":"Petra30@yahoo.com",
  "nickName":"Gianni.Jakubowski",
  "age":45,"status":"design",
  "married":true,"exam":
  "2020-08-10T05:45:33.500Z"}
*/ 

const Filter = ({sortedData, findValue}) => {
  const newArray = sortedData.filter((element, idx) => {
    element.exam = new Date(element.exam).toDateString()
    return Object.values(element)
          .some(value => value.toString().toLowerCase().includes(findValue.toString().toLowerCase()))
  })
  return newArray
}

export default Filter