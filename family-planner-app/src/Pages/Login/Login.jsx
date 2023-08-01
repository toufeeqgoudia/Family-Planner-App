import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Login = () => {
  const [currentForm, setCurrentForm] = useState('register');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  return (
    <>
      {currentForm === 'register' ? (
        <SignUp onFormSwitch={toggleForm} />
      ) : (
        <SignIn onFormSwitch={toggleForm} />
      )}
    </>
  );
}

export default Login