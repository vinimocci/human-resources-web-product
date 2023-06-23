
import Link from 'next/link'
import { Menu } from 'antd'
import { useRouter } from 'next/router'

function MainHeader(){
    const router = useRouter();
    //const SubMenu = Menu.SubMenu;

    const LogoutUser = () => {
        localStorage.removeItem('userEmail');
        router.push('/login');
      };

    return(
        <div>
            <Menu mode='horizontal'>
                <Menu.Item>
                    <Link href="/home">
                      <p>Home</p>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile">
                      <p>Profile</p>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile" onClick={LogoutUser}>
                      <p>logout</p>
                    </Link>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default MainHeader