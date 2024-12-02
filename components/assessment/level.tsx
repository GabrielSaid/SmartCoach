import CurvedRange from '../curved-range'

export default function Component() {
  return (
    <div className="w-full">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Como você classificaria seu nível de condicionamento físico?
      </h2>

      <CurvedRange />
    </div>
  )
}
