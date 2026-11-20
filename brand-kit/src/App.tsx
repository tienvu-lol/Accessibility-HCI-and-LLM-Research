import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ArrowDown, ArrowDownRight, ArrowUpRight, Check, Circle, CircleAlert, FileUp, Minus, Play, RotateCcw, X } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { EASES, MOTION, buildIntro, reducedMotion } from '@/lib/motion'

gsap.registerPlugin(useGSAP)

const SECTIONS = ['Brand', 'Color', 'Type', 'Background', 'Components', 'Motion'] as const

/* ---------- colour data: read from the CSS tokens so index.css stays the single source ---------- */
const lum = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
const token = (name: string) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()

// `on` is the colour the swatch is read against: text-like swatches sit on the floor, fills carry a label colour.
const SWATCHES = [
  { group: 'VTURCS', name: 'Maroon', v: '--vt-maroon', role: 'Header, primary action', label: '#ffffff' },
  { group: 'VTURCS', name: 'Maroon deep', v: '--vt-maroon-deep', role: 'Hover and pressed', label: '#ffffff' },
  { group: 'VTURCS', name: 'Orange', v: '--vt-orange', role: 'Current tab, running, projection', on: '--floor' },
  { group: 'Floor', name: 'Floor', v: '--floor', role: 'Page background', label: '#f7f8f8' },
  { group: 'Floor', name: 'Surface', v: '--surface', role: 'Panels', label: '#f7f8f8' },
  { group: 'Floor', name: 'Raised', v: '--raised', role: 'Inputs, table heads', label: '#f7f8f8' },
  { group: 'Text', name: 'Foreground', v: '--foreground', role: 'Body and headings', on: '--floor' },
  { group: 'Text', name: 'Muted', v: '--muted-foreground', role: 'Hints, captions', on: '--floor' },
  { group: 'Status', name: 'Done', v: '--st-ok', role: 'Done, saved', on: '--floor' },
  { group: 'Status', name: 'Needs attention', v: '--st-attn', role: 'Warnings', on: '--floor' },
  { group: 'Status', name: 'Failed', v: '--st-err', role: 'Errors', on: '--floor' },
] as const

/* ---------- sample data (clearly labelled in the UI) ---------- */
const STEPS = [
  { name: 'Reference sites', state: 'done', count: '60 of 60', pct: 100 },
  { name: 'LLM replicas', state: 'done', count: '60 of 60', pct: 100 },
  { name: 'Baseline audit', state: 'attn', count: '58 of 60', pct: 97 },
  { name: 'Repair loop', state: 'active', count: '31 of 60', pct: 52 },
  { name: 'Re-audit', state: 'pending', count: '0 of 60', pct: 0 },
] as const

// One colour per meaning, everywhere: badge, bar, matrix cell.
type State = 'done' | 'active' | 'attn' | 'pending' | 'failed' | 'imported'
const STATE: Record<State, { label: string; icon: typeof Check; cls: string; bar: string }> = {
  done: { label: 'Done', icon: Check, cls: 'border-ok/40 bg-ok/10 text-ok', bar: 'bg-ok' },
  active: { label: 'Running', icon: Play, cls: 'border-orange/40 bg-orange/10 text-orange', bar: 'bg-orange' },
  attn: { label: 'Needs attention', icon: CircleAlert, cls: 'border-attn/40 bg-attn/10 text-attn', bar: 'bg-attn' },
  pending: { label: 'Pending', icon: Circle, cls: 'border-border bg-raised text-muted-foreground', bar: 'bg-muted-foreground' },
  failed: { label: 'Failed', icon: X, cls: 'border-err/40 bg-err/10 text-err', bar: 'bg-err' },
  imported: { label: 'Imported', icon: ArrowDown, cls: 'border-line-strong text-foreground/80', bar: 'bg-foreground/60' },
}
const CELL_ICON: Record<string, typeof Check> = { ok: Check, run: Play, fail: X, trunc: CircleAlert, imp: ArrowDown, none: Minus, queued: Circle }
const CELL_LABEL: Record<string, string> = { ok: 'Done', run: 'Running', fail: 'Failed', trunc: 'Truncated', imp: 'Imported', queued: 'Queued' }
const CELL_CLS: Record<string, string> = {
  ok: 'bg-ok/15 text-ok', run: 'bg-orange/15 text-orange', fail: 'bg-err/15 text-err', trunc: 'bg-attn/15 text-attn',
  imp: 'border border-line-strong text-foreground/80', queued: 'bg-raised text-muted-foreground',
}
const CellIcon = ({ k }: { k: string }) => { const I = CELL_ICON[k]; return <I className="size-3" aria-hidden /> }
const ARMS = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6']
const MATRIX = ARMS.map((_, r) => Array.from({ length: 12 }, (_, c) => (c + r * 5) % 17 === 0 ? 'fail' : (c * 3 + r) % 13 === 0 ? 'trunc' : c + r < 9 ? 'ok' : c + r < 11 ? 'run' : r === 5 ? 'imp' : 'queued'))
const TABLE = [
  ['A1', 10, 142, 61], ['A2', 10, 138, 44], ['A3', 10, 151, 72], ['A4', 9, 129, 58], ['A5', 7, 146, 90], ['A6', 5, 133, 101],
] as const

/* The mark is a miniature of the status matrix: done, running, queued. */
const MARK = ['dddddd', 'ddddrr', 'qqqqqq']
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 31.5 15" className={className} aria-hidden>
      {MARK.flatMap((row, r) => [...row].map((c, i) => {
        const x = i * 5.5, y = r * 5.5
        return c === 'q'
          ? <rect key={`${r}${i}`} x={x + 0.5} y={y + 0.5} width={3} height={3} rx={0.6} fill="none" stroke="currentColor" strokeWidth={1} opacity={0.6} />
          : <rect key={`${r}${i}`} x={x} y={y} width={4} height={4} rx={0.8} fill={c === 'r' ? 'var(--vt-orange)' : 'currentColor'} />
      }))}
    </svg>
  )
}

function StateBadge({ state }: { state: State }) {
  const { label, icon: Icon, cls } = STATE[state]
  return (
    <Badge variant="outline" className={cn('h-6 gap-1.5 rounded-sm px-2 text-[0.8125rem] font-medium', cls)}>
      <Icon className="size-3" aria-hidden /> {label}
    </Badge>
  )
}

function Panel({ id, title, hint, level = 3, className, children }: { id?: string; title: string; hint?: string; level?: 2 | 3; className?: string; children: React.ReactNode }) {
  const H = level === 2 ? 'h2' : 'h3'
  return (
    <Card id={id} className={cn('gap-3 rounded-none border-0 border-t border-line-strong bg-transparent p-0 pt-4 shadow-none ring-0', className)}>
      <div>
        <H className="text-[1.0625rem] font-semibold leading-snug">{title}</H>
        {hint && <CardDescription className="mt-1 max-w-[56ch] text-sm text-muted-foreground">{hint}</CardDescription>}
      </div>
      <CardContent className="p-0">{children}</CardContent>
    </Card>
  )
}

function Chapter({ id, title, lead, children }: { id: string; title: string; lead: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="pt-14">
      <h2 id={`${id}-h`} className="text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.015em]">{title}</h2>
      <p className="mt-1 mb-5 max-w-[46ch] text-muted-foreground">{lead}</p>
      <div className="grid grid-cols-12 gap-4">{children}</div>
    </section>
  )
}

export default function App() {
  const root = useRef<HTMLDivElement>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)
  const [current, setCurrent] = useState<string>('brand')
  const [motion, setMotion] = useState({ ...MOTION })
  const [swatches, setSwatches] = useState<{ hex: string; ink: string; cr: number; s: (typeof SWATCHES)[number] }[]>([])

  useEffect(() => {
    setSwatches(SWATCHES.map((s) => {
      const hex = token(s.v)
      const [fg, bg] = 'on' in s ? [hex, token(s.on)] : [s.label, hex]
      return { hex, ink: 'on' in s ? token('--foreground') : s.label, cr: ratio(fg, bg), s }
    }))
  }, [])

  // Scroll-spy for the header tabs.
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setCurrent(e.target.id)), { rootMargin: '-35% 0px -60% 0px' })
    SECTIONS.forEach((s) => { const el = document.getElementById(s.toLowerCase()); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const { contextSafe } = useGSAP(() => { if (!reducedMotion()) tl.current = buildIntro(root.current!) }, { scope: root })
  const replay = contextSafe(() => {
    if (reducedMotion()) return
    tl.current?.revert()
    gsap.killTweensOf('[data-pulse]')
    Object.assign(MOTION, motion)
    tl.current = buildIntro(root.current!)
  })
  const set = (k: keyof typeof MOTION, v: number | string) => setMotion((m) => ({ ...m, [k]: v }))

  return (
    <div ref={root} className="min-h-screen bg-background">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-foreground focus:px-3 focus:py-2 focus:text-background">Skip to main content</a>

      {/* Header + tabs: same anatomy as the console (brand, tabs with the orange current mark). */}
      <header className="sticky top-0 z-40 bg-maroon text-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-3 gap-y-1 px-5 pt-2.5">
          <Mark className="h-3.5 w-auto text-white" />
          <p className="text-[1.0625rem] font-semibold">Repair Study Console</p>
          <p className="flex-1 text-sm text-white/90">Brand kit, sample data</p>
        </div>
        <nav aria-label="Brand kit sections" className="mx-auto flex max-w-[1400px] gap-0.5 overflow-x-auto px-5">
          {SECTIONS.map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} aria-current={current === s.toLowerCase() ? 'page' : undefined}
              className="label whitespace-nowrap border-b-4 border-transparent px-4 py-3 text-[0.8125rem] text-white no-underline hover:bg-maroon-deep aria-[current=page]:border-orange aria-[current=page]:bg-maroon-deep">
              {s}
            </a>
          ))}
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-[1400px] px-5 pb-24">
        {/* ---- Hero: the study pipeline, drawn as the poster draws it ---- */}
        <section id="brand" aria-labelledby="brand-h" className="pt-12">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-7">
              <h1 id="brand-h" className="max-w-[16ch] text-[clamp(2.25rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
                Does fixing accessibility break usability?
              </h1>
              <p className="mt-4 max-w-[46ch] text-[1.0625rem] text-muted-foreground">
                The Repair Study Console runs, scores and exports the study behind that question.
              </p>
            </div>
            <Panel title="Pipeline" hint="Sample run, 60 sites" level={2} className="col-span-12 lg:col-span-5">
              <ol className="divide-y divide-line-strong/60 border-y border-line-strong/60">
                {STEPS.map((st, i) => (
                  <li key={st.name} data-step className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 py-3">
                    <span {...(st.state === 'active' && { 'data-pulse': '' })} className="figure grid size-7 place-items-center rounded-full bg-foreground text-sm text-background">{i + 1}</span>
                    <div className="min-w-0">
                      <strong className="block font-semibold">{st.name}</strong>
                      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-raised">
                        <span data-bar className={cn('block h-full origin-left', STATE[st.state].bar)} style={{ width: `${st.pct}%` }} />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <StateBadge state={st.state} />
                      <span className="tnum text-sm text-muted-foreground">{st.count}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </Panel>
          </div>

          <div className="mt-12 grid grid-cols-12 gap-4">
            <Panel title="Mark" hint="Each cell is a state from the status matrix: done, running, queued." level={2} className="col-span-12 lg:col-span-7">
              <div className="flex flex-wrap items-stretch gap-3">
                <div className="grid h-28 w-44 place-items-center rounded bg-maroon text-white"><Mark className="w-24" /></div>
                <div className="grid h-28 w-44 place-items-center rounded border bg-card text-foreground"><Mark className="w-24" /></div>
                <div className="flex items-center gap-3 rounded bg-maroon px-5 py-4 text-white"><Mark className="w-9" /><span className="text-xl font-semibold tracking-[-0.015em]">Repair Study Console</span></div>
              </div>
            </Panel>
            <Panel title="Voice" hint="Plain verbs, sentence case, honest about what is unverified." level={2} className="col-span-12 lg:col-span-5">
              <ul className="grid gap-2">
                {[
                  ['Start the run', 'Submit'],
                  ['Prices are placeholders until you confirm them.', 'Something went wrong with pricing.'],
                  ['3 of 60 sites failed. Retry them.', 'Oops! Some sites failed.'],
                ].map(([yes, no]) => (
                  <li key={yes} className="grid grid-cols-2 gap-3 text-sm">
                    <span className="flex gap-2"><Check className="mt-0.5 size-4 flex-none text-ok" role="img" aria-label="Use" />{yes}</span>
                    <span className="flex gap-2 text-muted-foreground line-through decoration-err/70"><span className="sr-only">Avoid: </span>{no}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </section>

        {/* ---- Color ---- */}
        <Chapter id="color" title="Color" lead="Orange marks where you are and what is running. Every other state has one colour and always a word or glyph.">
          {(['VTURCS', 'Floor', 'Text', 'Status'] as const).map((g) => (
            <Panel key={g} title={g} className="col-span-12 md:col-span-6 xl:col-span-3">
              <ul className="grid gap-3">
                {swatches.filter((x) => x.s.group === g).map(({ hex, ink, cr, s }) => (
                  <li key={s.name} className="flex items-center gap-3">
                    <span className="keep-colors grid size-11 flex-none place-items-center rounded border text-[0.8125rem] font-medium" style={{ background: 'on' in s ? 'transparent' : hex, color: ink }} aria-hidden>
                      {'on' in s ? <span style={{ color: hex }}>Aa</span> : 'Aa'}
                    </span>
                    <div className="min-w-0 flex-1 text-sm">
                      <strong className="font-semibold">{s.name}</strong>
                      <div className="tnum flex gap-3 text-xs whitespace-nowrap"><span className="text-muted-foreground">{hex}</span><span className={cr >= 4.5 ? 'text-ok' : 'text-err'}>{cr.toFixed(1)}:1 {cr >= 4.5 ? 'AA' : 'fails'}</span></div>
                      <div className="text-muted-foreground">{s.role}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
          <Alert className="col-span-12 border-attn/40 bg-attn/10 text-attn">
            <CircleAlert aria-hidden />
            <AlertTitle className="font-semibold">Text on orange is black</AlertTitle>
            <AlertDescription className="text-attn/90">White on #FF6406 is only 3.0:1. The poster uses it; the console should not.</AlertDescription>
          </Alert>
        </Chapter>

        {/* ---- Type ---- */}
        <Chapter id="type" title="Type" lead="Atkinson Hyperlegible Next, drawn by the Braille Institute so lookalike characters stay distinct. One family: regular for reading, medium for controls, semibold for titles.">
          <Panel title="Scale" className="col-span-12 lg:col-span-7">
            <dl className="grid gap-6">
              {[
                ['Heading 1', '52 / 1.08, semibold, -0.02em', 'text-[3.25rem] leading-[1.08] font-semibold tracking-[-0.02em]', 'Repair loop'],
                ['Heading 2', '28 / 1.2, semibold, -0.015em', 'text-[1.75rem] leading-[1.2] font-semibold tracking-[-0.015em]', 'Evaluation and limitations'],
                ['Title', '17 / 1.3, semibold', 'text-[1.0625rem] leading-snug font-semibold', 'Models under test'],
                ['Body', '16 / 1.55, regular', 'text-base', 'Accessibility and usability are judged by separate standards: WCAG 2.2 for access, Nielsen’s ten heuristics for usability.'],
                ['Label', '12, semibold, caps, +0.08em', 'label', 'Sites done'],
              ].map(([role, spec, cls, sample]) => (
                <div key={role}><dt className="mb-1 text-sm text-muted-foreground">{role}, {spec}</dt><dd className={cn('max-w-[58ch]', cls)}>{sample}</dd></div>
              ))}
            </dl>
          </Panel>
          <Panel title="Numbers" hint="Tabular figures: every digit is the same width, so columns line up and totals compare at a glance." className="col-span-12 lg:col-span-5">
            <dl>
              {[['WCAG 2.2 violations', '1,284'], ['After repair', '486'], ['Spend', '$128.40'], ['Projected', '$1,111.11']].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between border-b py-3 last:border-0"><dt className="text-sm text-muted-foreground">{k}</dt><dd className="figure text-xl">{v}</dd></div>
              ))}
            </dl>
          </Panel>
        </Chapter>

        {/* ---- Background ---- */}
        <Chapter id="background" title="Background" lead="A flat near-black floor, as on repovive. Each step up is one level.">
          <div className="col-span-12 grid gap-px overflow-hidden rounded border sm:grid-cols-3">
            {[['bg-background', 'Floor', 'Page'], ['bg-card', 'Surface', 'Panels'], ['bg-raised', 'Raised', 'Inputs and table heads']].map(([c, n, u]) => (
              <div key={n} className={cn('flex h-32 flex-col justify-end p-4', c)}><strong className="font-semibold">{n}</strong><span className="text-sm text-muted-foreground">{u}</span></div>
            ))}
          </div>
        </Chapter>

        {/* ---- Components: the console's own set ---- */}
        <Chapter id="components" title="Components" lead="The console's components, rebuilt on shadcn/ui.">
          <Panel title="Buttons" className="col-span-12 md:col-span-6">
            <div className="flex flex-wrap items-center gap-2">
              <Button className="h-9 bg-maroon px-3.5 font-medium text-white hover:bg-maroon-deep">Start the run</Button>
              <Button variant="outline" className="h-9 px-3.5 font-medium">Pause</Button>
              <Button variant="ghost" className="h-8 border px-2.5 text-sm font-medium">Export CSV</Button>
              <Button variant="outline" className="h-9 border-err/60 px-3.5 font-medium text-err hover:bg-err/10 hover:text-err">Discard run</Button>
              <Button disabled className="h-9 px-3.5 font-medium">Disabled</Button>
            </div>
          </Panel>
          <Panel title="Badges" hint="Every state has a word and a glyph, never colour alone." className="col-span-12 md:col-span-6">
            <div className="flex flex-wrap gap-2">{(Object.keys(STATE) as State[]).map((s) => <StateBadge key={s} state={s} />)}</div>
          </Panel>
          <Panel title="Notices" className="col-span-12 lg:col-span-6">
            <div className="grid gap-2">
              <Alert className="border-attn/40 bg-attn/10 text-attn"><CircleAlert aria-hidden /><AlertTitle className="font-semibold">Warning</AlertTitle><AlertDescription className="text-attn/90">Prices are placeholders. Confirm them before the full run.</AlertDescription></Alert>
              <Alert className="border-err/40 bg-err/10 text-err"><X aria-hidden /><AlertTitle className="font-semibold">Error</AlertTitle><AlertDescription className="text-err/90">3 of 60 sites failed to import. Retry them or skip them.</AlertDescription></Alert>
              <Alert className="border-ok/40 bg-ok/10 text-ok"><Check aria-hidden /><AlertTitle className="font-semibold">Saved</AlertTitle><AlertDescription className="text-ok/90">Settings saved. Keys are stored on the server and never shown again.</AlertDescription></Alert>
            </div>
          </Panel>
          <Panel title="Fields" className="col-span-12 lg:col-span-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <div><Label htmlFor="budget" className="mb-1.5 font-medium">Budget (USD)</Label><Input id="budget" defaultValue="400" inputMode="decimal" className="figure h-9 bg-raised" /></div>
              <div><Label htmlFor="run" className="mb-1.5 font-medium">Run name</Label><Input id="run" readOnly defaultValue="repair-f26-run-1" className="h-9 bg-raised/40" /></div>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-md border-2 border-dashed border-line-strong p-4">
              <Button variant="outline" className="h-9 gap-2 font-medium"><FileUp className="size-4" aria-hidden />Choose a file</Button>
              <span className="text-sm text-muted-foreground">or drop a results export here</span>
            </div>
          </Panel>
          <Panel title="Spend" className="col-span-12 lg:col-span-6">
            <div className="relative mt-2 mb-1">
              <Progress value={32} aria-label="Spent: 32% of budget" className="h-[22px] rounded border bg-raised [&>div]:bg-transparent" />
              <span data-spend-fill className="absolute inset-y-0 left-0 rounded-l bg-foreground/85" style={{ width: '32%' }} />
              <span data-spend-mark className="absolute -top-1 -bottom-1 w-1 -translate-x-1/2 border border-black bg-orange" style={{ left: '78%' }} title="Projected" />
              <span data-spend-mark className="absolute -top-1 -bottom-1 w-1 -translate-x-1/2 bg-foreground" style={{ left: '100%' }} title="Budget" />
            </div>
            <dl className="mt-3 grid grid-cols-3 gap-4">
              {[['Spent', <span key="v" data-spend-value className="tnum">$128.40</span>], ['Projected', '$312.07'], ['Budget', '$400.00']].map(([k, v]) => (
                <div key={String(k)}><dt className="text-sm text-muted-foreground">{k}</dt><dd className="figure text-xl">{v}</dd></div>
              ))}
            </dl>
          </Panel>
          <Panel title="Arms" className="col-span-12 lg:col-span-7">
            <div className="overflow-auto rounded border">
              <Table>
                <TableHeader className="bg-raised"><TableRow>
                  <TableHead className="label">Arm</TableHead><TableHead className="label text-right">Sites done</TableHead><TableHead className="label text-right">Before</TableHead><TableHead className="label text-right">After</TableHead><TableHead className="label text-right">Change</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {TABLE.map(([arm, done, b, a]) => (
                    <TableRow key={arm}>
                      <TableHead className="font-semibold">{arm}</TableHead>
                      <TableCell className="tnum text-right">{done}</TableCell><TableCell className="tnum text-right">{b}</TableCell><TableCell className="tnum text-right">{a}</TableCell>
                      <TableCell className={cn('tnum text-right', a < b ? 'text-ok' : 'text-err')}>
                        <span className="inline-flex items-center justify-end gap-1">{a < b ? <ArrowDownRight className="size-3.5" aria-hidden /> : <ArrowUpRight className="size-3.5" aria-hidden />}<span className="sr-only">{a < b ? 'Down' : 'Up'} </span>{Math.abs(Math.round(((a - b) / b) * 100))}%</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Panel>
          <Panel title="Status matrix" className="col-span-12 lg:col-span-5">
            <ul className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem]">
              {Object.entries(CELL_LABEL).map(([k, v]) => (
                <li key={k} className="flex items-center gap-1.5"><span className={cn('grid size-5 place-items-center rounded-sm text-xs', CELL_CLS[k])} aria-hidden><CellIcon k={k} /></span>{v}</li>
              ))}
            </ul>
            <div role="table" aria-label="Status by arm and site" className="grid gap-px">
              {MATRIX.map((row, r) => (
                <div role="row" key={r} className="flex items-center gap-px">
                  <span role="rowheader" className="tnum w-7 text-xs text-muted-foreground">{ARMS[r]}</span>
                  {row.map((c, i) => <span role="cell" key={i} data-cell aria-label={`${ARMS[r]}, site ${i + 1}: ${CELL_LABEL[c]}`} title={`${ARMS[r]}, site ${i + 1}: ${CELL_LABEL[c]}`} className={cn('grid h-5 flex-1 place-items-center rounded-sm text-[11px]', CELL_CLS[c])}><CellIcon k={c} /></span>)}
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Empty state" className="col-span-12 md:col-span-6">
            <div className="rounded-md border border-dashed border-line-strong p-5 text-center">
              <p className="font-medium">No ratings yet</p>
              <p className="mb-3 text-sm text-muted-foreground">Send a teammate the rating link. Their scores appear here as they finish.</p>
              <Button variant="outline" className="h-8 text-sm font-medium">Copy rating link</Button>
            </div>
          </Panel>
          <Panel title="Facts" className="col-span-12 md:col-span-6">
            <dl className="grid grid-cols-[repeat(auto-fit,minmax(110px,1fr))] gap-4">
              {[['Sites', '60'], ['Arms', '6'], ['Prompt conditions', '4'], ['Raters', '3']].map(([k, v]) => (
                <div key={k}><dt className="text-sm text-muted-foreground">{k}</dt><dd className="figure text-2xl">{v}</dd></div>
              ))}
            </dl>
          </Panel>
        </Chapter>

        {/* ---- Motion: GSAP demo variables ---- */}
        <Chapter id="motion" title="Motion" lead="One moment: the pipeline fills in when the page opens. Reduced-motion settings skip it.">
          <Panel title="GSAP variables" hint="Defined in src/lib/motion.ts as MOTION." className="col-span-12 lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              {([['duration', 0.2, 2, 0.05, 's'], ['stagger', 0, 0.3, 0.01, 's'], ['distance', 0, 60, 2, 'px']] as const).map(([k, min, max, step, u]) => (
                <div key={k}>
                  <Label htmlFor={`m-${k}`} className="mb-1.5 flex justify-between font-medium"><span>{k}</span><span className="tnum text-muted-foreground">{motion[k]}{u}</span></Label>
                  <input id={`m-${k}`} type="range" min={min} max={max} step={step} value={motion[k]} onChange={(e) => set(k, +e.target.value)} className="w-full" />
                </div>
              ))}
              <div>
                <Label htmlFor="m-ease" className="mb-1.5 font-medium">ease</Label>
                <select id="m-ease" value={motion.ease} onChange={(e) => set('ease', e.target.value)} className="h-9 w-full rounded-md border border-input bg-raised px-2 text-sm">
                  {EASES.map((e) => <option key={e}>{e}</option>)}
                </select>
              </div>
            </div>
            <Button onClick={replay} className="mt-4 h-9 gap-2 bg-maroon px-3.5 font-medium text-white hover:bg-maroon-deep"><RotateCcw className="size-4" aria-hidden />Replay intro</Button>
          </Panel>
          <Panel title="Targets" hint="Elements the timeline animates, by data attribute." className="col-span-12 lg:col-span-5">
            <ul className="grid gap-1.5 text-sm">
              {[['data-step', 'Pipeline rows rise in'], ['data-bar', 'Progress bars fill'], ['data-spend-fill', 'Spend bar fills, counter counts up'], ['data-cell', 'Matrix cells pop in'], ['data-pulse', 'Running step ring loops']].map(([k, v]) => (
                <li key={k} className="flex justify-between gap-3 border-b py-1 last:border-0"><span className="font-mono text-orange">{k}</span><span className="text-muted-foreground">{v}</span></li>
              ))}
            </ul>
          </Panel>
        </Chapter>
      </main>
    </div>
  )
}
