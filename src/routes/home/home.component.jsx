import Directory from '../../components/directory/directory.component';
import leftArrow from '../../assets/left-arrow.png';
import rightArrow from '../../assets/right-arrow.png';
import crwn from '../../assets/crwn.png';
import './home.styles.scss';


const Home = () => {

  return (
    <div className='container'>
        <Directory />

        <img alt='graphic-left' id="slideLeft" src={leftArrow} />
        <img alt='graphic-right' id="slideRight" src={rightArrow} />
        <img alt='logo' id='circle-logo' className='fade-in' src={crwn} />
    </div>
  );
}


export default Home;