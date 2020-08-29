import styles from './Header.module.css';
import tempHero from '../../assets/img/hero-temp.png';
import tempLogo from '../../assets/img/logo.png';
import tempShopGif from '../../assets/img/shop.gif';
import tempAboutGif from '../../assets/img/about.gif';

const cmsStyles ={ 
    backgroundImage: 'url("' + tempHero + '")'
}

const Header = () => (
    <div className={styles.hero} style={cmsStyles}> 
        <header className={styles.header}>
            <div className={styles.siteTitleContainer}>
                <h1><img className={styles.logo} src={tempLogo} alt="finals logo" /></h1>

                <div className={styles.marquee}>
                    <span className={styles.marqueeText}>Rumored to be among the best</span>
                </div>
            </div>

            <nav className={styles.nav}>
                <ul className={styles.navUl}>
                    <li className={styles.navItem + " hammer"}>
                        <span className={styles.navTitle}>Finals Shop</span>
                        <img className={styles.navGif}  src={tempShopGif} alt="palm trees gif" />
                    </li>

                    <li className={styles.navItem + " hammer"}>
                        <span className={styles.navTitle}>About</span>
                        <img className={styles.navGif} src={tempAboutGif} alt="city scape gif"/>
                    </li>
                </ul>
            </nav>
        </header>
    </div>
);

export default Header;