import { setupTestSuite } from './_matrix'
// @ts-ignore
import type { PrismaClient } from './generated/prisma/client'

declare let prisma: PrismaClient

setupTestSuite(() => {
  test('set', async () => {
    const result = await prisma.commentRequiredList.createMany({
      data: {
        country: 'France',
        contents: {
          set: [
            {
              text: 'Hello World',
              upvotes: {
                vote: true,
                userId: '10',
              },
            },
          ],
        },
      },
    })

    expect(result).toEqual({ count: 1 })
  })

  test('set shorthand', async () => {
    const result = await prisma.commentRequiredList.createMany({
      data: {
        country: 'France',
        contents: {
          text: 'Hello World',
          upvotes: {
            vote: true,
            userId: '10',
          },
        },
      },
    })

    expect(result).toEqual({ count: 1 })
  })

  test('set null', async () => {
    const comment = prisma.commentRequiredList.createMany({
      data: {
        country: 'France',
        // @ts-expect-error
        contents: {
          set: null,
        },
      },
    })

    await expect(comment).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining('Argument `set` must not be null'),
      }),
    )
  })

  test('set null shorthand', async () => {
    const comment = prisma.commentRequiredList.createMany({
      data: {
        country: 'France',
        // @ts-expect-error
        contents: null,
      },
    })

    await expect(comment).rejects.toThrow(
      expect.objectContaining({
        message: expect.stringContaining('Argument `contents` must not be null'),
      }),
    )
  })

  test('set nested list', async () => {
    const result = await prisma.commentRequiredList.createMany({
      data: {
        country: 'France',
        contents: {
          set: {
            text: 'Hello World',
            upvotes: [
              { userId: '10', vote: true },
              { userId: '11', vote: true },
            ],
          },
        },
      },
    })

    expect(result).toEqual({ count: 1 })
  })
})
