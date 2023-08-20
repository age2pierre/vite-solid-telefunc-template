import { createSignal } from 'solid-js'

export default function Home() {
  const [count, setCount] = createSignal(0)

  return (
    <section class="min-h-full shadow-2xl w-3/4 p-8">
      <h1>Home</h1>
      <p>This is the home page.</p>

      <div>
        <button
          class="btn btn-sm"
          onClick={() => {
            setCount(count() - 1)
          }}
        >
          -
        </button>

        <output>Count: {count()}</output>

        <button
          class="btn btn-sm"
          onClick={() => {
            setCount(count() + 1)
          }}
        >
          +
        </button>
      </div>
    </section>
  )
}
