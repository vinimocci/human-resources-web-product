import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import styles from './styles/Base.module.css'
import { LoadingOutlined } from '@ant-design/icons'

import 
React, 
{ 
  useEffect, 
  useState 
} from 'react'
import MainHeader from './components/header/MainHeader'

const SessionWrap = (WrappedComponent) => {

  const EnhancedComponent = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const checkEmailInLocalStorage = debounce(async () => {
      const email = localStorage.getItem('userEmail');
  
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
      return <div className={styles.loadingComponent}> <LoadingOutlined style={{color:"green", fontSize:"100px"}} /></div>;
    }

    return (
      <div className={styles.body}>
        <header>
          <MainHeader></MainHeader>
        </header>

        <main className={styles.main}>
          <WrappedComponent {...props} />
        </main>

        <footer className={styles.footer}>
          <a
            href="https://www.linkedin.com/in/vinicius-mocci/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '} Vinicius Mocci
          </a>
        </footer>
      </div>
    ) ;
  };

  return EnhancedComponent;
};

export default SessionWrap;