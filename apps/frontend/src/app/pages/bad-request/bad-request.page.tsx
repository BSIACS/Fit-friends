import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setIsBadRequest } from '../../store/slices/application.slice';


export function BadRequestPage(): JSX.Element {
  const dispatch = useAppDispatch();

  dispatch(setIsBadRequest(false));

  return (
    <div className="wrapper">
      <main>
        <div className="inner-page inner-page--no-sidebar" style={{margin: '50px 0 0 50px'}}>
          <h1>Status code 400. Bad request.</h1>
          <h3>Your browser sent a request that this server could not understand.</h3>
        </div>
      </main>
    </div>
  );
}
