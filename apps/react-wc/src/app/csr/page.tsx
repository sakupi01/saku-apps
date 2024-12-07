'use client';
import styles from "../page.module.css";
import "../../components/hello-world";

export default function CSRPage() {
  return (
    <div className={styles.page}>
        {/* <hello-world content="Japan" [checked]={true}></hello-world>
        <hello-world content="Japan" [checked]={true}></hello-world>
        <hello-world content="Japan" [checked]={true}></hello-world> */}
        <howto-checkbox id="join-checkbox"></howto-checkbox>
        <howto-label for="join-checkbox">Join Newsletter</howto-label>
        {/* <hello-world content={
          {
            label: "World",
            message: "Hello Hello World!"
          }
        }></hello-world>
        <hello-world content={
          {
            label: "Japan",
            message: "Hello Hello Japan!"
          }
        }></hello-world>
        <hello-world content={
          {
            label: "Me",
            message: "Hello Hello Me!"
          }
        }></hello-world> */}
    </div>
  );
}
