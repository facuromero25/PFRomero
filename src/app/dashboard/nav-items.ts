export interface NavItem {
  path: string;
  title: string;
  icon?: string;
  allowedRoles: String[];
}

const links: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    icon: 'person',
    allowedRoles:[]
  },
  {
    path: 'cursos',
    title: 'Cursos',
    icon: 'school',
    allowedRoles:['admin']
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    icon: 'book',
    allowedRoles:[]
  },
  {
    path: 'Usuarios',
    title: 'Usuarios',
    icon: 'face',
    allowedRoles:[]


  },
]

export default links;
