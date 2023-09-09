import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { budget, dispatch, expenses } = useContext(AppContext);
    const [editableBudget, setEditableBudget] = useState(budget);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);

    const handleInputChange = (event) => {
        const newBudget = parseInt(event.target.value, 10);

        if (!isNaN(newBudget)) {
            if (newBudget > 20000) {
                alert('Budget cannot exceed £20,000');
            } else if (newBudget < totalExpenses) {
                alert('You cannot reduce the budget value lower than the spending');
            } else if (newBudget < 0) {
                alert('Budget cannot be negative');
            }
            else {
                setEditableBudget(newBudget);
            }
        } else {
            alert('Please enter a valid number');
        }
    };

    const handleBudgetUpdate = () => {
        dispatch({
            type: 'SET_BUDGET',
            payload: editableBudget,
        });
    };

    return (
        <div className='alert alert-secondary'>
            <label htmlFor='budgetInput'>Budget: $</label>
            <input
                id='budgetInput'
                type='number'
                value={editableBudget}
                onChange={handleInputChange}
                onBlur={handleBudgetUpdate}
                min={0}
                max={20000}
            />
        </div>
    );
};

export default Budget;
