import styled from 'styled-components';
import imagebg from '../../assets/image-bg.jpg';
import logoImg from '../../assets/logo.png';


const BannerImage = styled.figure`
  width: 78%;
  height: 100%;
  background-image: url(${imagebg});
  background-size: cover;
  background-position: center;

`;


export { BannerImage};

