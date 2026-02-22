import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ReportCard } from '../components/ReportCard'
import { getReportsForMachine } from '../lib/api'
import { Report } from '../types'
import styles from './MachineDetails.module.css'

export const MachineDetails: React.FC = () => {
  const { machineId } = useParams<{ machineId: string }>()
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const machineNumber = machineId ? parseInt(machineId, 10) : 1

  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true)
      const fetchedReports = await getReportsForMachine(machineNumber)
      setReports(fetchedReports)
      setIsLoading(false)
    }

    loadReports()
  }, [machineNumber])

  const handleReport = () => {
    navigate(`/report/${machineNumber}`)
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate('/')}>
          ← Back to Dashboard
        </button>
        <h1>Machine {machineNumber} - Reports</h1>
        <button className={styles.reportButton} onClick={handleReport}>
          + Submit Report
        </button>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading reports...</div>
      ) : reports.length === 0 ? (
        <div className={styles.empty}>
          <p>No reports yet for this machine</p>
          <button className={styles.reportLink} onClick={handleReport}>
            Submit the first report
          </button>
        </div>
      ) : (
        <div className={styles.reportsList}>
          {reports.map(report => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </div>
  )
}
