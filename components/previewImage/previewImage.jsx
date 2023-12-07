import React from "react";
import styles from "./PreviewImage.module.scss";

const PreviewImage = ({ imageUrl }) => {
  return (
    <div className={styles.previewContainer}>
      <img src={imageUrl} alt="Preview" className={styles.previewImage} />
    </div>
  );
};

export default PreviewImage;
