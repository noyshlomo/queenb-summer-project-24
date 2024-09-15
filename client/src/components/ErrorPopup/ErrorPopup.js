
const ErrorPopup = ({error}) => (
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
        <h2 style={{ marginBottom: '10px', color: 'red'}}>Error</h2>
        <p>An Error Has Occurred - please try again later </p>
        <a 
          href={`/upload/`}
          onClick={error(false)} 
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
          Back to Upload Page
        </a>
      </div>
    </div>
  );

export default ErrorPopup;
