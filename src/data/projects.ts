export type Project = {
  number: string
  title: string
  description: string
  stack: string[]
  status: string
  accent: 'lime' | 'blue' | 'coral'
  demoUrl?: string
  repoUrl?: string
}

// Agregá enlaces e imágenes de cada proyecto acá cuando estén publicados.
export const projects: Project[] = [
  {
    number: '01',
    title: 'Contador de días',
    description: 'Una herramienta para calcular días hábiles, corridos y vencimientos sin perder tiempo entre planillas.',
    stack: ['React', 'TypeScript'],
    status: 'En desarrollo',
    accent: 'lime',
  },
  {
    number: '02',
    title: 'Próxima herramienta',
    description: 'Un espacio para la siguiente idea que valga la pena convertir en una solución concreta.',
    stack: ['Por definir'],
    status: 'En exploración',
    accent: 'blue',
  },
  {
    number: '03',
    title: 'Laboratorio',
    description: 'Automatizaciones, pruebas de concepto y pequeños experimentos creados para aprender haciendo.',
    stack: ['Experimentos'],
    status: 'En movimiento',
    accent: 'coral',
  },
]
