import { useState } from 'react';
import OTPInput from './components/OTPInput';
import './App.css';

export default function App() {
  const [otp, setOtp] = useState('');

  const onChange = (value) => setOtp(value);

  return (
    <div className="container">
      <h1>React OTP Input</h1>
      <OTPInput
        value={otp}
        valueLength={6}
        onChange={onChange}
      />
    </div>
  );
}