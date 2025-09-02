import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/RecurringTaskModal.css';

export const RecurringTaskModal = ({ onSave, onClose, initialValues }) => {
    const [recurrence, setRecurrence] = useState(initialValues?.recurrence || 'none');
    const [dueDate, setDueDate] = useState(initialValues?.dueDate || null);
    const [endDate, setEndDate] = useState(initialValues?.endDate || null);

    const handleSave = () => {
        onSave({
            recurrence: recurrence === 'none' ? null : recurrence,
            dueDate,
            endDate: recurrence === 'none' ? null : endDate
        });
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Task Schedule</h3>

                <div className="form-group">
                    <label>Recurrence</label>
                    <select value={recurrence} onChange={(e) => setRecurrence(e.target.value)}>
                        <option value="none">No Recurrence</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Due Date</label>
                    <DatePicker
                        selected={dueDate}
                        onChange={setDueDate}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select due date"
                    />
                </div>

                {recurrence !== 'none' && (
                    <div className="form-group">
                        <label>End Date</label>
                        <DatePicker
                            selected={endDate}
                            onChange={setEndDate}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                            placeholderText="Select end date"
                            minDate={dueDate}
                        />
                    </div>
                )}

                <div className="modal-actions">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    <button onClick={handleSave} className="btn-primary">Save</button>
                </div>
            </div>
        </div>
    );
};
