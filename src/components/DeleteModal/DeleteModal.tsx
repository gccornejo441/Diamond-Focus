import deleteModelStyles from './DeleteModal.module.css';
interface DeleteModalProps {
    handleDelete: () => void;
    handleCancel: () => void;
    item: string;
}

const DeleteModal = ({ handleDelete, handleCancel, item }: DeleteModalProps): JSX.Element => {
    return (
        <div className={deleteModelStyles.deleteCard}>
            <div className={deleteModelStyles.deleteCardHeader}>
                <h5 className={deleteModelStyles.deleteCardTitle}>Are you sure you want to delete
                    <br /> <span>"{item}"?</span></h5>
            </div>
            <div className={deleteModelStyles.deleteCardBody}>
                <p>This item will be deleted permanently. This action cannot be undone.</p>
            </div>
            <div className={deleteModelStyles.deleteCardFooter}>
                <button className={deleteModelStyles.btnDanger} id="confirm-delete" onClick={handleDelete}>Delete</button>
                <button className={deleteModelStyles.btnSecondary} id="cancel-delete" onClick={handleCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default DeleteModal