import Head from 'next/head';
import SessionWrap from '../../_app';
import styles from '../../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <h1 className={styles.title}>
          Home Page Title 
        </h1>
      
    </div>
  )
}

export default SessionWrap(Home);