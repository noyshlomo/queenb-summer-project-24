const CancelDisplay = ({ title, prepTime, description, ingredients, prepSteps, tags, imgLink, error, emptyFields, showCancel }) => {
    
    //Function to handle cancel button click
  const handleCancel = (e) => {
        // Making sure the user wants to cancel the form submission
        e.preventDefault();

        // Clearing form inputs and error state
        title('');
        prepTime(0);
        description('');
        ingredients([]);
        prepSteps([]);
        tags([]);
        imgLink('');
        error(null);
        emptyFields([]);
        showCancel(false);

        // Redirecting the user to the home page
        window.location.href = 'http://localhost:3000/';
        
    };
    
    
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '400px',
        textAlign: 'center',
      }}>
          <h2 style={{ marginBottom: '10px' }}>Are you sure you want to cancel? This will clear the form.</h2>
          <button onClick={handleCancel} style={{
            display: 'inline-block',
            margin: '10px 0',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '3px',
          }}>Yes</button>
          <button onClick={() => showCancel(false)} style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}>No</button>
      </div>
    </div>
    );
  }
  
export default CancelDisplay;