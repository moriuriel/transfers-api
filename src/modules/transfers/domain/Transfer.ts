import { Decimal } from '@prisma/client/runtime'

export interface ITransferProps {
  id: string
  payee_id: string
  payer_id: string
  amount: number | Decimal
  created_at: string | Date
}

export interface ITransfer {
  id(): string
  payeeId(): string
  payerId(): string
  amount(): number | Decimal
  createdAt(): string | Date
}

export class Transfer implements ITransfer {
  public readonly transfer: ITransferProps

  constructor(props: ITransferProps) {
    this.transfer = props
  }

  id(): string {
    return this.transfer.id
  }

  payeeId(): string {
    return this.transfer.payee_id
  }

  payerId(): string {
    return this.transfer.payer_id
  }

  amount(): number | Decimal {
    return this.transfer.amount
  }

  createdAt(): string | Date {
    return this.transfer.created_at
  }
}
