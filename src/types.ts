export interface Report {
  id: string;
  machine_id: number;
  created_at: string;
  is_broken: boolean;
  temperature_setting: 'delicates' | 'no' | 'low' | 'med' | 'high';
  reran_count: number;
  load_weight_kg?: number;
  load_type?: 'clothes' | 'blankets' | 'mixed' | 'towels';
  comments?: string;
}

export interface MachineStats {
  machine_id: number;
  recent_reports_total: number;
  recent_reports_broken: number;
  broken_today: number;
  total_today: number;
  broken_last_7_days: number;
  total_last_7_days: number;
  latest_report?: Report;
}

export interface FormData {
  machine_id: number;
  is_broken: boolean;
  temperature_setting: 'delicates' | 'no' | 'low' | 'med' | 'high';
  reran_count: number;
  load_weight_kg?: number;
  load_type?: 'clothes' | 'blankets' | 'mixed' | 'towels';
  comments?: string;
}
