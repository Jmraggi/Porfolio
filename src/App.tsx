import { useEffect, useMemo, useState } from 'react'
import { TechnologyIcon } from './components/TechnologyIcon'
import { personalTimeline } from './data/personal'
import { projects, type Project } from './data/projects'

const ArrowUpRight = () => <span aria-hidden="true">↗</span>

function ProjectVisual({ accent, number }: Pick<Project, 'accent' | 'number'>) {
  return <div className={`project-visual project-visual--${accent}`} aria-hidden="true"><span className="visual-index">/{number}</span><div className="visual-window"><i /><i /><i /><b /><em /></div><span className="visual-orb" /></div>
}

function ProjectCard({ project }: { project: Project }) {
  const destination = project.demoUrl ?? project.repoUrl
  return <article className={`project-card project-card--${project.accent}`}><ProjectVisual accent={project.accent} number={project.number} /><div className="project-copy"><div className="project-meta"><span>{project.status}</span><span>{project.number}</span></div><h3>{project.title}</h3><p>{project.description}</p><ul className="tags" aria-label={`Tecnologías de ${project.title}`}>{project.stack.map((item) => <li key={item} title={item}><TechnologyIcon technology={item} /><span className="sr-only">{item}</span></li>)}</ul>{destination ? <a className="project-action" href={destination} target="_blank" rel="noreferrer">Ver proyecto <ArrowUpRight /></a> : <span className="project-action project-action--quiet">Próximamente</span>}</div></article>
}

export default function App() {
  const year = new Date().getFullYear()
  const [activeStatus, setActiveStatus] = useState('Todos')
  const [activeTechnology, setActiveTechnology] = useState('Todas')
  const statuses = ['Todos', ...new Set(projects.map((project) => project.status))]
  const technologies = ['Todas', ...new Set(projects.flatMap((project) => project.stack))]
  const visibleProjects = useMemo(() => projects.filter((project) => (activeStatus === 'Todos' || project.status === activeStatus) && (activeTechnology === 'Todas' || project.stack.includes(activeTechnology))), [activeStatus, activeTechnology])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const elements = [...document.querySelectorAll<HTMLElement>('[data-parallax]')]

    const update = () => {
      const midpoint = window.innerHeight / 2
      elements.forEach((element) => {
        const speed = Number(element.dataset.parallax)
        const offset = (element.getBoundingClientRect().top - midpoint) * speed
        element.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`)
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return <><a className="skip-link" href="#contenido">Saltar al contenido</a><header className="site-header"><nav className="nav shell" aria-label="Navegación principal"><a className="mark" href="#inicio" aria-label="Ir al inicio">JMR<span>.</span></a><div className="nav-links"><a href="#proyectos">Proyectos</a><a href="#hitos">Hitos</a><a className="nav-contact" href="#sobre-mi">Sobre mí <ArrowUpRight /></a></div></nav></header>
    <main id="contenido">
      <section className="hero shell" id="inicio"><p className="kicker reveal">Bitácora personal · 2026</p><div className="hero-layout"><h1 className="reveal reveal--one" data-parallax="-.14">Ideas,<br /><em>código</em> y cosas<br />en proceso.</h1><div className="hero-aside reveal reveal--two" data-parallax=".16"><p>Este es mi rincón en internet: un registro de lo que construyo, aprendo y todavía estoy tratando de entender.</p><a className="text-link" href="#proyectos">Ver el archivo <ArrowUpRight /></a></div></div><div className="hero-footer reveal reveal--three"><span>Hecho en Argentina · aprendiendo en público</span><span className="scroll-cue">desplazate <b>↓</b></span></div><div className="hero-shape" data-parallax=".24" aria-hidden="true"><span /><span /><span /></div></section>
      <section className="work-section" id="proyectos"><div className="shell"><div className="section-intro" data-parallax=".11"><p className="kicker">Archivo / 01—03</p><h2>Ideas en<br /><em>progreso.</em></h2><p className="section-lede">Proyectos, pruebas y pequeñas herramientas. No todo está terminado; todo tiene algo que enseñarme.</p></div><div className="project-explorer" aria-label="Explorador de proyectos"><div className="explorer-toolbar"><div className="filter-group"><span className="filter-label">Estado</span><div className="filter-options">{statuses.map((status) => <button key={status} className={activeStatus === status ? 'filter-button is-active' : 'filter-button'} type="button" aria-pressed={activeStatus === status} onClick={() => setActiveStatus(status)}>{status}</button>)}</div></div><label className="tech-filter"><span className="filter-label">Tecnología</span><select value={activeTechnology} onChange={(event) => setActiveTechnology(event.target.value)}>{technologies.map((technology) => <option key={technology} value={technology}>{technology}</option>)}</select></label><p className="results-count">{visibleProjects.length.toString().padStart(2, '0')} resultado{visibleProjects.length === 1 ? '' : 's'}</p></div>{visibleProjects.length > 0 ? <div className="projects-grid">{visibleProjects.map((project) => <ProjectCard key={project.number} project={project} />)}</div> : <div className="empty-projects" role="status"><span>∅</span><p>No hay proyectos que coincidan con esta combinación.</p><button type="button" onClick={() => { setActiveStatus('Todos'); setActiveTechnology('Todas') }}>Limpiar filtros</button></div>}</div></div></section>
      <section className="life-section" id="hitos"><div className="shell"><div className="life-heading"><p className="kicker">Mapa personal / 04</p><h2>Momentos que<br /><em>me trajeron acá.</em></h2><p>Una línea de tiempo sin pretensión: decisiones, logros y pequeños desvíos que forman parte de mi historia.</p></div><div className="life-timeline-viewport"><ol className="life-timeline">{personalTimeline.map((item, index) => <li className={`life-event life-event--${item.kind}`} key={`${item.date}-${item.title}`}><div className="life-marker"><span>{String(index + 1).padStart(2, '0')}</span><i /></div><p className="life-date">{item.date}</p><div className="life-copy"><h3>{item.title}</h3><p>{item.detail}</p></div></li>)}</ol></div></div></section>
      <section className="about-section shell" id="sobre-mi"><div className="about-label"><p className="kicker">Una breve nota</p><span>05</span></div><div className="about-content"><p className="about-statement">Me entusiasma crear herramientas que <em>resuelvan</em> problemas concretos.</p><div className="about-columns"><p>Soy Juan Manuel Raggi. Me gusta crear herramientas que hagan más simples las tareas del día a día y encontrar soluciones claras a problemas reales.</p><p>Trabajo principalmente con desarrollo web, automatización y lógica de negocio. Este portfolio reúne proyectos, pruebas e ideas mientras sigo aprendiendo y construyendo.</p></div><ul className="skills" aria-label="Tecnologías">{['React', 'TypeScript', 'JavaScript', 'PHP', 'Docker', 'MySQL', 'Automatización'].map((skill) => <li key={skill}>{skill}</li>)}</ul></div></section>
    </main><footer className="shell footer"><span>© {year} Juan Manuel Raggi</span><span>Construir · aprender · documentar</span></footer></>
}
