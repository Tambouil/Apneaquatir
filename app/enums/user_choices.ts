export const UserChoices = {
  Yes: 1,
  No: 2,
  NotSpecified: 3,
} as const

export type IChoices = (typeof UserChoices)[keyof typeof UserChoices]

export const ChoicesText = {
  [UserChoices.Yes]: 'Yes',
  [UserChoices.No]: 'No',
  [UserChoices.NotSpecified]: 'Not Specified',
} as const
