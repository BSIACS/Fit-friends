

export function SpecialForYouComponent(): JSX.Element {

  return (
    <section className="special-for-you">
      <div className="container">
        <div className="special-for-you__wrapper">
          <div className="special-for-you__title-wrapper">
            <h2 className="special-for-you__title">Специально подобрано для вас</h2>
            <div className="special-for-you__controls">
              <button className="btn-icon special-for-you__control" type="button" aria-label="previous">
                <svg width="16" height="14" aria-hidden="true" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.99882 1L1 6L5.99882 11M15 6H1.14" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
              <button className="btn-icon special-for-you__control" type="button" aria-label="next">
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0012 1L15 6L10.0012 11M1 6H14.86" stroke="currentColor" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </button>
            </div>
          </div>
          <ul className="special-for-you__list">
            <li className="special-for-you__item">
              <div className="thumbnail-preview">
                <div className="thumbnail-preview__image">
                  <picture>
                    <source type="image/webp" srcSet="assets/img/content/thumbnails/preview-03.webp, img/content/thumbnails/preview-03@2x.webp 2x" />
                    <img src="assets/img/content/thumbnails/preview-03.jpg" srcSet="assets/img/content/thumbnails/preview-03@2x.jpg 2x" width="452" height="191" alt="" />
                  </picture>
                </div>
                <div className="thumbnail-preview__inner">
                  <h3 className="thumbnail-preview__title">crossfit</h3>
                  <div className="thumbnail-preview__button-wrapper">
                    <a className="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                  </div>
                </div>
              </div>
            </li>
            <li className="special-for-you__item">
              <div className="thumbnail-preview">
                <div className="thumbnail-preview__image">
                  <picture>
                    <source type="image/webp" srcSet="assets/img/content/thumbnails/preview-02.webp, img/content/thumbnails/preview-02@2x.webp 2x" />
                    <img src="assets/img/content/thumbnails/preview-02.jpg" srcSet="assets/img/content/thumbnails/preview-02@2x.jpg 2x" width="452" height="191" alt="" />
                  </picture>
                </div>
                <div className="thumbnail-preview__inner">
                  <h3 className="thumbnail-preview__title">power</h3>
                  <div className="thumbnail-preview__button-wrapper">
                    <a className="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                  </div>
                </div>
              </div>
            </li>
            <li className="special-for-you__item">
              <div className="thumbnail-preview">
                <div className="thumbnail-preview__image">
                  <picture>
                    <source type="image/webp" srcSet="assets/img/content/thumbnails/preview-01.webp, img/content/thumbnails/preview-01@2x.webp 2x" />
                    <img src="assets/img/content/thumbnails/preview-01.jpg" srcSet="assets/img/content/thumbnails/preview-01@2x.jpg 2x" width="452" height="191" alt="" />
                  </picture>
                </div>
                <div className="thumbnail-preview__inner">
                  <h3 className="thumbnail-preview__title">boxing</h3>
                  <div className="thumbnail-preview__button-wrapper">
                    <a className="btn btn--small thumbnail-preview__button" href="#">Подробнее</a>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
