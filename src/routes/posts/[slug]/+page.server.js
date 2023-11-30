import db from '$lib/prisma'
import { redirect } from '@sveltejs/kit'

export const load = async ({ params }) => {
  let comments = await db.comment.findMany({
    where: { postId: params.slug, parentId: null },
    include: {
      user: true,
      post: { include: { author: true } },
      children: {
        include: {
          user: true,
          post: { include: { author: true } },
          likes: true,
          children: {
            include: {
              user: true,
              post: { include: { author: true } },
              likes: true,
            },
          },
        },
      },
      likes: true,
    },
  })

  return { comments }
}

export const actions = {
  comentarComentario: async ({ request, locals }) => {
    const data = await request.formData()
    let parentId = data.get('parentId')
    let message = data.get('message')
    let postId = data.get('postId')

    await db.comment.create({
      data: {
        message,
        user: { connect: { email: locals.user.email } },
        post: { connect: { id: postId } },
        parent: { connect: { id: parentId } },
      },
    })
    throw redirect(303, `/posts/${postId}`)
  },

  like: async ({ request, locals }) => {
    const data = await request.formData()
    let id = data.get('parentId')
    let postId = data.get('postId')
    try {
      await db.like.create({
        data: {
          user: { connect: { email: locals.user.email } },
          comment: { connect: { id } },
        },
      })
    } catch (error) {
      console.error(error)
    }
    throw redirect(303, `/posts/${postId}`)
  },

  dislike: async ({ request }) => {
    const data = await request.formData()
    let commentId = data.get('parentId')
    let userId = data.get('userId')
    let postId = data.get('postId')

    try {
      await db.like.delete({
        where: { userId_commentId: { userId, commentId } },
      })
    } catch (error) {
      console.error(error)
    }
    throw redirect(303, `/posts/${postId}`)
  },
}
