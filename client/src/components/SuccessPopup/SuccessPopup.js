
const SuccessPopup = ({showSuccess}) => (
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
        <h2 style={{ marginBottom: '10px' }}>Recipe Uploaded Successfully!</h2>
        <p>Your new recipe has been added.</p>
        <a 
          href={`/recipes/`} 
          style={{
            display: 'inline-block',
            margin: '10px 0',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '3px',
          }}
        >
          View All Recipes
        </a>
        <button 
          onClick={() => showSuccess(false)}
          style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            backgroundColor: '#f0f0f0',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Close
        </button>
      </div>
    </div>
  );

export default SuccessPopup;
