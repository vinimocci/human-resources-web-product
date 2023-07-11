import Head from 'next/head';
import SessionWrap from '../../_app';
import styles from '../../styles/Home.module.css';

import { 
  useState,
  useEffect 
} from 'react';

const Home = () => {

  const [userFromKafka, setUserFromKafka] = useState('waiting for Kafka update...')

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5023/getnotifications');

        socket.onopen = () => {
            console.log("Web Socket conn stabilished!!")
        }

        socket.onmessage = (event) => {
          setUserFromKafka(event.data)
        }

        socket.onerror = (error) => {
            console.error("Websocket error: ", error);
        }

        socket.onclose = () => {
            console.log("WebSocket connection closed!")
        }
    }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <h1 className={styles.title}>
          Hello there, {userFromKafka}
        </h1>
      
    </div>
  )
}

export default SessionWrap(Home);