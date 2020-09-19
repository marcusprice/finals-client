import Link from 'next/link';
import styles from './Header.module.css';

const Header = props => {
    const cmsStyles = { 
        backgroundImage: 'url("' + process.env.NEXT_PUBLIC_API_ROUTE + props.heroImgURI + '")'
    }

    const headerStyles = {
        background: 'rgb(0, 0, 0, ' + props.heroOpacity.toString() + ')'
    }

    return (
        <div className={styles.hero} style={cmsStyles}> 
            <header className={styles.header} style={headerStyles}>
                <div className={styles.siteTitleContainer}>
                    <Link href="/">
                        <a>
                            <h1><img className={styles.logo + ' hammer'} src={process.env.NEXT_PUBLIC_API_ROUTE + props.heroLogo.url} alt={props.heroLogo.alternativeText} /></h1>
                        </a>
                    </Link>

                    <div className={styles.marquee}>
                        <span className={styles.marqueeText}>{props.tagline}</span>
                    </div>
                </div>

                <nav className={styles.nav}>
                    <ul className={styles.navUl}>
                        <li className={styles.navItem + " hammer"}>
                            <span className={styles.navTitle}>Shop</span>
                            <img className={styles.navGif}  src={process.env.NEXT_PUBLIC_API_ROUTE + props.shopImg.url}  alt={props.shopImg.alternativeText} />
                        </li>

                        <Link href="/about">
                            <li className={styles.navItem + " hammer"}>
                                    <span className={styles.navTitle}>About</span>
                                    <img className={styles.navGif} src={process.env.NEXT_PUBLIC_API_ROUTE + props.aboutImg.url} alt={props.aboutImg.alternativeText}/>
                
                            </li>
                        </Link>
                    </ul>
                </nav>
            </header>
        </div>
    )
};

export default Header;