import  { Column } from '@tanstack/react-table'
import { InputChangeEventHandler } from '../../types/types';


function Filter({ column }: { column: Column<any, unknown> }) {
  const handleChange: InputChangeEventHandler  = (event) => {
    column.setFilterValue(event.target.value);
  };

  return <input className='filterField' type="text" onChange={handleChange} />
}

export default Filter;