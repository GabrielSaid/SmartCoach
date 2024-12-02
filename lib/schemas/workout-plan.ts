import { z } from 'zod'

/**
 * We use Zod (https://zod.dev) to define our schema for convenience,
 * but you can pass JSON schema if desired.
 *
 * TODO: testar com "output" ao invés de "treino"
 */
export const workoutPlanSchema = z
  .object({
    name: z.string().describe('Nome do Plano de Treino'),
    workouts: z.array(
      z.object({
        name: z.string().describe('Nome do Treino'),
        description: z.string().describe('Descrição do Treino'),
        detailed: z
          .string()
          .describe(
            'Detalhamento mais completo do treino, especifique possíveis equipamentos, como fazer (faça etapa a etapa, obrigatoriamente!) e se necessário os locais indicados.'
          ),
        repetitions: z
          .number()
          .describe('O número de repetições de cada treino'),
        level: z
          .enum(['Iniciante', 'Intermediário', 'Avançado'])
          .describe('O nível de complexidade de cada treino'),
        time: z.string().describe('O tempo médio de execução de cada treino')
      })
    )
  })
  .describe(
    'Deve ser sempre usado para formatar corretamente o plano de treino'
  )
