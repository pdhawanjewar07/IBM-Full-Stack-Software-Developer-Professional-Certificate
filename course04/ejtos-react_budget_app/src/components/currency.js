import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const dropStyle = {
    color: '#66b45b'
};

const Currency = () => {
    const { currency, dispatch } = useContext(AppContext);

    const handleCurrencyChange = (newCurrency) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: newCurrency,
        });
    };

    return (
        <div className='alert alert-secondary'>
            <label htmlFor='currencySelect'>Currency:</label>
            <select
                id='currencySelect'
                value={currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                style={dropStyle}
            >
                <option value='$'>Dollar ($)</option>
                <option value='£'>Pound (£)</option>
                <option value='€'>Euro (€)</option>
                <option value='₹'>Rupee (₹)</option>
            </select>
        </div>
    );
};

export default Currency;
