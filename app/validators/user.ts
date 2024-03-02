import vine, { SimpleMessagesProvider } from '@vinejs/vine'

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
vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'The {{ field }} field est requis',
  'string': 'Le champs {{ field }} doit être une chaine de caractères',
  'email': "Le champs n'est pas une adresse email valide",

  // Error message for the username field
  'firstName.required': `Le nom d\'utilisateur est requis`,
  'username.unique': `Ce nom d'utilisateur est déjà utilisé`,
  'email.required': `L'adresse email est requise`,
  'email.email': `L'adresse email n'est pas valide`,
  'email.unique': `Cette adresse email est déjà utilisée`,
  'password.required': `Le mot de passe est requis`,
  'password.confirmed': `Les mots de passe ne correspondent pas`,
  'password.minLength': `Le mot de passe doit contenir au moins 6 caractères`,
})
