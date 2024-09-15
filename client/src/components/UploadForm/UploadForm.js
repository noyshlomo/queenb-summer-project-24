import { useState } from "react";
import axios from "axios";
import styles from './UploadForm.module.css';
import FormInput from '../FormInput/FormInput';
import FormTextArea from "../FormTextArea/FormTextArea";
import ListInput from "../ListInput/ListInput";
import MultiSelect from "../MultiSelect/MultiSelect";
import CancelDisplay from "../CancelDisplay/CancelDisplay";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

const UploadForm = () => {
  // Declaring state variables for form inputs
  const [title, setTitle] = useState('');
  const [prepTime, setPrepTime] = useState(0);
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]); 
  const [prepSteps, setPrepSteps] = useState([]); 
  const [tags, setTags] = useState([]); 
  const [imgLink, setImgLink] = useState('');

  // Declaring state variables for error handling 
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  // Declaring state variables for submitting, cancelling, and success states
  const [showCancel, setShowCancel] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Function to handle form input changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = 'user123'; // TODO: fix to the user's id
  
    // Defining required fields for the recipe
    const requiredFields = {
      title,
      prepTime,
      description,
      ingredients,
      prepSteps,
      tags,
      imgLink
    };
  
    // Validating fields:
    // Object.keys(requiredFields) retrieves an array of all the keys.
    // `!requiredFields[field]` checks if the value is falsy (null`, `undefined`, `0`, `""`, or `false`).
    // `Array.isArray(requiredFields[field]) && requiredFields[field].length === 0` checks if the value is an empty array. 
    // The result: `emptyFields` array contains all keys for which the value in `requiredFields` is either falsy(unfilled) or an empty array.
    const emptyFieldsForRecipe = Object.keys(requiredFields).filter(field => !requiredFields[field] || (Array.isArray(requiredFields[field]) && requiredFields[field].length === 0));
    
    // Additional validation for the ingredients and prepSteps fields:
    // Checking if the first item in the ingredients or prepSteps array is empty string
    if (ingredients[0] === "" && ingredients.length === 1){
      emptyFieldsForRecipe.push('ingredients');
    }
    if (prepSteps[0] === "" && prepSteps.length === 1){
      emptyFieldsForRecipe.push('prepSteps');
    }

    console.log('empty fields:', emptyFieldsForRecipe);

    // If there are empty fields, updating the error state and returning
    if (emptyFieldsForRecipe.length > 0) {
      setError('All fields are required');
      setEmptyFields(emptyFieldsForRecipe);
      return;
    }
  
    // Clearing the error and emptyFields if validation passes
    setError(null);
    setEmptyFields([]);
  
    // Defining the recipe object
    const recipe = {
      title,
      prepTime,
      imgLink,
      submissionTime: new Date().toLocaleString() + '',
      description,
      ingredients,
      prepSteps,
      tags,
      userId
    };
    
    console.log('tags submitted:', tags);
    // Making a POST request to the server to create the new recipe
    // const response = await fetch('http://localhost:5000/api/recipe/', {
    //   method: 'POST',
    //   body: JSON.stringify(recipe),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // });

    // Handling response from server
    //const json = await response.json();
  
    // Handling errors or empty fields in the response from the server
    //   if (!response.ok) {
    //     setError(json.error);
    //     setEmptyFields(json.emptyFields || []);
    //   } else {
    //     // Clearing form inputs if successful
    //     setTitle('');
    //     setPrepTime(0);
    //     setDescription('');
    //     setIngredients([]);
    //     setPrepSteps([]);
    //     setTags([]);
    //     setImgLink('');
    //   }
    // };

    try {
      axios.post('http://localhost:5000/api/recipe/', recipe);
      // Clearing form inputs if successful
      setTitle('');
      setPrepTime(0);
      setDescription('');
      setIngredients([]);
      setPrepSteps([]);
      setTags([]);
      setImgLink('');
      setShowSuccess(true);
      setShowCancel(false);
    } catch (err) {
      setError(err);
      setEmptyFields(emptyFields || []);
      return;
    }
  }
  // Returning the upload form component
  return (
    <div>
      <form className={styles.upload} onSubmit={handleSubmit}>
        <h2>Recipe Details:</h2>
          <FormInput 
            label="Title:*" 
            type = {"text"} 
            value={title} 
            onChange={setTitle} 
            emptyFields={emptyFields} 
            fieldName="title" 
          />
          <FormInput 
            label="Preparation Time (in minutes):*" 
            type = {"number"} 
            value={prepTime} 
            onChange={setPrepTime} 
            emptyFields={emptyFields} 
            fieldName="prepTime" 
          />
          <FormTextArea 
            label="Description:*" 
            value={description} 
            onChange={setDescription} 
            emptyFields={emptyFields} 
            fieldName="description" 
          />
          <ListInput 
            label="Ingredients:*" 
            items={ingredients} 
            setItems={setIngredients} 
            emptyFields={emptyFields} 
            fieldName="ingredients"
          />
          <ListInput 
            label="Preparation Steps:*" 
            items={prepSteps} 
            setItems={setPrepSteps} 
            emptyFields={emptyFields} 
            fieldName="prepSteps" 
          />
          <MultiSelect 
            label="Tags:*"
            value = {tags}
            onChange = {setTags}
            emptyFields= {emptyFields}
            fieldName = "tags"
          />
          <FormInput 
            label="Image Link:*" 
            type = {"text"} 
            value={imgLink} 
            onChange={setImgLink}
            emptyFields={emptyFields} 
            fieldName="imgLink" 
          />
          <button type="button" onClick={() => setShowCancel(true)}>cancel</button>
          <button type="submit" onClick={handleSubmit}>submit</button> {/*TODO: add functionality to make sure the user wants to save + progress bar loading */}
         
          {showCancel && 
          <CancelDisplay
            title = {setTitle}
            prepTime= {setPrepTime}
            description= {setDescription}
            ingredients= {setIngredients}
            prepSteps= {setPrepSteps}
            tags= {setTags}
            imgLink= {setImgLink}
            error= {setError}
            emptyFields= {setEmptyFields}
            showCancel = {setShowCancel}
          />
          }
          
          {error && 
          // <div className= {styles.error}>{error}
          // </div>
          <ErrorPopup 
          error={setError} />
          }

          {showSuccess && 
            <SuccessPopup
            showSuccess = {setShowSuccess} />
          }
        </form>      
  </div>
  )
}
 
export default UploadForm;
