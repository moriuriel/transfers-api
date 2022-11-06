import IHashProvider from '@domain/providers/Hash'
import { hash, compare } from 'bcryptjs'

export default class BCrptyHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
