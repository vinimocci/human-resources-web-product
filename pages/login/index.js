import Head from 'next/head';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { GetLoginAuth } from '../../api/Auth';
import styles from '../../styles/Home.module.css';
import LoginModal from '../../components/modals/loginModal/LoginModal';
import RequestErrorModal from '../../components/modals/requestErrorModal/RequestErrorModal';

import { 
  Form, 
  Input, 
  Button 
} from 'antd';

export default function Home() {
  const { handleSubmit, setValue } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Make a better value assignment on the default value for this modalErrorMessage useState -- @vinicius.mocci
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const onSubmit = (data) => {
    LoginUser(data)
  };

  const LoginUser = async (userData) => {
    try{
      const result = await GetLoginAuth(userData);
      // Insert sucessfull login logic here -- @vinicius.mocci
      console.log(result)
    } catch (error) {
      setModalErrorMessage(error.response.data.message)
      setIsErrorModalOpen(true)
    }
  }

  const handleModalClose = () => {
    setIsErrorModalOpen(false);
  };

  const handleInputedUserEmail = (event) => {
    setValue("email", event.target.value)
  }

  const handleInputedUserPassword = (event) => {
    setValue("password", event.target.value)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Please Enter Your Credentials
        </h1>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input
                type="email"
                placeholder="Email"
                onChange={handleInputedUserEmail}
              />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input 
              type="password" 
              placeholder="Password" 
              onChange={handleInputedUserPassword}
            />
          </Form.Item>

            <a href="#" rel="noopener noreferrer">
                Don't have an account? Create one here! (BETA)
            </a>

          <Form.Item>
            <Button style={{backgroundColor:"green", width:"100%"}} type="primary" htmlType="submit">Login</Button>
          </Form.Item>
        </Form>

      </main>

      <LoginModal isopen={isModalOpen}></LoginModal>

      <RequestErrorModal 
        isopen={isErrorModalOpen} 
        errorMessage={modalErrorMessage} 
        onClose={handleModalClose}
      />

      <footer>
        <a
          href="https://www.linkedin.com/in/vinicius-mocci/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '} Vinicius Mocci
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}