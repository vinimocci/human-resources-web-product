import {Modal} from 'antd';   
import { WarningOutlined } from '@ant-design/icons'; 
import styles from './RequestErrorModal.module.scss';

import { 
  Button 
} from 'antd';

import React, 
{ 
  useState, 
  useEffect 
} from 'react';

function RequestErrorModal({ isopen, errorMessage, onClose }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOk = () => {
    onClose();
  };

    useEffect(() => {
        setModalVisible(isopen);
      }, [isopen]);

  return (
    <Modal 
      open={modalVisible}
      closable={false} 
      footer={[
        <Button key="ok" className={styles.requestErrorButton} type="primary" onClick={handleOk}>
          Check What I typed!
        </Button>,
      ]}
      >
      <div className={styles.requestErrorModalComponent}>
        <WarningOutlined style={{color:"red", fontSize:"100px"}} />
        <p>Attention!</p>
        <p>{errorMessage}</p>
      </div>
    </Modal>
  );

}

RequestErrorModal.defaultProps = {
    isOpen: false,
  };

export default RequestErrorModal;