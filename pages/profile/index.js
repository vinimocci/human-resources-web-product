import Head from 'next/head'
import moment from 'moment'

import { 
    Form, 
    Input, 
    Button 
  } from 'antd'
  
import LoginSession from '../../_app'
import { useForm } from 'react-hook-form'
import { GetUserInfo } from '../../api/Profile'
import styles from './../../styles/Profile.module.css'
import { DefaultUserData, UserMusntEditInfo } from './../../utils/Consts'


import
React, 
{   useEffect, 
    useState 
} from 'react'


const Profile = () => {
    const { handleSubmit, setValue } = useForm();
    const [userInfo, setUserInfo] = useState(DefaultUserData);
    const [isEditingInfo, setIsEditingInfo] = useState(true);

    const formatBirthday = (birthday) => {
        return moment(birthday).format('DD/MM/YYYY');
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
          try {
            const result = await GetUserInfo(localStorage.userID);
            const data = result.message;
            setUserInfo(data);
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchUserInfo();
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>UserProfile</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
            <h1 className={styles.title}>
              Your Information
            </h1>
                <div className="ChangeAfterFinished_UserDataForm">
                    <Form disabled={isEditingInfo} layout="vertical" rules={[{ required: true, message: 'Please enter your email'}]}>
                        <Form.Item label="Name">
                            <Input
                                type='text'
                                placeholder='Name'
                                defaultValue={userInfo.name}
                                value={userInfo.name}
                            >
                            </Input>
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input
                                type='email'
                                placeholder='Email'
                                defaultValue={userInfo.email}
                                value={userInfo.email}
                            >
                            </Input>
                        </Form.Item>
                        <Form.Item label="Document">
                            <Input
                                type='text'
                                placeholder='Document'
                                disabled={UserMusntEditInfo}
                                defaultValue={userInfo.document}
                                value={userInfo.document}
                            >
                            </Input>
                        </Form.Item>
                        <Form.Item label="Birthday">
                            <Input
                                type='text'
                                placeholder='Birthday'
                                disabled={UserMusntEditInfo}
                                defaultValue={formatBirthday(userInfo.birthday)}
                                value={formatBirthday(userInfo.birthday)}
                            >
                            </Input>
                        </Form.Item>
                        <Form.Item>
                            <Button disabled={false} style={{backgroundColor:"green", width:"100%"}} type="primary" onClick={() => setIsEditingInfo(false)}>Edit info</Button>
                        </Form.Item>
                    </Form>
                </div>
            </main>
        </div>
    )
}

export default LoginSession(Profile);