import type { FormEvent } from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { UserRole } from '#enums/user_role'
import User from '#models/user'

import AvatarImg from '~/assets/avatars/02.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown_menu'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Icons } from '~/components/icon'

export function UserNav() {
  const { user } = usePage<{ user: User }>().props
  const { delete: destroy } = useForm()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    destroy('/logout')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar>
            <AvatarImage src={AvatarImg} alt="avatar" />
            <AvatarFallback>
              {user.firstName.charAt(0).toUpperCase()}
              {user.lastName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {user.role === UserRole.Admin && (
            <DropdownMenuItem>
              <Link href="/admin" className="w-full">
                Administration
              </Link>
              <Icons.admin className="w-4 h-4" />
            </DropdownMenuItem>
          )}
          {user.role !== UserRole.User && (
            <DropdownMenuItem>
              <Link href="/booking/dates" className="w-full">
                Nouvelles dates
              </Link>
              <Icons.add className="w-4 h-4" />
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>
            <Link href="/settings" className="w-full">
              Paramètres
            </Link>
            <Icons.settings className="w-4 h-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link
            as="button"
            href="/logout"
            method="delete"
            onClick={handleSubmit}
            className="w-full text-left"
          >
            Déconnexion
          </Link>
          <Icons.logout className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
