import React from 'react'
import { MachineStats } from '../types'
import styles from './MachinePanel.module.css'

interface MachinePanelProps {
  stats: MachineStats
  onClick: () => void
}

export const MachinePanel: React.FC<MachinePanelProps> = ({ stats, onClick }) => {
  const getBrokenPercentage = (broken: number, total: number): number => {
    return total === 0 ? 0 : Math.round((broken / total) * 100)
  }

  const getStatusColor = (brokenPercentage: number): string => {
    if (brokenPercentage === 0) return styles.green
    if (brokenPercentage <= 25) return styles.yellow
    if (brokenPercentage <= 75) return styles.orange
    return styles.red
  }

  const brokenPercentage = getBrokenPercentage(
    stats.recent_reports_broken,
    stats.recent_reports_total
  )

  const statusColor = getStatusColor(brokenPercentage)
  const statusText = stats.latest_report ? (stats.latest_report.is_broken ? 'Broken' : 'Working') : 'No reports'

  return (
    <div className={`${styles.panel} ${statusColor}`} onClick={onClick}>
      <div className={styles.machineNumber}>Machine {stats.machine_id}</div>
      <div className={styles.status}>{statusText}</div>
      <div className={styles.stats}>
        <div className={styles.statLine}>
          Reported broken {stats.recent_reports_broken} out of the last 5 times.
          {/* {stats.recent_reports_broken} / {stats.recent_reports_total} broken in last 5 reports */}
        </div>
        <div className={styles.statLine}>
          Today: {getBrokenPercentage(stats.broken_today, stats.total_today)}% broken
        </div>
        <div className={styles.statLine}>
          Last 7 days: {getBrokenPercentage(stats.broken_last_7_days, stats.total_last_7_days)}% broken
        </div>
      </div>
    </div>
  )
}
