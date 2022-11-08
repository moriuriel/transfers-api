import { ITransferRepository } from '../domain/repository/Transfer.repository'
import {
  IFindTransferByUserIDInput,
  IFindTransferByUserIDOutput,
  IFindTransferByUserIDPresenter,
  IFindTransferByUserIDUsecase,
} from '../domain/usecase'

export class FindTransferByUserIDUsecase
  implements IFindTransferByUserIDUsecase
{
  private readonly repo: ITransferRepository
  private readonly presenter: IFindTransferByUserIDPresenter

  constructor(
    repo: ITransferRepository,
    presenter: IFindTransferByUserIDPresenter
  ) {
    this.repo = repo
    this.presenter = presenter
  }

  async execute(
    input: IFindTransferByUserIDInput
  ): Promise<IFindTransferByUserIDOutput[]> {
    const transfers = await this.repo.findByUserID(input.userID)

    return this.presenter.output(transfers)
  }
}
