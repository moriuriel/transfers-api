export interface IUUID {
  newUUID(): string
  isValidUUID(value: string): boolean
}
