import { prisma } from '@infrastructure/prisma/client'
import { User } from '@modules/users/domain'
import { IUserRepository } from '@modules/users/domain/repository/User.repository'

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    await prisma.user.create({
      data: {
        id: user.id(),
        name: user.name(),
        document: user.document(),
        email: user.email(),
        password: user.password(),
        can_transfer: user.canTransfer(),
        wallet_id: user.walletID(),
        created_at: user.createdAt(),
      },
    })

    return user
  }
}
