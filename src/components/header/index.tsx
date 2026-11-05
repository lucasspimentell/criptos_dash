import { Link } from 'react-router'
import logo from '../../assets/logo.svg'
import styles from './header.module.css'
export function Header() {
 

  return (
    
      <header className={styles.container}>
        <Link to='/'><img src={logo} alt="logo" /></Link>
      </header>
    
  )
}