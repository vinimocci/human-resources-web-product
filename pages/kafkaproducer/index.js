import Head from 'next/head'
import LoginSession from '../../_app'
import { useForm } from 'react-hook-form'
import { EmptyMessage } from './../../utils/Consts'
import styles from './../../styles/Profile.module.css'
import { PostNotification } from '../../api/Notification'
import RequestErrorModal from '../../components/modals/requestErrorModal/RequestErrorModal'

import { 
    Form, 
    Input, 
    Button 
} from 'antd'

import React, 
{ useState } from 'react'

const KafkaProducer = () => {

    const { handleSubmit, setValue } = useForm();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState(EmptyMessage);

    const ChangeNotification = async (notificationData) => {
        try{
          const result = await PostNotification(notificationData);
          //add a modal when success -- @vini.mocci
    
        } catch (error) {
          setModalErrorMessage(error.response.data.message)
          setIsErrorModalOpen(true)
        }
    }

    const handleInputedNotification = (event) => {
        setValue("description", event.target.value)
        setValue("topic", "notifications")
    }

    const handleModalClose = () => {
        setIsErrorModalOpen(false);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Change the Home title with Kafka here!</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
            <h1 className={styles.title}>
              Choose your new title
            </h1>
                <div className="ChangeAfterFinished_UserDataForm">
                    <Form layout="vertical" onFinish={handleSubmit(ChangeNotification)} rules={[{ required: true, message: 'Please enter your email'}]}>
                        <Form.Item label="Title">
                            <Input
                                type='text'
                                placeholder='Your new title here'
                                onChange={handleInputedNotification}
                            >
                            </Input>
                        </Form.Item>

                        <Form.Item>
                        <Button style={{backgroundColor:"green", width:"100%"}} type="primary" htmlType="submit">Change Home Title</Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>

            <RequestErrorModal 
              isopen={isErrorModalOpen} 
              errorMessage={modalErrorMessage} 
              onClose={handleModalClose}
            />
        </div>
    )
}

export default LoginSession(KafkaProducer);