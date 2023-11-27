// Componente reutilizável para campos editáveis
import styles from "./style.module.css";

const EditableField = ({ label, value, isEditing, onChange, onEditClick }) => {
    return (
        <div className={styles["medicoInfoPessoal"]}>
            <h3>{label}:</h3>
            {isEditing ? (
                <input
                    className={styles["input_editing"]}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <div className={styles["informartion"]}>{value}</div>
            )}
            <div
                onClick={onEditClick}
                className={styles['editButton']}
            >
                Editar
            </div>
        </div>
    );
};

export default EditableField;