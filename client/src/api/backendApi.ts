import axios from "axios";
import { IUser } from "../interfaces/User";

// Api file, for now all API calls will be handled from here.
// If we end up with lots of different calls to the backend, we
// can split this out into multiple files.

// Post request to signup

export async function signUp(form: IUser) {
  return (
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + '/register' || 'localhost:3000/register', form)
      .then((res: { data: any; }) => res.data)
  );
}


// Post request to login
export async function signIn(form: IUser) {
  return (
    await axios
      .post(process.env.REACT_APP_BACKEND_URL + '/login' || 'localhost:3000/login', form)
      .then((res: { data: any; }) => res.data)
  );
}
