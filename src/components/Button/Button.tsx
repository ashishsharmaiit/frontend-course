import './Button.css'; // Importing the CSS file

type ButtonProps = {
    text: string;
    onClick: () => void; // Function to be called when the button is clicked
    // Add other props for styling or functionality as needed
};

function Button({ text, onClick }: ButtonProps) {
    return (
        <div className='buttonClass'>
            <button onClick={onClick}>
                {text}
            </button>
        </div>
    );
}

export default Button;
