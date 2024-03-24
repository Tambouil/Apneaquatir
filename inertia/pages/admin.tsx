import User from '#models/user'
import { Layout } from '../layouts/layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select'
import { Header } from '../components/header'
import { UserRole } from '#enums/user_role'
import { useForm } from '@inertiajs/react'
import { Button } from '../components/ui/button'
import { useRef } from 'react'
import Avatar1 from '../assets/avatars/01.png'
import Avatar2 from '../assets/avatars/02.png'
import Avatar3 from '../assets/avatars/03.png'
import Avatar4 from '../assets/avatars/04.png'
import Avatar5 from '../assets/avatars/05.png'

interface Props {
  users: User[]
}

export default function Admin(props: Props) {
  const { users } = props

  const displayRandomAvatar = () => {
    const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5]
    return avatars[Math.floor(Math.random() * avatars.length)]
  }

  const avatarRef = useRef(
    users.reduce(
      (acc, user) => {
        acc[user.id] = displayRandomAvatar()
        return acc
      },
      {} as Record<string, string>
    )
  )

  const {
    data,
    setData,
    put,
    delete: destroy,
  } = useForm({
    usersId: users.map((user) => user.id),
    roles: users.map((user) => user.role),
  })

  const handleSelectChange = (index: number, value: string) => {
    const roles = data.roles as number[]
    roles[index] = Number(value)
    setData('roles', roles)
    put(`/admin/${users[index].id}`)
  }

  return (
    <Layout title="Administation">
      <div className="flex-col md:flex">
        <Header />
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">+19% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Liste des membres</CardTitle>
                  <CardDescription>Gestion des rôles et comptes utilisateurs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {users.map((user, index) => (
                      <div key={user.id} className="flex flex-wrap items-center">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={avatarRef.current[user.id]} alt="Avatar" />
                          <AvatarFallback>
                            {user.firstName?.charAt(0).toUpperCase()}
                            {user.lastName?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.firstName} {user.lastName}
                          </p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                        <form className="ml-auto flex items-center space-x-4">
                          <Select
                            defaultValue={user.role?.toString()}
                            onValueChange={(value) => handleSelectChange(index, value)}
                          >
                            <SelectTrigger className="w-full max-w-[180px] h-8 rounded-md px-3 text-xs sm:text-sm">
                              <SelectValue placeholder="Définir un rôle">
                                {user.role === UserRole.User && 'Membre'}
                                {user.role === UserRole.Instructor && 'Moniteur'}
                                {user.role === UserRole.Admin && 'Administateur'}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={UserRole.User.toString()}>Membre</SelectItem>
                              <SelectItem value={UserRole.Instructor.toString()}>
                                Moniteur
                              </SelectItem>
                              <SelectItem value={UserRole.Admin.toString()}>
                                Administateur
                              </SelectItem>
                            </SelectContent>
                          </Select>

                          <Button
                            variant="destructive"
                            onClick={() => destroy(`/admin/${user.id}`)}
                          >
                            Supprimer
                          </Button>
                        </form>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
