import moment from 'moment'


export const getMonth = () => {
  return moment().format("MMMM");  
}