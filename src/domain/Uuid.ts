import uuid from 'uuid'
interface IUUID {
  newUUID(): string
  isValidUUID(value: string): boolean
}

export class UUID implements IUUID {
  newUUID(): string {
    return uuid.v4()
  }

  isValidUUID(value: string): boolean {
    return uuid.validate(value)
  }
}
