import { expect, it, describe } from 'vitest'
import { convertToLLM } from './convert-to-llm'

const input = {
  weight: '85',
  height: '180',
  age: '30',
  level: 'Sedentário',
  goal: 'Ganhar massa',
  gender: 'Masculino',
  experience: 'sim',
  limitations: ['Dor nas costas'],
  commitmentDays: '3',
  preferences: ['Musculação'],
  supplements: ['Proteína', 'Whey'],
  sleep: '8',
  textualInput: 'Sem orientações adicionais'
}

describe('convertToLLM', () => {
  it('should convert a simple sentence', () => {
    expect(convertToLLM(input)).toBe(
      'Peso é 85, altura é 180, idade é 30, nível de condicionamento é Sedentário, objetivo é Ganhar massa, gênero é Masculino, experiência anterior é sim, limitações físicas é Dor nas costas, dias da semana que vou me comprometer é 3, exercícios de preferência é Musculação, suplementação é Proteína e Whey, número de horas de sono é 8, orientações adicionais é Sem orientações adicionais'
    )
  })
})
