import React from "react";

export default function DeleteModal({
  open,
  onClose,
  setOpenModal,
  animeToBeRemoved,
  handleDeleteEntry,
}) {
  if (!open) {
    return null;
  }

  return (
    <>
      <div onClick={onClose} className="deleteOverlay">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="deleteModalContainer"
        >
          <div className="delete-modal-message">
            <h2>Are you sure you want to delete?</h2>
          </div>
          <div className="delete-modal-button-container">
            <div>
              <button
                onClick={() => {
                  handleDeleteEntry();
                  setOpenModal(false);
                }}
                className="delete-modal-confirm-btn"
              >
                Delete
              </button>
            </div>
            <div>
              <button
                onClick={() => setOpenModal(false)}
                className="delete-modal-cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
