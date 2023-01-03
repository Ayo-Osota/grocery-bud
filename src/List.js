import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({title, editGrocery, deleteGrocery, id}) => {
  return (
    <div className="grocery-item">
      <h4 className="title">{title}</h4>
      <div>
      <FaEdit className='edit-btn' onClick={() => editGrocery(id)}/>
      <FaTrash className='delete-btn' onClick={() => deleteGrocery(id)}/>
      </div>
    </div>
  )
}

export default List
