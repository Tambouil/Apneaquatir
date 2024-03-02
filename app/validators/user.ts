import vine from '@vinejs/vine'

export const createRegisterValidator = vine.compile(
  vine.object({
    firstName: vine.string(),
    lastName: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(6).maxLength(32).confirmed({
      confirmationField: 'passwordConfirmation',
    }),
  })
)
