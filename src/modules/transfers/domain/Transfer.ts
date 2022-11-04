export interface ITransferProps {
  id: string
  payee_id: string
  payer_id: string
  amount: string
  created_at: string
}

export interface ITransfer {
  id(): string
  payeeId(): string
  payerId(): string
  amount(): string
  createdAt(): string
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

  amount(): string {
    return this.transfer.amount
  }

  createdAt(): string {
    return this.transfer.created_at
  }
}
