import { useState, useEffect } from "react";
import api from "../../services/api";
import styles from './EditForm.module.css';
import FormInput from '../FormInput/FormInput';
import FormTextArea from "../FormTextArea/FormTextArea";
import ListInput from "../ListInput/ListInput";
import MultiSelect from "../MultiSelect/MultiSelect";
import CancelEditPopup from "../CancelEditPopup/CancelEditPopup";
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";
import { useRecipesContext } from '../../hooks/useRecipesContext'; 
import { useUserContext } from '../../hooks/useUserContext';

const EditForm = ({ recipeId, setRecipeToEdit, onUpdateRecipe }) => { 
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

  const { user } = useUserContext(); 
  const userId = user?._id;

  const { dispatch } = useRecipesContext();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipe/${recipeId}`);
        const recipe = response.data;
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
    submissionTime: new Date().toISOString(),
    userId,
  };

  try {
    const userLocal = JSON.parse(localStorage.getItem('user'));

    if (!userLocal || !userLocal.token) {
      setError("User not authenticated. Please log in.");
      return;
    }

    const response = await api.put(`/recipe/profile/${recipeId}`, recipe, {
      headers: {
        'Authorization': `Bearer ${userLocal.token}`, 
      },
    });

    if (response.status === 200) {
      setShowSuccess(true);
      setShowCancel(false);
      onUpdateRecipe({ ...recipe, _id: recipeId });
    
      dispatch({ type: 'UPDATE_RECIPE', payload: recipe });
      setRecipeToEdit(null);  
    } else {
      console.error("Failed to update the recipe:", response.status);
      setError("Failed to update the recipe. Please try again.");
    }

  } catch (err) {
    console.error("Error updating recipe:", err);
    setError("An error occurred while updating the recipe. Please try again.");
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
        <div className={styles.buttonContainerEdit}>
          <button type="button" className={styles.bCancelEdit} onClick={() => setShowCancel(true)}>
            Cancel
          </button>
          <button type="submit" className={styles.bSubmitEdit}>
            Save Changes
          </button> 
      </div>

      
         {/* Show Cancel Edit Popup */}
      {showCancel && 
        <CancelEditPopup
          showCancel={setShowCancel}
        />
      }
              
              
          {error && 
            <ErrorPopup 
            error={setError} 
            />
          }
       
          {showSuccess && 
            <SuccessPopup
            showSuccess = {setShowSuccess} 
            />
          }
      
          {showConfirm &&
            <ConfirmationPopup 
            confirm={showConfirm} 
            onConfirm={handleConfirmSubmit} 
            onCancel={() => setShowConfirm(false)} 
            />
          }
      </form>
    </div>
  );
};

export default EditForm;