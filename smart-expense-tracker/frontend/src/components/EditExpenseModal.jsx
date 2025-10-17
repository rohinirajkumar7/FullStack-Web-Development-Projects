import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function EditExpenseModal({ expense, onClose, onSave }) {
    const [amount, setAmount] = useState(expense.amount);
    const [category, setCategory] = useState(expense.category);
    const [description, setDescription] = useState(expense.description || '');
    const [merchant, setMerchant] = useState(expense.merchant || '');
    const [date, setDate] = useState(new Date(expense.date).toISOString().slice(0, 10));
    const [currency, setCurrency] = useState(expense.currency || 'INR');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave({
                amount: parseFloat(amount),
                category,
                description,
                merchant,
                date,
                currency
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6 border-b sticky top-0 bg-white z-10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-indigo-700">Edit Expense</h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Amount *</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            <div>
                                <label className="form-label">Category *</label>
                                <input
                                    type="text"
                                    required
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            <div>
                                <label className="form-label">Merchant</label>
                                <input
                                    type="text"
                                    value={merchant}
                                    onChange={(e) => setMerchant(e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            <div>
                                <label className="form-label">Date *</label>
                                <input
                                    type="date"
                                    required
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="form-input"
                                />
                            </div>

                            <div>
                                <label className="form-label">Currency</label>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="form-input"
                                >
                                    <option value="INR">INR (₹)</option>
                                    <option value="USD">USD ($)</option>
                                    <option value="EUR">EUR (€)</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="form-label">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="form-input resize-none"
                                rows="3"
                                maxLength="500"
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition disabled:bg-indigo-300"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </motion.button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
