// ErrorComponent.js
import './ErrorMessage.css'; // Import the CSS for styling

function ErrorComponent() {
    return (
        <div className="error-container">
            <div className="error-symbol">!</div>
            <div className="error-message">Enter at least one topic</div>
        </div>
    );
}

export default ErrorComponent;
