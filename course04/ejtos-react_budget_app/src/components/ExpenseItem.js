import React, { useContext } from 'react';
import { TiDelete } from 'react-icons/ti';
import { AppContext } from '../context/AppContext';
import plusIcon from '../icons/plus.png';
import minusIcon from '../icons/minus.png';

const buttonStyle = {
    background: 'none',
    border: 'none',
    padding: '0',
};

const ExpenseItem = (props) => {
    const { dispatch } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    const increaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: 10,
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    };

    const decreaseAllocation = (name) => {
        const expense = {
            name: name,
            cost: -10, // Decrease the cost by 10
        };

        dispatch({
            type: 'ADD_EXPENSE',
            payload: expense
        });
    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>${props.cost}</td>
            <td>
                <button style={buttonStyle} onClick={event => increaseAllocation(props.name)}>
                    <img src={plusIcon} alt="Increase" />
                </button>
            </td>
            <td>
                <button style={buttonStyle} onClick={event => decreaseAllocation(props.name)}>
                    <img src={minusIcon} alt="Decrease" />
                </button>
            </td>
            <td>
                <TiDelete size='1.5em' onClick={handleDeleteExpense} />
            </td>
        </tr>
    );
};

export default ExpenseItem;
