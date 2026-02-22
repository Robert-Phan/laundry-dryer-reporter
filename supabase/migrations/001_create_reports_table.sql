-- Create the reports table
CREATE TABLE IF NOT EXISTS reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  machine_id INTEGER NOT NULL CHECK (machine_id >= 1 AND machine_id <= 4),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_broken BOOLEAN NOT NULL DEFAULT FALSE,
  temperature_setting VARCHAR(20) NOT NULL DEFAULT 'med' CHECK (temperature_setting IN ('delicates', 'no', 'low', 'med', 'high')),
  reran_count INTEGER DEFAULT 0 CHECK (reran_count >= 0),
  load_weight_kg DECIMAL(5, 2),
  load_type VARCHAR(20) CHECK (load_type IN ('clothes', 'blankets', 'mixed', 'towels')),
  comments TEXT,
  CONSTRAINT check_load_weight_positive CHECK (load_weight_kg IS NULL OR load_weight_kg > 0)
);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_reports_machine_id_created_at 
ON reports(machine_id, created_at DESC);

-- Enable Row Level Security (optional, for better security)
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous inserts
CREATE POLICY "Allow anonymous inserts" ON reports
  FOR INSERT WITH CHECK (true);

-- Create a policy to allow anonymous reads
CREATE POLICY "Allow anonymous reads" ON reports
  FOR SELECT USING (true);
