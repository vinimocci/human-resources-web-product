import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { LoadingOutlined } from '@ant-design/icons';

const LoginSession = (WrappedComponent) => {

  const EnhancedComponent = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const checkEmailInLocalStorage = debounce(async () => {
      const email = localStorage.getItem('email');
  
      if (!email) {
        router.push('/login');
      }else{
        setLoading(false)
      } 
    }, 200);
    
    useEffect(() => {
      checkEmailInLocalStorage();
    }, []);

    if (loading) {
      return <div> <LoadingOutlined style={{color:"green", fontSize:"100px"}} /></div>;
    }

    return <WrappedComponent {...props} />;
  };

  return EnhancedComponent;
};

export default LoginSession;