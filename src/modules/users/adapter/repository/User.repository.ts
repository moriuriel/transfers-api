import { prisma } from '@infrastructure/prisma/client'
import { IUserProps, User } from '@modules/users/domain'
import { IUserRepository } from '@modules/users/domain/repository'

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
        created_at: user.createdAt(),
      },
    })

    return user
  }

  async findByDocument(document: string): Promise<IUserProps> {
    return prisma.user.findFirst({ where: { document } })
  }

  async findByEmail(email: string): Promise<IUserProps> {
    return prisma.user.findFirst({ where: { email } })
  }
}
