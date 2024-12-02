import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren
} from 'react'

const AssessmentContext = createContext<any>({})

export const useAssessmentContext = () => useContext(AssessmentContext)

export const AssessmentProvider = ({ children }: PropsWithChildren) => {
  const [assessmentData, setAssessmentData] = useState({
    weight: 160,
    height: 178,
    age: 18,
    level: 0
  })

  const updateAssessmentData = (step: string, data: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [step]: data
    }))
  }

  return (
    <AssessmentContext.Provider
      value={{ assessmentData, updateAssessmentData }}
    >
      {children}
    </AssessmentContext.Provider>
  )
}
