import { useState } from 'react';
import { UserData } from '../../../types/user-data'
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { changeEditUserFormData } from '../../../store/slices/application.slice';
import { useAppSelector } from '../../../hooks/useAppSelector';

type UserFormInfoComponentProps = {
  user: UserData
}

export function CaloriesScheduleComponent({ user }: UserFormInfoComponentProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isEditable = useAppSelector(state => state.application.isUserFormEditable);

  const [caloriesError, setCaloriesError] = useState({ isError: false, message: 'Ограничение: значение от 1000 до 5000' });

  const scheduledForTheDayInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(evt.currentTarget.value) < 1000 || Number(evt.currentTarget.value) > 5000) {
      setCaloriesError({ ...caloriesError, isError: true });
    }
    else {
      setCaloriesError({ ...caloriesError, isError: false });
    }
    dispatch(changeEditUserFormData({ ...user, calories: evt.currentTarget.value }));
  }

  return (
    <div className="personal-account-user__schedule" style={{ paddingBottom: '20px' }}>
      {
        user &&
        <form action="#" method="get">
          <div className="personal-account-user__form">
            <div className="personal-account-user__input">
              <label>
                <span className="personal-account-user__label">План на день, ккал</span>
                <input type="text" name="schedule-for-the-day" defaultValue={user.calories} onChange={scheduledForTheDayInputChange} disabled={!isEditable} style={{ marginBottom: '5px' }} />
              </label>
              <span className="custom-input__error" style={caloriesError.isError ? { opacity: '10' } : { opacity: '0', fontSize: '3px' }}>
                {caloriesError.message}&nbsp;
              </span>
            </div>
            { user.calories &&
              <div className="personal-account-user__input">
                <label><span className="personal-account-user__label">План на неделю, ккал</span>
                  <input type="text" name="schedule-for-the-week" value={Number(user.calories) * 7} disabled={true} />
                </label>
              </div>
            }
          </div>
        </form>
      }
    </div>
  );
}
