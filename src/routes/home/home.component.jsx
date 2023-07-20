import Directory from '../../components/directory/directory.component';
import leftArrow from '../../assets/left-arrow.png';
import rightArrow from '../../assets/right-arrow.png';
import crwn from '../../assets/crwn.png';
import './home.styles.scss';


const Home = () => {

  return (
    <div className='container'>
        <Directory />

        <img id="slideLeft" src={leftArrow} />
        <img id="slideRight" src={rightArrow} />
        <img id='circle-logo' className='fade-in' src={crwn} />
    </div>
  );
}


export default Home;