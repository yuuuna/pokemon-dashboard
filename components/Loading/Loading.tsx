import Image from "next/image";
import styles from "./Loading.module.scss";

export default function Loading() {
  return (
    <div className={styles.loading}>
      <Image src="/images/loading.png" alt="Loading..." width={220} height={60} />
    </div>
  )
}
