// src/components/Auth.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/Firebase';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleAuthMode = () => setIsLogin(!isLogin);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        alert('login Successful');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('login Successful');

      }
    } catch (error) {
      console.error('Error during authentication:', error);

    }
  };

  return (
    <div className="auth-container p-6 max-w-md mx-auto">
      <h2 className="text-center text-2xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button onClick={toggleAuthMode} className="mt-4 underline text-blue-600">
        {isLogin ? 'Create an account' : 'Already have an account? Log in'}
      </button>
    </div>
  );
};

export default Auth;
