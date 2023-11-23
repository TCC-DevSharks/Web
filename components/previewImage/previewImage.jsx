import React from "react";
import styles from "./PreviewImage.module.scss"; // Adapte o caminho conforme necessário

const PreviewImage = ({ imageUrl }) => {
  return (
    <div className={styles.previewContainer}>
      <img src={imageUrl} alt="Preview" className={styles.previewImage} />
    </div>
  );
};

export default PreviewImage;
