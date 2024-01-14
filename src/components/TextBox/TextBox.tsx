import './TextBox.css'; // Importing the CSS file

type TextBoxProps = {
    paddingLeft?: string;
    paddingRight?: string;
    height?: string;
    placeholder?: string;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void; // Updated for textarea
};




function TextBox({ placeholder, onChange, paddingLeft, paddingRight, height }: TextBoxProps) {
    const style = { 
        paddingLeft,
        paddingRight,
        height,
    };
    return (
        <div className="text-container">
            <textarea style={style} placeholder={placeholder} onChange={onChange} />
        </div>
    );
}




export default TextBox;
