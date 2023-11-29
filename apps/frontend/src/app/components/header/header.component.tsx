import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { signOutThunk } from '../../store/slices/authorization.thunk';


export function HeaderComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const logoutClickHandler = (evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    console.log('bye!');
    dispatch(signOutThunk());
  }

  return (
    <header className="header">
      <div className="container">
        <span className="header__logo">
          <svg width="187" height="70" aria-hidden="true" viewBox="0 0 187 70" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 69.5541H8.98878V56.4437H20.0792V50.7135H8.98878V43.3779H21.725V37.0903H0V69.5541Z" fill="#181818" /><path d="M24.9842 69.5541H33.973V57.9599H39.898C43.2403 57.9599 46.0003 56.964 48.1778 54.9721C50.3554 52.9803 51.4442 50.4236 51.4442 47.3021C51.4442 44.2549 50.4145 41.7949 48.3551 39.922C46.3125 38.0342 43.5273 37.0903 39.9993 37.0903H24.9842V69.5541ZM33.973 52.8317V42.6867H37.8471C39.5182 42.7016 40.683 43.1847 41.3413 44.136C42.0165 45.0725 42.3541 46.2839 42.3541 47.7703C42.3541 49.2568 42.0165 50.4757 41.3413 51.427C40.683 52.3634 39.5182 52.8317 37.8471 52.8317H33.973ZM43.1644 69.5541H52.9381L44.3797 53.3891L36.5051 55.4627L43.1644 69.5541Z" fill="#181818" /><path d="M55.6656 69.5541H64.781V37.0903H55.6656V69.5541Z" fill="#181818" /><path d="M70.0406 69.5541H94.1204V63.4671H78.6495V55.864H91.5123V50.3344H78.6495V43.3779H93.7406V37.0903H70.0406V69.5541Z" fill="#181818" /><path d="M97.253 69.5541H104.874V51.6722C104.874 51.152 104.874 50.6615 104.874 50.2007C104.874 49.725 104.849 49.2345 104.799 48.7291H104.95C105.085 49.2048 105.254 49.7027 105.457 50.223C105.659 50.7432 105.87 51.2263 106.09 51.6722L115.61 69.5541H124.346V37.0903H116.724V54.7046C116.724 55.21 116.716 55.7376 116.699 56.2876C116.699 56.8376 116.716 57.3653 116.75 57.8707H116.623C116.488 57.395 116.311 56.8748 116.091 56.3099C115.889 55.7451 115.678 55.2248 115.458 54.7492L106.267 37.0903H97.253V69.5541Z" fill="#181818" /><path d="M129.428 69.5541H142.392C147.136 69.5541 150.799 68.1865 153.381 65.4515C155.964 62.7165 157.256 58.9409 157.256 54.1249V52.3857C157.256 47.5548 155.956 43.8016 153.356 41.126C150.773 38.4355 147.119 37.0903 142.392 37.0903H129.428V69.5541ZM138.164 64.0691V42.7759H141.456C143.566 42.7908 145.211 43.4894 146.393 44.8718C147.592 46.2542 148.191 48.4318 148.191 51.4047V55.2843C148.191 58.2126 147.608 60.4125 146.444 61.8841C145.296 63.3408 143.633 64.0691 141.456 64.0691H138.164Z" fill="#181818" /><path d="M160.54 60.9253C160.54 63.913 161.798 66.1724 164.313 67.7035C166.828 69.2345 170.035 70 173.935 70C177.834 70 180.982 69.1379 183.379 67.4136C185.793 65.6745 187 63.2887 187 60.2564C187 57.5362 186.181 55.3437 184.544 53.6789C182.907 51.9993 180.265 50.6615 176.619 49.6656C173.85 48.8926 171.943 48.2014 170.896 47.592C169.866 46.9825 169.352 46.2245 169.352 45.3177C169.352 44.3515 169.689 43.5637 170.364 42.9543C171.057 42.3448 172.179 42.0401 173.732 42.0401C175.167 42.0401 176.264 42.3894 177.024 43.0881C177.8 43.7718 178.188 44.738 178.188 45.9866V46.8339H186.215V45.3623C186.215 42.5678 185.042 40.4199 182.696 38.9186C180.366 37.4173 177.319 36.6667 173.555 36.6667C169.74 36.6667 166.693 37.4991 164.414 39.1639C162.135 40.8287 160.996 43.1029 160.996 45.9866C160.996 48.5284 161.848 50.6243 163.553 52.2742C165.258 53.9242 168.018 55.3066 171.833 56.4214C174.449 57.1944 176.239 57.9078 177.201 58.5619C178.163 59.2159 178.644 60.026 178.644 60.9922C178.644 62.1665 178.222 63.0955 177.378 63.7793C176.551 64.4482 175.361 64.7826 173.808 64.7826C172.188 64.7826 170.922 64.411 170.01 63.6678C169.115 62.9246 168.676 61.78 168.693 60.2341V59.0524H160.54V60.9253Z" fill="#181818" /><path d="M0 33.3333H8.96902L11.5966 19.8718H22.6626L23.7995 13.9881H12.7335L14.1988 6.45605H26.9071L28.1703 0H6.49306L0 33.3333Z" fill="#181818" /><path d="M25.1062 33.3333H34.2015L40.6946 0H31.5992L25.1062 33.3333Z" fill="#181818" /><path d="M42.734 6.45605H52.3599L47.13 33.3333H56.2254L61.4552 6.45605H71.0306L72.2938 0H43.9972L42.734 6.45605Z" fill="#181818" /></svg>
        </span>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <a className="main-nav__link is-active" href="#" aria-label="На главную">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0499 0.709047L16.2288 4.33646C17.2178 5.02953 18 6.5237 18 7.73884V13.8415C18 16.1368 16.1389 18 13.8462 18H4.15385C1.86114 18 0 16.1278 0 13.8325V7.62183C0 6.4877 0.71029 5.04754 1.60939 4.34546L6.11389 0.82606C7.47153 -0.227059 9.63836 -0.281065 11.0499 0.709047ZM9.00001 12.5992C9.99313 12.5992 10.7982 11.7932 10.7982 10.799C10.7982 9.8048 9.99313 8.99882 9.00001 8.99882C8.00689 8.99882 7.20181 9.8048 7.20181 10.799C7.20181 11.7932 8.00689 12.5992 9.00001 12.5992Z" fill="currentColor" /></svg>
              </a>
            </li>
            <li className="main-nav__item">
              <Link className="main-nav__link" to={'/'} onClick={logoutClickHandler} aria-label="Выход">
                <svg width="16" height="18" aria-hidden="true" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8.78049C10.4303 8.78049 12.4004 6.81491 12.4004 4.39024C12.4004 1.96558 10.4303 0 8 0C5.5697 0 3.59956 1.96558 3.59956 4.39024C3.59956 6.81491 5.5697 8.78049 8 8.78049Z" fill="currentColor" /><path d="M8 10.9756C3.59076 10.9756 0 13.9259 0 17.561C0 17.8068 0.193619 18 0.440044 18H15.56C15.8064 18 16 17.8068 16 17.561C16 13.9259 12.4092 10.9756 8 10.9756Z" fill="currentColor" /></svg>
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#" aria-label="Личный кабинет">
                <svg width="16" height="18" aria-hidden="true" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 8.78049C10.4303 8.78049 12.4004 6.81491 12.4004 4.39024C12.4004 1.96558 10.4303 0 8 0C5.5697 0 3.59956 1.96558 3.59956 4.39024C3.59956 6.81491 5.5697 8.78049 8 8.78049Z" fill="currentColor" /><path d="M8 10.9756C3.59076 10.9756 0 13.9259 0 17.561C0 17.8068 0.193619 18 0.440044 18H15.56C15.8064 18 16 17.8068 16 17.561C16 13.9259 12.4092 10.9756 8 10.9756Z" fill="currentColor" /></svg>
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#" aria-label="Друзья">

                <svg width="22" height="16" viewBox="0 0 30 21" aria-hidden="true" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 10.2951C24.7784 10.2951 26.6254 8.46058 26.6254 6.19756C26.6254 3.93454 24.7784 2.1 22.5 2.1C20.2216 2.1 18.3746 3.93454 18.3746 6.19756C18.3746 8.46058 20.2216 10.2951 22.5 10.2951Z" fill="currentColor" /><path d="M9.64286 10.2439C12.5722 10.2439 14.947 7.95073 14.947 5.12195C14.947 2.29318 12.5722 0 9.64286 0C6.71348 0 4.33876 2.29318 4.33876 5.12195C4.33876 7.95073 6.71348 10.2439 9.64286 10.2439Z" fill="currentColor" /><path d="M9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C4.13499 12.9606 0 16.3425 0 20.4878C0 20.7746 0.23338 21 0.53041 21H18.7553C19.0523 21 19.2857 20.7746 19.2857 20.4878C19.2857 20.307 19.2778 20.1277 19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M17.4923 13.9177C18.8214 12.9394 20.5777 12.3439 22.5 12.3439C26.6337 12.3439 30 15.0975 30 18.4902C30 18.7197 29.8185 18.9 29.5875 18.9H21.394C21.1529 16.8579 19.6704 15.0676 17.4923 13.9177ZM19.2624 19.95C19.2313 19.5927 19.1694 19.2422 19.0789 18.9C18.6759 17.3762 17.7048 16.0183 16.3515 14.973C14.6142 13.6312 12.247 12.8049 9.64286 12.8049C9.52291 12.8049 9.40347 12.8066 9.28457 12.8101C5.17731 13.6013 2.14286 16.2931 2.14286 19.489C2.14286 19.7472 2.37624 19.95 2.67327 19.95H19.2624Z" fill="currentColor" /></svg>

              </a>
            </li>
            <li className="main-nav__item main-nav__item--notifications">
              <a className="main-nav__link" href="#" aria-label="Уведомления">
                <div>
                  <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.6776 11.241L12.7676 9.747C12.5764 9.414 12.4035 8.784 12.4035 8.415V6.138C12.4035 4.023 11.1476 2.196 9.33664 1.341C8.86341 0.513 7.98975 0 6.98869 0C5.99673 0 5.10487 0.531 4.63164 1.368C2.85703 2.241 1.62845 4.05 1.62845 6.138V8.415C1.62845 8.784 1.45554 9.414 1.26443 9.738L0.345272 11.241C-0.0187507 11.844 -0.100656 12.51 0.126858 13.122C0.345272 13.725 0.864005 14.193 1.53745 14.418C3.30296 15.012 5.15947 15.3 7.01599 15.3C8.87251 15.3 10.729 15.012 12.4945 14.427C13.1316 14.22 13.623 13.743 13.8596 13.122C14.0962 12.501 14.0325 11.817 13.6776 11.241Z" fill="currentColor" /><path d="M9.57325 16.209C9.19103 17.253 8.18086 18 6.99779 18C6.27884 18 5.569 17.712 5.06847 17.199C4.77725 16.929 4.55884 16.569 4.43143 16.2C4.54974 16.218 4.66804 16.227 4.79545 16.245C5.00476 16.272 5.22318 16.299 5.44159 16.317C5.96032 16.362 6.48816 16.389 7.01599 16.389C7.53472 16.389 8.05346 16.362 8.56309 16.317C8.7542 16.299 8.94531 16.29 9.12732 16.263C9.27293 16.245 9.41854 16.227 9.57325 16.209Z" fill="currentColor" /></svg>
                </div>
              </a>
              <div className="main-nav__dropdown">
                <p className="main-nav__label">Оповещения</p>
                <ul className="main-nav__sublist">
                  <li className="main-nav__subitem"><a className="notification is-active" href="#">
                    <p className="notification__text">Катерина пригласила вас на&nbsp;тренировку</p>
                    <time className="notification__time" dateTime="2023-12-23 12:35">23 декабря, 12:35</time>
                  </a>
                  </li>
                  <li className="main-nav__subitem"><a className="notification is-active" href="#">
                    <p className="notification__text">Никита отклонил приглашение на&nbsp;совместную тренировку</p>
                    <time className="notification__time" dateTime="2023-12-22 09:22">22 декабря, 09:22</time>
                  </a>
                  </li>
                  <li className="main-nav__subitem"><a className="notification is-active" href="#">
                    <p className="notification__text">Татьяна добавила вас в&nbsp;друзья</p>
                    <time className="notification__time" dateTime="2023-12-18 18:50">18 декабря, 18:50</time>
                  </a>
                  </li>
                  <li className="main-nav__subitem"><a className="notification" href="#">
                    <p className="notification__text">Наталья приняла приглашение на&nbsp;совместную тренировку</p>
                    <time className="notification__time" dateTime="2023-12-14 08:15">14 декабря, 08:15</time></a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
        <div className="search">
        <form action="#" method="get">
            <label><span className="search__label">Поиск</span>
              <input type="search" name="search"/>
              <svg className="search__icon" width="20" height="20" aria-hidden="true"viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 19L17.2 17.2M18.1 9.55C18.1 14.272 14.272 18.1 9.55 18.1C4.82797 18.1 1 14.272 1 9.55C1 4.82797 4.82797 1 9.55 1C14.272 1 18.1 4.82797 18.1 9.55Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" /></svg>
            </label>
            <ul className="search__list">
              <li className="search__item"><a className="search__link" href="#">Бокс</a></li>
              <li className="search__item"><a className="search__link is-active" href="#">Бег</a></li>
              <li className="search__item"><a className="search__link" href="#">Аэробика</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
              <li className="search__item"><a className="search__link" href="#">Text</a></li>
            </ul>
          </form>
        </div>
      </div>
    </header>
  )
}
