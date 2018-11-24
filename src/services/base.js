import axios from 'axios'
import { baseURL } from '@/config'

export default class BaseSerive {
  request () {
    return axios.create({
      baseURL: baseURL
    })
  }
}
