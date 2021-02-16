import axios from 'axios'
import config from '../config'

export default () => {
  return axios.create({
    baseURL: config.serverURL
  })
}
