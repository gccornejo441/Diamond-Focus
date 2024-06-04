import styles from "./DeleteModal.module.css";

interface DeleteModalProps {
  handleDelete: () => void;
  handleCancel: () => void;
  item?: string | null;
  isMassDelete: boolean;
  overrideCaption?: string;
}

const DeleteModal = ({
  handleDelete,
  handleCancel,
  item = null,
  isMassDelete,
  overrideCaption,
}: DeleteModalProps): JSX.Element => {
  return (
    <div className={styles.deleteModal}>
      <div className={styles.deleteModalHeader}>
        <h5 className={styles.deleteModalTitle}>
          {overrideCaption ? (
            <span className={styles.titleText}>{overrideCaption}</span>
          ) : (
            <>
              Are you sure you want to delete
              <br />
              <span className={styles.titleText}>
                {isMassDelete ? "all these tasks" : `"${item}"`}?
              </span>
            </>
          )}
        </h5>
      </div>
      <div className={styles.deleteModalBody}>
        <p>This action cannot be undone.</p>
      </div>
      <div className={styles.deleteModalFooter}>
        <button
          className={styles.btnDanger}
          id="confirm-delete"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className={styles.btnSecondary}
          id="cancel-delete"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
