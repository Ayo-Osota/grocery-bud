import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let groceryList = localStorage.getItem('groceryList');
  if (groceryList) {
    return JSON.parse(localStorage.getItem('groceryList'))
  } else {
    return [];
  }
}

function App() {
  const [groceryTitle, setGroceryTitle] = useState('');
  const [groceryList, setGroceryList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const submitHandler = (e) => {
    e.preventDefault();
    if (!groceryTitle) {
      showAlert(true, 'please enter value', 'danger');
    } else if (groceryTitle && isEditing) {
      setGroceryList(
        groceryList.map((grocery) => {
          if (grocery.id === editId) {
            return { ...grocery, title: groceryTitle };
          }
          return grocery;
        })
      );
      setGroceryTitle('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'value changed', 'success');
    } else {
      showAlert(true, "item added to the list", "success");
      setGroceryList([...groceryList, { id: new Date().getTime().toString(), title: groceryTitle }]);
      setGroceryTitle('');
    }
  }

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({show, msg, type});
  }

  const editGrocery = (id) => {
    console.log('edit');
    const specificItem = groceryList.find((grocery) => grocery.id === id);
    setIsEditing(true);
    setEditId(id)
    setGroceryTitle(specificItem.title);
  }

  const deleteGrocery = (id) => {
    showAlert(true, "item removed", "success")
    setGroceryList(groceryList.filter((item) => item.id !== id))
  }

  const clearList = () => {
    showAlert(true, "empty list", "danger");
    setGroceryList([]);
  }

  useEffect(() => {
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
  }, [groceryList])

  return (
    <section className="section">
      <div className="section-center">
        <form action="submit" className='grocery-form' onSubmit={submitHandler}>
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={groceryList} />}
          <h3>Grocery Bud</h3>
          <div className="form-control">
            <input
              type="text"
              name="grocery"
              id="grocery"
              className='grocery'
              placeholder='e.g.eggs'
              value={groceryTitle}
              onChange={(e) => setGroceryTitle(e.target.value)}
            />
            <button type="submit" className='submit-btn'>submit</button>
          </div>
        </form>
        <article className="grocery-container">
          {groceryList.map((groceryItem) => {
            const { title, id } = groceryItem
            return <List
              key={id}
              id={id}
              title={title}
              editGrocery={editGrocery}
              deleteGrocery={deleteGrocery}
            />
          })}
        </article>
        {groceryList.length > 0 && <button type="button" className='clear-btn' onClick={clearList}>
          clear all
        </button>}
      </div>
    </section>
  )
}

export default App
