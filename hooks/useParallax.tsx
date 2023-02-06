import hill1 from '../public/images/hill1.png';
import hill2 from '../public/images/hill2.png';
import hill3 from '../public/images/hill3.png';
import hill4 from '../public/images/hill4.png';
import hill5 from '../public/images/hill5.png';
import tree from '../public/images/tree.png';
import leaf from '../public/images/leaf.png';
import plant from '../public/images/plant.png';
import { useEffect, useState } from 'react';

function useParallax() {
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const value = window.scrollY;
      setOffset(value > 0 ? value : 0);
    };
    window.removeEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll, {capture: true, passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  const parallax = <section className={'parallax relative w-full flex justify-center items-center aspect-video overflow-hidden'}>
    <img src={hill1.src} className={'hill1'} style={{top: offset * 0.5 + 'px'}}/>
    <img src={hill2.src} className={'hill2'}/>
    <img src={hill3.src} className={'hill3'}/>
    <img src={hill4.src} className={'hill4'} style={{left: offset * -1.5 + 'px'}}/>
    <img src={hill5.src} className={'hill5'} style={{left: offset * 1.5 + 'px'}}/>
    <img src={tree.src} className={'tree'}/>
    <h2 className={'text absolute text-3xl md:text-5xl lg:text-7xl text-white font-semibold z-50'} style={{marginTop: offset * 1.5 + 'px'}}>
      {`Keyu's Website`}
    </h2>
    <img src={leaf.src} className={'leaf'} style={{top: offset * -1.5 + 'px', left: offset * 1.5 + 'px'}}/>
    <img src={plant.src} className={'plant'}/>
  </section>;
  return {
    parallax
  };
}

export default useParallax;
