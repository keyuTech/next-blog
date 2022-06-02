import styles from 'styles/Home.module.scss';
import Image from 'next/image';
import png from 'assets/images/1.png';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Image src={png.src} alt="Logo" width={500} height={300}/>
    </div>
  );
}

export default Home
