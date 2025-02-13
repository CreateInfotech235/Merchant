import React, { useState, useEffect } from 'react';
import { updateStatus } from '../../Components_admin/Api/User';
import { Modal, ModalBody, ModalHeader } from "react-bootstrap"; // Import Modal components from react-bootstrap

const StatusUpdateModal = ({ userid, currentStatus, onStatusUpdate, onClose, initialReason }) => {
    console.log(userid, initialReason);
    const [reason, setReason] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    // Set initial status and reason based on props
    useEffect(() => {
        setSelectedStatus(currentStatus || '');
        setReason(initialReason || '');
    }, [currentStatus, initialReason]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(reason, selectedStatus,userid);

        const response = await updateStatus(userid, {
            status: selectedStatus,
            reason: selectedStatus === 'APPROVED' ? '' : reason
        });
        console.log('response', response)
        onStatusUpdate(reason, selectedStatus);
        onClose();
    };

    return (
        <Modal show={true} onHide={onClose} centered>
            <ModalHeader closeButton>
          <Modal.Title>Update Status</Modal.Title>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label d-block text-center">Select Status</label>
                        <div className="btn-group mb-3 d-flex gap-4" role="group">
                            <button
                                type="button"
                                className={`btn rounded-pill ${selectedStatus === 'APPROVED' ? 'btn-success' : 'btn-outline-success'}`}
                                onClick={() => setSelectedStatus('APPROVED')}
                            >
                                Approved
                            </button>
                            <button
                                type="button"
                                className={`btn rounded-pill ${selectedStatus === 'PENDING' ? 'btn-warning' : 'btn-outline-warning'}`}
                                onClick={() => setSelectedStatus('PENDING')}
                            >
                                Pending
                            </button>
                            <button
                                type="button"
                                className={`btn rounded-pill ${selectedStatus === 'REJECTED' ? 'btn-danger' : 'btn-outline-danger'}`}
                                onClick={() => setSelectedStatus('REJECTED')}
                            >
                                Rejected
                            </button>
                        </div>
                    </div>
                    {selectedStatus !== 'APPROVED' && (
                        <div className="mb-3">
                            <label htmlFor="statusReason" className="form-label">
                                Reason for {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1).toLowerCase()}
                            </label>
                            <textarea
                                id="statusReason"
                                className="form-control"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                rows="4"
                            />
                        </div>
                    )}
                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={!selectedStatus}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default StatusUpdateModal;
