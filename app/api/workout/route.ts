import { NextRequest, NextResponse } from 'next/server'
import { ChatOpenAI } from '@langchain/openai'
import { PromptTemplate } from '@langchain/core/prompts'
import { auth } from '@/auth'
import { workoutPlanSchema } from '@/lib/schemas/workout-plan'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'edge'

const TEMPLATE = `Você é um personal trainer de uma academia e foi requisitado para gerar um plano de treino para alguém.

Gere o nome do plano de treino e seus múltiplos treinos baseado nas informações e preferências mencionados no input.

Input:

{input}`

/**
 * This handler initializes and calls an OpenAI Functions powered
 * structured output chain. See the docs for more information:
 *
 * https://js.langchain.com/v0.2/docs/how_to/structured_output
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const userId = (await auth())?.user.id

    if (!userId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const assessment = body.assessment ?? null

    if (assessment) {
      return NextResponse.json(
        { error: 'O campo assessment é obrigatório.' },
        { status: 400 }
      )
    }

    const prompt = PromptTemplate.fromTemplate(TEMPLATE)
    /**
     * Function calling is currently only supported with ChatOpenAI models
     */
    const model = new ChatOpenAI({
      temperature: 0.8,
      model: 'gpt-4o-mini'
    })

    /**
     * Bind schema to the OpenAI model.
     * Future invocations of the returned model will always match the schema.
     *
     * Under the hood, uses tool calling by default.
     */
    const functionCallingModel = model.withStructuredOutput(workoutPlanSchema, {
      name: 'output_formatter'
    })

    /**
     * Returns a chain with the function calling model.
     */
    const chain = prompt.pipe(functionCallingModel)

    const result = await chain.invoke({
      input: assessment
    })

    if (!result?.name) {
      return new Response(`Couldn't generate workout plan.`, { status: 500 })
    }

    if (!result?.workouts) {
      return new Response(`Couldn't generate workouts.`, { status: 500 })
    }

    /**
     * Insert workout into database.
     */
    const { data: workoutPlan } = await supabase
      .from('workout_plans')
      .upsert({ name: result.name, user_id: userId })
      .throwOnError()
      .select()

    if (!workoutPlan) {
      return new Response(`Couldn't save the workout plan.`, { status: 500 })
    }

    const workoutsWithUserId = result.workouts.map((workout: any) => ({
      ...workout,
      user_id: userId,
      workout_plan_id: workoutPlan[0].id
    }))

    await supabase.from('workouts').insert(workoutsWithUserId).throwOnError()

    return NextResponse.json(result, { status: 200 })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 })
  }
}
