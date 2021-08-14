// Base action type
export interface IReduxBaseAction {
  payload: any;
  type: EReduxActionTypes;
  data?: any;
}

// Enumerated strings for readable errors at runtime.
// Add action type strings here.
export enum EReduxActionTypes {
  LOGOUT = 'LOGOUT',
  AUTHENTICATE = 'AUTHENTICATE'
}

