import React, { useState } from 'react';
import './ExpenseTracker.css';

const ExpenseTracker = () => {
    const [input, setInput] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [selectedExpenseId, setSelectedExpenseId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const addExpense = () => {
        if (!input || !amount) return;
        const newExpense = {
            id: Date.now(),
            title: input,
            amount: parseFloat(amount)
        };
        setExpenses(prevExpenses => [...prevExpenses, newExpense]);
        resetForm();
        setSuccessMessage(`Expense ${newExpense.title} added successfully!`);
    }
    const updateExpense = () => {
        if (!selectedExpenseId) return;
        const updatedExpenses = expenses.map(exp =>
            exp.id === selectedExpenseId ? { ...exp, title: input, amount: parseFloat(amount) } : exp
        );
        setExpenses(updatedExpenses);
        resetForm();
        setSuccessMessage(`Expense updated successfully!`);
    };

    const deleteExpense = (id) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
        setSuccessMessage('Expense deleted successfully!');
    };
    const resetForm = () => {
        setInput('');
        setAmount('');
        setSelectedExpenseId(null);
    };

    return (
        <div className='container'>
            <h1>Expense Tracker</h1>
            <div className='main'>
                {successMessage && (
                    <div className="success-msg">
                        <span className="close-btn" onClick={() => setSuccessMessage('')}>×</span>
                        <p>{successMessage}</p>
                    </div>
                )}
                <input type='text' placeholder='Expense' value={input} onChange={(e) => setInput(e.target.value)} />
                <input type='number' placeholder='Amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                <button onClick={selectedExpenseId ? updateExpense : addExpense}>
                    {selectedExpenseId ? 'Update Expense' : 'Add Expense'}
                </button>
                <ul className='expense-list'>
                    {expenses.map((expense) => (
                        <li key={expense.id}>
                            <span>{expense.title} </span>
                            <span>${expense.amount}</span>
                            <button onClick={() => setSelectedExpenseId(expense.id)}>Edit</button>
                            <button className='delete-btn' onClick={() => deleteExpense(expense.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ExpenseTracker