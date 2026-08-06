const { Client } = require('pg');

const client = new Client({
  host: 'aws-0-ap-northeast-2.pooler.supabase.com',
  port: 6543,
  database: 'postgres',
  user: 'postgres.tofwlkavzlsjmdwsrdrx',
  password: 'Braintumor12345!@#$',
  ssl: { rejectUnauthorized: false }
});

const setupSQL = `
CREATE TABLE IF NOT EXISTS receipts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  hospital_name TEXT,
  disease_name TEXT,
  period TEXT,
  total_amount BIGINT,
  raw_data JSONB NOT NULL
);

ALTER TABLE receipts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public inserts on receipts') THEN
        CREATE POLICY "Allow public inserts on receipts" ON receipts FOR INSERT WITH CHECK (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public select on receipts') THEN
        CREATE POLICY "Allow public select on receipts" ON receipts FOR SELECT USING (true);
    END IF;
END
$$;
`;

async function main() {
  try {
    console.log('Connecting to database...');
    await client.connect();
    console.log('Connected!');
    
    console.log('Running setup queries...');
    await client.query(setupSQL);
    console.log('Setup completed successfully!');
  } catch (err) {
    console.error('Error during setup:', err);
  } finally {
    await client.end();
  }
}

main();
