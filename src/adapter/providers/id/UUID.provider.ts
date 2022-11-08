import * as uuid from 'uuid'
import { IUUID } from '@domain/providers/Uuid'

export class UUID implements IUUID {
  newUUID(): string {
    return uuid.v4()
  }

  isValidUUID(value: string): boolean {
    return uuid.validate(value)
  }
}
