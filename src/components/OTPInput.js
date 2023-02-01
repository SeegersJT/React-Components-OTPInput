import { useEffect, useState } from 'react';
import { isValidNumberChar } from '../tools/helpers';
import './OTPInput.css';

export default function OtpInput({ value, valueLength, onChange }) {
    const [valueItems, setValueItems] = useState([]);

    useEffect(() => {
        const valueArray = value.split('');
        const items = [];
    
        for (let i = 0; i < valueLength; i++) {
          const char = valueArray[i];
    
          if (isValidNumberChar(char)) {
            items.push(char);
          } else {
            items.push('');
          }
        }
    
        setValueItems(items);
    }, [value, valueLength]);

    const focusToNextInput = (target) => {
        const { nextElementSibling } = target;
    
        if (nextElementSibling) {
            nextElementSibling.focus();
        }
      };

    const focusToPrevInput = (target) => {
        const { previousElementSibling } = target;
    
        if (previousElementSibling) {
          previousElementSibling.focus();
        }
    };

    const inputOnChange = (e, idx) => {
        const { target } = e;
        let targetValue = target.value;
        const isTargetValueDigit = isValidNumberChar(targetValue)
    
        if (!isTargetValueDigit && targetValue !== '') {
            return;
        }

        const { nextElementSibling } = target;

        if (!isTargetValueDigit && nextElementSibling && nextElementSibling.value !== '') {
            return;
        }

        targetValue = isTargetValueDigit ? targetValue : ' ';

        const targetValueLength = targetValue.length;

        if (targetValueLength === 1) {
            const newValue = value.substring(0, idx) + targetValue + value.substring(idx + 1);
    
            onChange(newValue);

            if (!isTargetValueDigit) {
                return;
            }
        
            focusToNextInput(target);
        } else  if (targetValueLength === valueLength) {
            onChange(targetValue);

            target.blur();
        }
    };

    const inputOnKeyDown = (e) => {
        const { key } = e;
        const { target } = e;

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault();
            return focusToNextInput(target);
        }
      
          if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault();
            return focusToPrevInput(target);
        }

        const targetValue = target.value;

        target.setSelectionRange(0, targetValue.length);
        
        if (e.key !== 'Backspace' || target.value !== '') {
            return;
        }

        focusToPrevInput(target);
    };

    const inputOnFocus = (e) => {
        const { target} = e;
        const { previousElementSibling } = target;

        if (previousElementSibling && previousElementSibling.value === '') {
            return previousElementSibling.focus();
        }

        target.setSelectionRange(0, target.value.length);
    };



    return (
        <div className="otp-group">
            { valueItems.map((digit, idx) => (
                <input
                    key={idx}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={valueLength}
                    className="otp-input"
                    value={digit}
                    onChange={(e) => inputOnChange(e, idx)}
                    onKeyDown={inputOnKeyDown}
                    onFocus={inputOnFocus}
                />
            ))}
        </div>
    );
}