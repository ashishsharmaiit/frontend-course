import Chapter10Logo from '../../assets/Chapter10Logo.png'
import './Logo.css'; // Importing the CSS file

function Logo() {
    const logoStyle = {
        width: '150px', // Adjust width as needed
        height: 'auto'
    };

    return (
        <div className="logo-container">
            <img src= {Chapter10Logo} alt="Logo" style={logoStyle} />
        </div>
    );
}

export default Logo;
