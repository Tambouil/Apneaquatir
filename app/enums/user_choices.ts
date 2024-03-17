export const UserChoices = {
  NotSpecified: 0,
  Yes: 1,
  No: 2,
} as const

export type IChoices = (typeof UserChoices)[keyof typeof UserChoices]

export const ChoicesText = {
  [UserChoices.NotSpecified]: 'Not Specified',
  [UserChoices.Yes]: 'Yes',
  [UserChoices.No]: 'No',
} as const
