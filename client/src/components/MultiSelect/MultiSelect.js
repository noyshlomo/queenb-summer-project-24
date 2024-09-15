import React from 'react';
import Select from 'react-select'; 
import styles from './MultiSelect.module.css';

  
const MultiSelect = ({ label, value, onChange , emptyFields, fieldName }) => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ];

    const handleChange = (selectedOptions) => {
        // Extracting the values from the selected options
        const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
        // Updating the parent state with selected values
        onChange(values); 
    };

    return(
        <>
        <label>{label}</label>
            <Select 
                name={fieldName}
                required
                value={options.filter(option => value.includes(option.value))} // Filtering options to show the selected values
                isMulti 
                onChange={handleChange} // Calling handleChange to extract the values
                className={emptyFields.includes(fieldName) ? styles.error : ''}
                options={options}
            />    
        </>
    )
    
}

export default MultiSelect;