import {Modal} from 'antd';   
import { useRouter } from 'next/router';
import styles from './LoginModal.module.scss';
import React, { useState, useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons'; 

function loginModal({ isopen }) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {

      if (isopen){
        const redirectTimer = setTimeout(() => {
          router.push('/home');
        }, 5000);
    
        return () => clearTimeout(redirectTimer); 
      }

    }, [isopen]);

    useEffect(() => {
        setModalVisible(isopen);
      }, [isopen]);

  return (
    <Modal open={modalVisible} footer={null} closable={false}>
      <div className={styles.loggedModalComponent}>
        <p>Logged In! Redirecting to Home Page...</p>
        <LoadingOutlined style={{color:"green"}} />
      </div>
    </Modal>
  );

}

loginModal.defaultProps = {
    isOpen: false,
  };

export default loginModal;