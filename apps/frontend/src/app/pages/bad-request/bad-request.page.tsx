import { useAppDispatch } from '../../hooks/useAppDispatch';
import { setIsBadRequest } from '../../store/slices/application.slice';


export function BadRequestPage(): JSX.Element {
  const dispatch = useAppDispatch();

  dispatch(setIsBadRequest(false));

  return (
    <h1>400 Bad request</h1>
  );
}
