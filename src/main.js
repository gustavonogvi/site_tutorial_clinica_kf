import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ease = 'power3.out'

// ── Mood prompt ──
const PLAYLIST = 'https://open.spotify.com/embed/playlist/6QrddvgGYrDq1aTEOFb7rK?utm_source=generator&theme=0'
const player = document.getElementById('spotify-player')
const prompt = document.getElementById('mood-prompt')

const loadPlayer = (autoplay) => {
  player.src = autoplay ? PLAYLIST + '&autoplay=1' : PLAYLIST
}

const dismissPrompt = () => {
  gsap.to(prompt, { y: 120, opacity: 0, duration: 0.5, ease, onComplete: () => prompt.remove() })
}

document.getElementById('mood-yes').addEventListener('click', () => {
  loadPlayer(true)
  const inner = prompt.querySelector('.mood-inner')
  const actions = prompt.querySelector('.mood-actions')
  gsap.to(actions, { opacity: 0, duration: 0.2, onComplete: () => {
    actions.style.display = 'none'
    inner.querySelector('.mood-text').textContent = 'Aumente o volume ♪'
    gsap.fromTo(inner, { opacity: 0 }, { opacity: 1, duration: 0.4 })
    gsap.delayedCall(2, dismissPrompt)
  }})
})

document.getElementById('mood-no').addEventListener('click', () => {
  loadPlayer(false)
  dismissPrompt()
})

gsap.delayedCall(1.5, () => {
  gsap.to(prompt, { bottom: '1.25rem', duration: 0.7, ease })
})

// ── Progress bar ──
const bar = document.getElementById('progress-bar')
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight
  const pct = total > 0 ? (window.scrollY / total) * 100 : 0
  bar.style.width = pct + '%'
}, { passive: true })

// ── Header entrance ──
const headerTl = gsap.timeline({ defaults: { ease, duration: 0.9 } })
headerTl
  .to('.logo-wrap', { opacity: 1, y: 0 })
  .to('.header-text', { opacity: 1, y: 0 }, '-=0.6')

// ── Intro ──
gsap.to('.intro h1', {
  opacity: 1, y: 0, duration: 0.9, ease,
  scrollTrigger: { trigger: '.intro', start: 'top 85%' }
})
gsap.to('.intro p', {
  opacity: 1, y: 0, duration: 0.8, ease, delay: 0.15,
  scrollTrigger: { trigger: '.intro', start: 'top 85%' }
})

// ── Section headings ──
gsap.utils.toArray('h2').forEach(el => {
  gsap.to(el, {
    opacity: 1, x: 0, duration: 0.7, ease,
    scrollTrigger: { trigger: el, start: 'top 88%' }
  })
})

// ── List items — staggered per section ──
gsap.utils.toArray('section, .alert-box').forEach(section => {
  const items = section.querySelectorAll('li')
  if (!items.length) return
  gsap.to(items, {
    opacity: 1, x: 0, duration: 0.6, ease,
    stagger: 0.08,
    scrollTrigger: { trigger: section, start: 'top 82%' }
  })
})

// ── Alert intro text ──
gsap.to('.alert-intro', {
  opacity: 1, y: 0, duration: 0.7, ease,
  scrollTrigger: { trigger: '.alert-box', start: 'top 85%' }
})

// ── Timeline rows ──
gsap.to('.tl-row', {
  opacity: 1, y: 0, duration: 0.55, ease,
  stagger: 0.07,
  scrollTrigger: { trigger: '.timeline', start: 'top 82%' }
})

// ── Footer ──
gsap.to('.spotify-wrap', {
  opacity: 1, y: 0, duration: 0.9, ease,
  scrollTrigger: { trigger: '.playlist-section', start: 'top 82%' }
})

gsap.to('.disclaimer', {
  opacity: 1, y: 0, duration: 0.7, ease,
  scrollTrigger: { trigger: 'footer', start: 'top 90%' }
})
