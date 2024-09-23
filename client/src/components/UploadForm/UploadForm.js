import { useState, useEffect } from "react";
import api from "../../services/api";
import styles from './UploadForm.module.css';
import FormInput from '../FormInput/FormInput';
import FormTextArea from "../FormTextArea/FormTextArea";
import ListInput from "../ListInput/ListInput";
import MultiSelect from "../MultiSelect/MultiSelect";
import ProgressBar from "../ProgressBar/ProgressBar";
import CancelPopup from "../CancelPopup/CancelPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
//import useUserContext from "../../hooks/useUserContext";

// Component for uploading recipes through a form
const UploadForm = () => {
  // Declaring state variables for form inputs
  const [title, setTitle] = useState('');
  const [prepTime, setPrepTime] = useState(0);
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]); 
  const [prepSteps, setPrepSteps] = useState([]); 
  const [tags, setTags] = useState([]); 
  const [imgLink, setImgLink] = useState('');

  // Declaring state variable for error handling 
  const [error, setError] = useState(null);

  // Declaring state variable for empty fields not filled before submission, for validation
  const [emptyFields, setEmptyFields] = useState([]);

  // Declaring state variables for confirming submission, cancelling submission, and success of the upload
  const [showCancel, setShowCancel] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Declaring state variable for progress bar state
  const [progress, setProgress] = useState(0);

  //TODO: CHECK RINA'S CODE:
  // Accessing user via the costume hook
  //const {user} = useUserContext();
  // Assuming userId is stored in user._id - saving the userId for later use in handleSubmit
  //const userId = user?._id;
  
  // Setting up effect for handling submit after progress bar completion
  useEffect(() => {
    if (progress === 100) {
      setShowSuccess(true);
    }
  }, [progress]);


  // Function for the first step after the user clicks the submit button:
  // Starting the process when the form is submitted, first validating fields and confirming the submission
  const startProcess = async (e) => {
    e.preventDefault();

    // Trimming each item in ingredients and prepSteps arrays for later checking if the items are empty
    // Note: trim is a function that removes leading and trailing whitespace from a string
    const trimmedIngredients = ingredients.map(item => item.trim());
    const trimmedPrepSteps = prepSteps.map(item => item.trim());

    // Defining required fields for the recipe
    const requiredFields = {
      title,
      prepTime,
      description,
      ingredients: trimmedIngredients,
      prepSteps: trimmedPrepSteps,
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
    // and also checking if there are any empty strings in the ingredients or prepSteps array
    if ((trimmedIngredients.some(item => item === ''))||(trimmedIngredients[0] === '' && trimmedIngredients.length === 1)){
      emptyFieldsForRecipe.push("ingredients");
    }
    if ((trimmedPrepSteps.some(item => item === ''))||(trimmedPrepSteps[0] === '' && trimmedPrepSteps.length === 1)){
      emptyFieldsForRecipe.push("prepSteps");
    }

    // If there are empty fields, updating the emptyFields indicator and returning
    if (emptyFieldsForRecipe.length > 0) {
      setEmptyFields(emptyFieldsForRecipe);
      return;
    }
  
    // Clearing the emptyFields if validation passes
    setEmptyFields([]);
    
    // Changing the showConfirm indicator to true, for showing confirmation popup
    setShowConfirm(true);
  };
  
  // Function for second step:
  // After confirming the submission, this step is for showing the progress bar and submitting the form
  const handleConfirmSubmit = async () => {
    // Changing the showConfirm indicator to false, for hiding confirmation popup
    setShowConfirm(false); 
    // Showing the progress bar by changing the progress bar state to 10
    setProgress(10); 

    // Simulating the progress bar to simulate loading process, in intervals of 10
    let simulatedProgress = 0;
    // Note: setInterval is a JS function that calls a function or evaluates an expression at specified intervals
    const interval = setInterval(() => {
      // Incrementing the progress bar state by 10 every 200 milliseconds (0.2 seconds)
      simulatedProgress += 10;
      // Incrementing the progress bar state for showing the updated progress bar state
      setProgress(simulatedProgress);

      // if the progress bar has reached 100%, clearing the interval and submitting the form
      if (simulatedProgress >= 100) {
        // clearInterval is a JS function. it stops the interval from running any further by clearing it
        clearInterval(interval);
        // Submitting the form by in the handleSubmit function
        handleSubmit();
      }
    }, 200); 
  };

  

  // Function for the third step:
  // Handling form submission, by sending the recipe data to the server and showing success popup
  const handleSubmit = async () => {

    const userId = 'user222'; // TODO: fix to the user's id once the user login front is implemented

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
    
    // Making a POST request to the server to create the new recipe
    try {
      await api.post('/recipe/', recipe);

      //TODO: CHECK RINA'S CODE:
      // const userLocal = JSON.parse(localStorage.getItem('user'));
      // await api.post('/recipe/', recipe, {headers: { 'Authorization': `Bearer $(userLocal.token)`} })

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
      setProgress(0);
   } catch (err) {
      // Handling server errors
      setError(err);
      setEmptyFields(emptyFields || []);
      return;
    } 
  }

  // Returning the upload form component
  return (
    <div>
      <form className={styles.upload} onSubmit={startProcess}>
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
            required={showConfirm}
          />
          <ListInput 
            label="Preparation Steps:*" 
            items={prepSteps} 
            setItems={setPrepSteps} 
            emptyFields={emptyFields} 
            fieldName="prepSteps"
            required={showConfirm} 
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
          <div className="button-container">
          {/* button for raising a cancel popup, by setting showCancel to true */}
          <button type="button" onClick={() => setShowCancel(true)}>cancel</button>
          <button type="submit" onClick={startProcess}>submit</button> 
          </div>
          {/* if progress is greater than 0 and up to 100, showing the progress bar */}
          {progress > 0 && progress <= 100 && 
            <ProgressBar 
            progress={progress} 
            />
          }

          {/* if cancel button was pressed (showCancel is true), showing the cancel popup */}
          {showCancel && 
            <CancelPopup
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
          
          {/* if error is true (an error occurred in the server), showing the error popup */}
          {error && 
            <ErrorPopup 
            error={setError} 
            />
          }

          {/* if post request succeeded in handleSubmit, showing the success popup */}
          {showSuccess && 
            <SuccessPopup
            showSuccess = {setShowSuccess} 
            />
          }

          {/* if submit button was pressed, and the required fields are filled, showing the confirmation popup */}
          {showConfirm &&
            <ConfirmationPopup 
            confirm={showConfirm} 
            onConfirm={handleConfirmSubmit} 
            onCancel={setShowConfirm} 
            />
          }

        </form>      
  </div>
  )
}
 
export default UploadForm;
