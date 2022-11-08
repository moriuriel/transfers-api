import axios from 'axios'
import { IAuthorizerTransferHttp } from '@domain/http/AuthorizerTransfer'

interface IAuthroizerReponse {
  message: string
}

export class AuthorizerTransfer implements IAuthorizerTransferHttp {
  async authorized(): Promise<Boolean> {
    try {
      await axios.get(process.env.AUTHROIZER_URL, { timeout: 5000 })
      return true
    } catch {
      return false
    }
  }
}
