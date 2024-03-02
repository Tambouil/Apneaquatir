import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  // Applicable for all fields
  'required': 'Le {{ field }} est requis',
  'string': 'The value of {{ field }} field must be a string',
  'email': 'The value is not a valid email address',
  'unique': 'Le {{ field }} est déjà utilisé',

  // Error message for the username field
  'firstName.required': 'Le prénom est requis',
  'lastName.required': 'Le nom est requis',
  'username.unique': "Ce nom d'utilisateur est déjà utilisé",
  'email.required': "L'adresse email est requise",
  'email.email': "L'adresse email n'est pas valide",
  'email.unique': "L'adresse email est déjà utilisée",
  'password.required': 'Le mot de passe est requis',
  'password.confirmed': 'Les mots de passe ne correspondent pas',
  'password.minLength': 'Le mot de passe doit contenir au moins 6 caractères',
})
