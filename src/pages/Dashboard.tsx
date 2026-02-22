import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MachinePanel } from '../components/MachinePanel'
import { getAllMachinesStats } from '../lib/api'
import { MachineStats } from '../types'
import styles from './Dashboard.module.css'

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<MachineStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const loadStats = async () => {
      setIsLoading(true)
      const machineStats = await getAllMachinesStats()
      setStats(machineStats)
      setIsLoading(false)
    }

    loadStats()
    // Refresh every 30 seconds
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleMachineClick = (machineId: number) => {
    navigate(`/machine/${machineId}`)
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Dryer Machine Status</h1>
        <p className={styles.subtitle}>Click on a machine to view details and submit reports</p>
      </header>

      {isLoading ? (
        <div className={styles.loading}>Loading machine status...</div>
      ) : (
        <div className={styles.grid}>
          {stats.map(stat => (
            <MachinePanel
              key={stat.machine_id}
              stats={stat}
              onClick={() => handleMachineClick(stat.machine_id)}
            />
          ))}
        </div>
      )}

      <button 
        className={styles.reportButton}
        onClick={() => navigate('/report')}
      >
        + New Report
      </button>
    </div>
  )
}
