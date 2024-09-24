import { useState, useEffect } from "react";
import api from "../../services/api";
import styles from './EditForm.module.css';
import FormInput from '../FormInput/FormInput';
import FormTextArea from "../FormTextArea/FormTextArea";
import ListInput from "../ListInput/ListInput";
import MultiSelect from "../MultiSelect/MultiSelect";
import CancelPopup from "../CancelPopup/CancelPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { useRecipesContext } from '../../hooks/useRecipesContext'; 


// Edit form for existing recipes
const EditForm = ({ recipeId, setRecipeToEdit, onUpdateRecipe }) => {  // Recipe ID should be passed in as a prop
  const [title, setTitle] = useState('');
  const [prepTime, setPrepTime] = useState(0);
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]); 
  const [prepSteps, setPrepSteps] = useState([]); 
  const [tags, setTags] = useState([]); 
  const [imgLink, setImgLink] = useState('');

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [showCancel, setShowCancel] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { dispatch } = useRecipesContext();

  // Fetch recipe data by ID when component mounts
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipe/${recipeId}`);
        const recipe = response.data;
        // Pre-fill the form with the existing recipe data
        setTitle(recipe.title);
        setPrepTime(recipe.prepTime);
        setDescription(recipe.description);
        setIngredients(recipe.ingredients);
        setPrepSteps(recipe.prepSteps);
        setTags(recipe.tags);
        setImgLink(recipe.imgLink);
      } catch (err) {
        setError('Failed to load recipe details');
      }
    };
    
    fetchRecipe();
  }, [recipeId]);

  const startProcess = (e) => {
    e.preventDefault();
    
    const requiredFields = {
      title,
      prepTime,
      description,
      ingredients,
      prepSteps,
      tags,
      imgLink
    };

    const emptyFieldsForRecipe = Object.keys(requiredFields).filter(field => 
      !requiredFields[field] || 
      (Array.isArray(requiredFields[field]) && requiredFields[field].length === 0)
    );

    if ((ingredients.some(item => item.trim() === ''))||(ingredients[0] === '' && ingredients.length === 1)){
      emptyFieldsForRecipe.push("ingredients");
    }
    if ((prepSteps.some(item => item.trim() === ''))||(prepSteps[0] === '' && prepSteps.length === 1)){
      emptyFieldsForRecipe.push("prepSteps");
    }

    if (emptyFieldsForRecipe.length > 0) {
      setEmptyFields(emptyFieldsForRecipe);
      return;
    }
  
    setEmptyFields([]);
    setShowConfirm(true);
  };

  const handleConfirmSubmit = async () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    const recipe = {
      title,
      prepTime,
      imgLink,
      description,
      ingredients,
      prepSteps,
      tags,
      submissionTime: new Date().toLocaleString() + '',
    };

    try {
      const response = await api.put(`/recipe/profile/${recipeId}`, recipe); // Update the recipe
      if (response.status === 200) {
        setShowSuccess(true);
        setShowCancel(false);
        onUpdateRecipe({ ...recipe, _id: recipeId });

        // Dispatch the updated recipe and close the form
        dispatch({ type: 'UPDATE_RECIPE', payload: recipe });
        setRecipeToEdit(null);  // Close the EditForm after success
    } else {
        console.error("Failed to update the recipe:", response.status);
    }

} catch (err) {
    console.error("Error updating recipe:", err);
    setError(err);
    setEmptyFields(emptyFields || []);
}
  };

  return (
    <div>
      <form className={styles.upload} onSubmit={startProcess}>
        <h2>Edit Recipe:</h2>
        <FormInput 
          label="Title:*" 
          type="text" 
          value={title} 
          onChange={setTitle} 
          emptyFields={emptyFields} 
          fieldName="title" 
        />
        <FormInput 
          label="Preparation Time (in minutes):*" 
          type="number" 
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
          value={tags}
          onChange={setTags}
          emptyFields={emptyFields}
          fieldName="tags"
        />
        <FormInput 
          label="Image Link:*" 
          type="text" 
          value={imgLink} 
          onChange={setImgLink}
          emptyFields={emptyFields} 
          fieldName="imgLink" 
        />
        {/* <div className="button-container">
          <button type="button" onClick={() => setShowCancel(true)}>Cancel</button>
          <button type="submit">Save Changes</button> 
        </div>

        {showCancel && <CancelPopup setShowCancel={setShowCancel} />}
        {error && <ErrorPopup error={setError} />}
        {showSuccess && <SuccessPopup setShowSuccess={setShowSuccess} />}
        {showConfirm && (
          <ConfirmationPopup 
            confirm={showConfirm} 
            onConfirm={handleConfirmSubmit} 
            onCancel={setShowConfirm} 
          />
        )} */}
         <div className="button-container">
          {/* button for raising a cancel popup, by setting showCancel to true */}
          <button type="button" onClick={() => setShowCancel(true)}>cancel</button>
          <button type="submit" onClick={startProcess}>submit</button> 
          </div>
     
         

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
  );
};

export default EditForm;
