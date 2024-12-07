import styles from "../page.module.css";
import "../../components/hello-world";
import React from "react";


export default function SSRPage() {
    return (
      <div className={styles.page}>
          <hello-world></hello-world>
          <hello-world></hello-world>
          <hello-world></hello-world>
      </div>
    );
}