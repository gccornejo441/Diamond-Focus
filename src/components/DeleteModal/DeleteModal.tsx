import styles from './DeleteModal.module.css';
interface DeleteModalProps {
    handleDelete: () => void;
    handleCancel: () => void;
    item: string;
}

const DeleteModal = ({ handleDelete, handleCancel, item }: DeleteModalProps): JSX.Element => {
    return (
        <div className={styles.deleteModal}>
            <div className={styles.deleteModalHeader}>
                <h5 className={styles.deleteModalTitle}>Are you sure you want to delete
                    <br /> <span>"{item}"?</span></h5>
            </div>
            <div className={styles.deleteModalBody}>
                <p>This item will be deleted permanently. This action cannot be undone.</p>
            </div>
            <div className={styles.deleteModalFooter}>
                <button className={styles.btnDanger} id="confirm-delete" onClick={handleDelete}>Delete</button>
                <button className={styles.btnSecondary} id="cancel-delete" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteModal