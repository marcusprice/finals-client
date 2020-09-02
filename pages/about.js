import Head from 'next/head';
import ContentContainer from '../components/ContentContainer';
import logo from '../assets/img/FINALS_logo.jpg';

const About = () => (
    <>
        <Head>
            <title>Finals - About</title>
        </Head>
        <ContentContainer>
            <section className="featuredContent">
                <h2>Finals</h2>
                <h3>Rumored to be among the best</h3>
                <img className="featuredContentImg" src={logo}/>
                <p>Finals…it took a long time to get here, and we took Ls in hell. But we stayed in the game and now we’re not handle-able.</p>

                <p>We are bringing blogging back from 2009, with a website from 1999. We may also try and sell you a zine or a hoodie. </p>

                <p>Future contributors holler at <a className="hammer rainbow" href="mailto:finalsmag@gmail.com">finalsmag@gmail.com</a></p>
            </section>
        </ContentContainer>
    </>
);

export default About;