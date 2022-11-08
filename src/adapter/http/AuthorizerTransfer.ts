import axios from 'axios'
import { IAuthorizerTransferHttp } from '@domain/http/AuthorizerTransfer'

interface IAuthroizerReponse {
  message: string
}

export class AuthorizerTransfer implements IAuthorizerTransferHttp {
  async authorized(): Promise<Boolean> {
    try {
      await axios.get(
        'https://run.mocky.io/v3/8fafdd68-a090-496f-8c9a-3442cf30dae6',
        { timeout: 5000 }
      )
      return true
    } catch {
      return false
    }
  }
}
