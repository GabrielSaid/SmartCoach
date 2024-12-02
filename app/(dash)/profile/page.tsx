import React from 'react'
import {
  ArrowLeft,
  Settings,
  Edit2,
  Award,
  Dumbbell,
  Calendar,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  return (
    <div className="flex flex-col">
      <header className="bg-orange-500 p-4 text-white">
        <div className="mb-4 flex items-center justify-between">
          <button className="text-white">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Perfil</h1>
          <button className="text-white">
            <Settings className="h-6 w-6" />
          </button>
        </div>
        <div className="flex items-center">
          {/* <img
            src="/placeholder.svg?height=80&width=80&text=JS"
            alt="Profile"
            className="mr-4 h-20 w-20 rounded-full border-2 border-white"
          /> */}
          <div>
            <h2 className="text-2xl font-bold">Gabriel Said</h2>
            <p className="text-sm">@gabrielsaid</p>
          </div>
        </div>
        <button className="mt-4 flex items-center justify-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-orange-500">
          <Edit2 className="mr-2 h-4 w-4" />
          Editar Perfil
        </button>
      </header>

      <main className="flex-1 py-4">
        <section className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h3 className="mb-2 font-semibold">Estatísticas</h3>
          <div className="flex justify-between">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">28</p>
              <p className="text-xs text-gray-500">Treinos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">1,890</p>
              <p className="text-xs text-gray-500">Calorias</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-500">6.5</p>
              <p className="text-xs text-gray-500">Horas</p>
            </div>
          </div>
        </section>

        <section className="mb-4 rounded-lg bg-white p-4 shadow-sm">
          <h3 className="mb-2 font-semibold">Conquistas</h3>
          <div className="flex space-x-4">
            <Award className="h-12 w-12 text-orange-500" />
            <Award className="h-12 w-12 text-gray-300" />
            <Award className="h-12 w-12 text-gray-300" />
          </div>
        </section>

        <section className="rounded-lg bg-white shadow-sm">
          <Link
            href="/workout"
            className="flex w-full items-center justify-between border-b border-gray-200 p-4"
          >
            <div className="flex items-center">
              <Dumbbell className="mr-3 h-6 w-6 text-orange-500" />
              <span>Meus Treinos</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
          <button className="flex w-full items-center justify-between p-4">
            <div className="flex items-center">
              <Calendar className="mr-3 h-6 w-6 text-orange-500" />
              <span>Histórico de Atividades</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </button>
        </section>
      </main>
    </div>
  )
}
