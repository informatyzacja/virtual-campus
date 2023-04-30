/* eslint-disable @typescript-eslint/restrict-template-expressions */
import Map from '@/components/Map';
import styles from '@/styles/Map.module.css';

export default function Home() {
  return (
    <div className={styles.map}>
      <Map />
    </div >
  );
}
