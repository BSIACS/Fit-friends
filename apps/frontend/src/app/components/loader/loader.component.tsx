import styles from './loader.component.module.css';

type LoaderComponentProps = {
  isHidden: boolean;
}

export function LoaderComponent({ isHidden }: LoaderComponentProps): JSX.Element {


  return (
    <div style={{ width: '100%', height: '100%', position: 'fixed',  zIndex: '100', opacity: .8 }}
      hidden={isHidden}>
        <div className={styles.loaderContainer} >
        <span className={styles.loader}></span>
        </div>
    </div>
  )
}
