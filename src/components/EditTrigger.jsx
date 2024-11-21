import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getOneTrigger, updateTrigger } from '../services/triggers';

function EditTrigger() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        notes: '',
        date: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTrigger = async () => {
            try {
                const response = await getOneTrigger(id);
                const trigger = response.data;
                setFormData({
                    title: trigger.title,
                    notes: trigger.notes || '',
                    date: new Date(trigger.date).toISOString().split('T')[0]
                });
            } catch (err) {
                console.error('Error fetching trigger:', err);
                setError('Failed to load trigger details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrigger();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await updateTrigger(id, formData);
            navigate(`/triggers/${id}`);
        } catch (err) {
            console.error('Error updating trigger:', err);
            setError(err.response?.data?.message || 'Failed to update trigger');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">
            <div className="text-cyan-500">Loading...</div>
        </div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <h2 className="text-2xl font-bold text-cyan-500 mb-6">Edit Trigger</h2>
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded-lg p-6">
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        Trigger Name*
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
                        Description
                    </label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
                        Date*
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate(`/triggers/${id}`)}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-6 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditTrigger; 