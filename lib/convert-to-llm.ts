const MAP_OF_PROPS = {
  weight: 'Peso',
  height: 'Altura',
  age: 'Idade',
  level: 'Nível de condicionamento',
  goal: 'Objetivo',
  gender: 'Gênero',
  experience: 'Experiência anterior',
  limitations: 'Limitações físicas',
  commitmentDays: 'Dias da semana que vou me comprometer',
  preferences: 'Exercícios de preferência',
  supplements: 'Suplementação',
  // calories: 'Calorias por dia'
  sleep: 'Número de horas de sono',
  textualInput: 'Orientações adicionais'
}

type InputProps = {
  weight: string
  height: string
  age: string
  level: string
  goal: string
  gender: string
  experience: string
  limitations: string[]
  commitmentDays: string
  preferences: string[]
  supplements: string[]
  sleep: string
  textualInput: string
}

function formatArrayWithConjunction(items: string[]): string {
  if (items.length <= 1) return items.join('')
  return `${items.slice(0, -1).join(', ')} e ${items[items.length - 1]}`
}

export function convertToLLM(input: InputProps): string {
  const result = Object.entries(input)
    .filter(
      ([key, value]) => value && MAP_OF_PROPS[key as keyof typeof MAP_OF_PROPS]
    )
    .map(([key, value]) => {
      const formattedValue = Array.isArray(value)
        ? formatArrayWithConjunction(value)
        : value

      if (key === 'weight') {
        return `${
          MAP_OF_PROPS[key as keyof typeof MAP_OF_PROPS]
        } é ${formattedValue}`
      }

      return `${MAP_OF_PROPS[
        key as keyof typeof MAP_OF_PROPS
      ].toLowerCase()} é ${formattedValue}`
    })
    .join(', ')

  return result
}
