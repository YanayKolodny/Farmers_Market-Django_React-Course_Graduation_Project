import axios from 'axios'
import { REGISTER_URL } from './server_urls'

// Register new User - sends the registration data to the server to create the user:
export function registerUser(newUser) {
  console.log("newUser", newUser)
  return new Promise((resolve) =>
    axios.post(REGISTER_URL, newUser).then((res) => resolve({ data: res.data }))
      .catch(() => alert("Something went wrong, \n Please make sure to enter your details correctly:")))
}

