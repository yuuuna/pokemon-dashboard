import { useEffect, useState } from 'react';
import styles from './GoToTopButton.module.scss';

export default function GoToTopButton() {
  const [showBtn, setShowBtn] = useState(false);
  const GoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, [])
  return (
    <>
      {showBtn &&
        <div className={styles.topButton} onClick={() => GoToTop()}>🔝</div>
      }
    </>
  )
}
