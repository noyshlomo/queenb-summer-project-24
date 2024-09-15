import { useEffect } from 'react';
import styles from './ListInput.module.css';

// ListInput component to dynamically manage a list of string inputs
const ListInput = ({ label, items, setItems, emptyFields, fieldName, required }) => {
  
    // Function to add a new empty input field (an empty string in the list)
    const addItem = () => {
      // Adding an empty string to the items array if there are already items or if it's empty
      setItems([...items, ""]); 
    };
  
    // Function to update a specific item in the list of inputs
    const updateItem = (index, value) => {
      // Creating a copy of the current items
      const newItems = [...items]; 
      // Updating the item at the specified index with the new value
      newItems[index] = value;
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

    // Checking if the field is required and empty --- maybe not relevant!!!!!
    const isEmpty = required && items.every(item => item.trim() === "");

    return (
      <>
        <label>{label}</label>
        
        {/* Mapping through the items array and generating an input field for each item */}
        {items.map((item, index) => (
          <div key={index} className="input-container">
            <input
              type="text" 
              value={item} 
              onChange={(e) => updateItem(index, e.target.value)} // Updating the value in the list when the input changes
              // Error handling: applying 'error' class if the fieldName is included in emptyFields
              className={emptyFields.includes(fieldName) ? styles.error : ''} 
            />
            {/* Conditionally rendering the remove button if the item is not the first one */}
            {index > 0 && (
              <button type="button" onClick={() => removeItem(index)} className="remove-button">
                X
              </button>
            )}
            <div> {(emptyFields.includes(fieldName) || isEmpty) ? <div className="error-message">Required</div> : ''} </div>
          </div>
        ))}
  
        {/* Button to add a new input field (new empty item in the list) */}
        <button type="button" onClick={addItem}>
          Add {label.slice(0, -3)} {/* Removing the characters from the label for singular field name */}
        </button>
      </>
    );
  };

export default ListInput;
