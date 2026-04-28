import * as React from 'react'

import { NavMain } from './nav-main'
// import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'
// import { TeamSwitcher } from './team-switcher'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/06-shared'
import {
  GalleryVerticalEndIcon,
  AudioLinesIcon,
  TerminalIcon,
  FrameIcon,
  PieChartIcon,
  MapIcon,
  Upload,
  Users,
  Database,
  Gavel,
  ListTodo,
  ChartLine,
} from 'lucide-react'
import { Logo } from '@/06-shared'

// This is sample data.
const data = {
  user: {
    items: [
      {
        title: 'Загрузка',
        url: '/upload',
        icon: <Upload />,
      },
    ],
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: <GalleryVerticalEndIcon />,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: <AudioLinesIcon />,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: <TerminalIcon />,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Главная',
      url: '#',
      icon: <ChartLine />,
      items: [
        {
          title: 'Аналитика',
          url: '/',
        },
      ],
    },
    {
      title: 'Судебные дела',
      url: '#',
      icon: <Gavel />,
      items: [
        {
          title: 'Первая инстанция',
          url: '#',
        },
      ],
    },
    {
      title: 'Задачи',
      url: '#',
      icon: <ListTodo />,
      items: [
        {
          title: 'Новые',
          url: '#',
        },
        {
          title: 'Выполненные',
          url: '#',
        },
      ],
    },
    {
      title: 'Общие сведения',
      url: '#',
      icon: <Database />,
      items: [
        {
          title: 'Суды',
          url: '/courts',
        },
        {
          title: 'Финансовые организации',
          url: '/financial-organizations',
        },
      ],
    },
    {
      title: 'Группы пользователей',
      url: '#',
      icon: <Users />,
      items: [
        {
          title: 'Сотрудники',
          url: '/employees',
        },
        {
          title: 'Пользователи',
          url: '/users',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: <FrameIcon />,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: <PieChartIcon />,
    },
    {
      name: 'Travel',
      url: '#',
      icon: <MapIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser menuItems={data.user.items} />
      </SidebarFooter>
    </Sidebar>
  )
}
