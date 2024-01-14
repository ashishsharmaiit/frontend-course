    import { useContext, useState } from 'react';
    import UserContext from '../../hooks/context/UserContext';
    import Logo from '../../components/Logo/Logo';
    import Text from '../../components/Text/Text';
    import TextBox from '../../components/TextBox/TextBox';
    import Button from '../../components/Button/Button';
    import ErrorComponent from '../../components/ErrorMessage/ErrorMessage';
    import { useNavigate } from 'react-router-dom';

    function LoginPage() {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [error, setError] = useState('');
        const navigate = useNavigate();
        const userContext = useContext(UserContext);

        if (!userContext) {
            throw new Error('useContext must be used within a UserContext.Provider');
        }
        
        const { setUserId, setName } = userContext;
        

        const handleLogin = async () => {
            if (!username || !password) {
                setError('Username and password are required');
                return;
            }
            setError(''); // Clear any previous errors

            try {
                const response = await fetch('http://192.168.0.14:5000/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const responseData = await response.json();
                if (responseData.userid != null) {
                console.log('Login successful. User ID:', responseData.userid);
                setUserId(responseData.userid);
                setName(responseData.name); // Save the name in the context
                navigate('/home'); // Navigate with the fetched data
            }
            else
            {
                console.log('Login Failed. User ID:', responseData.userid);
            }
                // Additional logic after successful login can be added here

            } catch (error) {
                console.error('Error:', error);
                setError('Login failed. Please try again.');
            }
        };

        return (
            <div className="login-screen-container">
                <Logo />
                <Text tag='h2' text='Login Screen' textAlign='center' />
                <TextBox placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
                <TextBox placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                {error && <ErrorComponent />} {/* Display error if it exists */}
                <Button text='Submit' onClick={handleLogin} />
            </div>
        );
    }

    export default LoginPage;
