import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReportForm } from '../components/ReportForm'
import { submitReport } from '../lib/api'
import { FormData } from '../types'
import styles from './ReportingPage.module.css'

export const ReportingPage: React.FC = () => {
  const { machineId } = useParams<{ machineId: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const navigate = useNavigate()

  const defaultMachineId = machineId ? parseInt(machineId, 10) : 325
  console.log(defaultMachineId)

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      const result = await submitReport(data)
      if (result) {
        setSubmitSuccess(true)
        
        // Reload to the machine's details page after 2 seconds
        setTimeout(() => {
          navigate(`/machine/${data.machine_id}`)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting report:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
        <h1>Are the Dryer Machines broken?</h1>
      </div>

      {submitSuccess ? (
        <div className={styles.successMessage}>
          <h2>✓ Report Submitted Successfully!</h2>
          <p>Redirecting to machine details...</p>
        </div>
      ) : (
        <ReportForm 
          onSubmit={handleSubmit} 
          isLoading={isLoading}
          defaultMachineId={defaultMachineId}
        />
      )}
    </div>
  )
}
