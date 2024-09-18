import { useEffect } from 'react';
import styles from './ListInput.module.css';

// ListInput component to dynamically manage a list of string inputs
// props:
// label: The label for the list input field in the form
// items - the state variable, which is a list of strings representing the inputs in the list
// setItems - the set function to update the state variable with the new list of inputs
// emptyFields - the state variable to store any empty fields not filled in the form
// fieldName - the name of the current field in the form (as a string)
// required - a boolean indicating whether the field is required or not, in the case of pressing the submit button 
const ListInput = ({ label, items, setItems, emptyFields, fieldName, required }) => {
  
    // Function to add a new empty input field (an empty string in the list)
    const addItem = () => {
      setItems([...items, ""]); 
    };
  
    // Function to update a specific item in the list of inputs
    const updateItem = (index, value) => {
      // Creating a copy of the current items
      const newItems = [...items]; 
      // Updating the item at the specified index with the new value, removing any leading or trailing whitespace
      newItems[index] = value.trim();
      // Updating the state with the modified array
      setItems(newItems); 
    };

    // Function to remove an item from the list (excluding the first item):
    // Removes an item from the list based on its index, and prevents the deletion of the first item in the list.
    // Filters out the item with the specified index and updates the state.
    const removeItem = (index) => {
      // Checking if the index is greater than 0 to ensure the first item cannot be deleted
      if (index > 0) { 
        // Creating a new array excluding the item at the given index:
        // The underscore (`_`) is a placeholder for the item itself, which is ignored.
        // `i` represents the current index.
        // `i !== index` returns `true` for all indices except the one to be removed, thus excluding the item at `index`.
        setItems(items.filter((_, i) => i !== index));
      }
    };

    // Ensuring there's always at least one item box on the screen
    useEffect(() => {
      if (items.length === 0) {
        setItems([""]);
      }
    }, [items, setItems]);

    return (
      <>
        <label>{label}</label>
        <div className={styles.container}>
        {/* Mapping through the items array and generating an input field for each item. */}
        {items.map((item, index) => (
          <div key={index} className={styles.inputContainer}> 
          {/* Automatically provided 'index' represents the position of the current item in the array.
            It is passed as the second argument to the 'map' function, making it available to use.
            React relies on this 'key' to uniquely identify and track elements in the list. */}
            <div className={styles.inputWrapper}>
            <input
              type="text" 
              value={item} 
              onChange={(e) => updateItem(index, e.target.value)} // Updating the value in the list when the input changes
              // Error handling: applying 'error' class if the fieldName is included in emptyFields
              className={emptyFields.includes(fieldName) && item.trim() === '' ? styles.error : ''} 
            />
            {/* Showing Required if the item is empty and the submit button was pressed, 
            or if this field is included in emptyFields and considered not filled for submission */}
            { (emptyFields.includes(fieldName) || (item.trim() === '' && required)) && 
              <div className={styles.errorText}>Required</div>
            }
            </div>
            {/* Conditionally rendering the remove button if the item is not the first one (the index in the list is greater than 0) */}
            {index > 0 && (
              <button type="button" onClick={() => removeItem(index)} className={styles.removeButton}>
                X
              </button>
            )} 
            </div>
        ))}
  
        {/* Button to add a new input field (new empty item in the list) */}
        <button type="button" onClick={addItem} className={styles.addButton} >
          Add {label.slice(0, -3)} {/* Removing the characters from the label for singular field name (removing the "s:*") */}
        </button>
        </div>
      </>
    );
  };

export default ListInput;
