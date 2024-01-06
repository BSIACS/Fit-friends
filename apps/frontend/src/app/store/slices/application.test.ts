import { ApplicationState, applicationSlice, changeEditTrainerFormData, changeEditUserFormData, clearUserData, setIsBadRequest, setIsLoading, setIsUserFormEditable } from './application.slice';
import { SexEnum } from '../../types/sex.enum';

describe('Reducer: application', () => {
  let initialState: ApplicationState;

  beforeEach(() => {
    initialState = {
      isLoading: false,
      isTrainingDataLoading: false,
      isBadRequest: false,
      actualTrainerData: null,
      editTrainerFormData: null,
      actualUserData: null,
      editUserFormData: null,
      actualTrainingsData: [],
      actualTrainingsDataCount: 0,
      actualOrdersData: [],
      actualOrdersDataCount: 0,
      isUserFormEditable: false,
      isTrainerFormEditable: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(applicationSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        isLoading: false,
        isTrainingDataLoading: false,
        isBadRequest: false,
        actualTrainerData: null,
        editTrainerFormData: null,
        actualUserData: null,
        editUserFormData: null,
        actualTrainingsData: [],
        actualTrainingsDataCount: 0,
        actualOrdersData: [],
        actualOrdersDataCount: 0,
        isUserFormEditable: false,
        isTrainerFormEditable: false,
      })
  });

  it('with the "changeEditTrainerFormData" action should change editTrainerFormData', () => {
    const payloadUserData = {
      id: '9584ad02-ed85-438e-aead-797fd55978d8',
      name: 'Валерия',
      avatarFileName: 'photo-1.png',
      description: 'Привет! Меня зовут Иванова Валерия. Я профессиональный тренер по боксу',
      sex: SexEnum.FEMALE,
      location: '',
      trainingLevel: '',
      trainingType: ['box'],
      isReadyForTraining: true,
    };

    expect(applicationSlice.reducer(initialState, changeEditTrainerFormData(payloadUserData)))
      .toEqual({
        ...initialState,
        editTrainerFormData: payloadUserData
      })
  })

  it('with the "changeEditUserFormData" action should change editUserFormData', () => {
    const payloadUserData = {
      id: '9584ad02-ed85-438e-aead-797fd55978d8',
      name: 'Валерия',
      avatarFileName: 'photo-1.png',
      description: 'Привет! Меня зовут Мария. Я люблю спорт и активный образ жизни',
      sex: SexEnum.FEMALE,
      location: '',
      trainingLevel: '',
      trainingType: ['box', 'crossfit'],
      isReadyForTraining: true,
    };

    expect(applicationSlice.reducer(initialState, changeEditUserFormData(payloadUserData)))
      .toEqual({
        ...initialState,
        editUserFormData: payloadUserData
      })
  })

  it('with the "setIsBadRequest" action and "true" as payload parameter should change the isBadRequest flag to true', () => {
    expect(applicationSlice.reducer(initialState, setIsBadRequest(true)))
      .toEqual({
        ...initialState,
        isBadRequest: true,
      })
  });

  it('with the "setIsBadRequest" action and "false" as payload parameter should change the isBadRequest flag to false', () => {
    expect(applicationSlice.reducer(initialState, setIsBadRequest(false)))
      .toEqual({
        ...initialState,
        isBadRequest: false,
      })
  });

  it('with the "setIsLoading" action and payload equal "true", should change the isLoading flag to true', () => {
    expect(applicationSlice.reducer(initialState, setIsLoading(true)))
      .toEqual({
        ...initialState,
        isLoading: true,
      })
  });

  it('with the "setIsLoading" action and payload equal "false", should change the isLoading flag to false', () => {
    expect(applicationSlice.reducer(initialState, setIsLoading(false)))
      .toEqual({
        ...initialState,
        isLoading: false,
      })
  });

  it('with the "clearUserData" action should set actualUserData value to null', () => {
    expect(applicationSlice.reducer({
      ...initialState,
      actualUserData: {
        id: '9584ad02-ed85-438e-aead-797fd55978d8',
        name: 'Валерия',
        avatarFileName: 'photo-1.png',
        description: 'Привет! Меня зовут Мария. Я люблю спорт и активный образ жизни',
        sex: SexEnum.FEMALE,
        location: 'Petrogradskaya',
        trainingLevel: 'professional',
        trainingType: ['box', 'crossfit'],
        isReadyForTraining: true,
      }
    }, clearUserData()))
      .toEqual({
        ...initialState,
      })
  });

  it('with the "clearUserData" action should set actualTrainerData value to null', () => {
    expect(applicationSlice.reducer({
      ...initialState,
      actualTrainerData: {
        id: '9584ad02-ed85-438e-aead-797fd55978d8',
        name: 'Валерия',
        avatarFileName: 'photo-1.png',
        description: 'Привет! Меня зовут Иванова Валерия. Я профессиональный тренер по боксу',
        sex: SexEnum.FEMALE,
        location: 'Petrogradskaya',
        trainingLevel: 'professional',
        trainingType: ['box'],
        isReadyForTraining: true,
      }
    }, clearUserData()))
      .toEqual({
        ...initialState,
      })
  });

  it('with the "setIsUserFormEditable" action and payload equal "true", should change the isUserFormEditable flag to true', () => {
    expect(applicationSlice.reducer(initialState, setIsUserFormEditable(true)))
      .toEqual({
        ...initialState,
        isUserFormEditable: true,
      })
  });

  it('with the "setIsUserFormEditable" action and payload equal "false", should change the isUserFormEditable flag to false', () => {
    expect(applicationSlice.reducer(initialState, setIsUserFormEditable(false)))
      .toEqual({
        ...initialState,
        isUserFormEditable: false,
      })
  });



})



