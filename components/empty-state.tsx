import Link from 'next/link'
import { Button } from './ui/button'
import { IconBpm, IconKcal } from './ui/icons'

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-md py-12">
      <h2 className="z-10 text-xl font-semibold text-gray-700 dark:text-white">
        Sem plano de treino encontrado.
      </h2>

      <h3 className="z-10 text-lg text-gray-400 dark:text-white">
        Preencha os dados do seu condicionamento físico e descubra agora mesmo
        seu treino personalizado.
      </h3>

      <div className="mt-16 flex items-center gap-4">
        <IconKcal className="-mt-16 text-black dark:text-white" />

        <Link href="/assessment">
          <Button>Preencher</Button>
        </Link>

        <IconBpm className="-mt-16 text-black dark:text-white" />
      </div>
    </div>
  )
}
