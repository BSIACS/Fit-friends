import { useRef } from 'react';
import Slider, { Settings } from "react-slick";
import { SpecialForYouListItemComponent } from './list-item/special-for-you.component';
import { specialForYouSlidesData } from './special-for-you-slides-data';


export function SpecialForYouComponent(): JSX.Element {
  const sliderRef = useRef<any>();
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: true,
    adaptiveHeight: true,
    arrows: false,
  };

  const leftArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sliderRef.current.slickPrev();
  }

  const rightArrowButtonClickHandler = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sliderRef.current.slickNext();
  }

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper" style={{paddingBottom: '30px'}}>
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button className="btn-icon special-for-you__control" type="button" aria-label="previous"
                onClick={leftArrowButtonClickHandler}>
                <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button className="btn-icon special-for-you__control" type="button" aria-label="next"
                onClick={rightArrowButtonClickHandler}>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            {
              <Slider ref={sliderRef} {...settings}>
                {
                  specialForYouSlidesData.map((item) =>
                    <SpecialForYouListItemComponent key={item.id} id={item.id} src={item.src} srcSet={item.srcSet} name={item.name}/>
                  )
                }
              </Slider>
            }
          </ul>
        </div>
      </div>
    </section>
  )
}
