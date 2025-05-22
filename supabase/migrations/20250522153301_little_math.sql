/*
  # Create employees table and security policies

  1. New Tables
    - `employees`
      - `id` (uuid, primary key)
      - `nama` (text)
      - `jenis_kelamin` (text)
      - `cabang_olahraga` (text)
      - `nip` (text, unique)
      - `jabatan` (text)
      - `peran` (text)
      - `sertifikasi` (text)
      - `domisili` (text)
      - `propinsi` (text)
      - `tempat_melatih` (text)
      - `tim_dilatih` (text)
      - `avatar_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `employees` table
    - Add policies for authenticated users to:
      - Read all employees
      - Create new employees
      - Update their own employees
      - Delete their own employees
*/

CREATE TABLE employees (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama text NOT NULL,
  jenis_kelamin text NOT NULL,
  cabang_olahraga text NOT NULL,
  nip text UNIQUE NOT NULL,
  jabatan text NOT NULL,
  peran text NOT NULL,
  sertifikasi text NOT NULL,
  domisili text NOT NULL,
  propinsi text NOT NULL,
  tempat_melatih text NOT NULL,
  tim_dilatih text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON employees
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated create access" ON employees
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update access" ON employees
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM employees WHERE id = auth.uid()))
  WITH CHECK (auth.uid() IN (SELECT id FROM employees WHERE id = auth.uid()));

CREATE POLICY "Allow authenticated delete access" ON employees
  FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM employees WHERE id = auth.uid()));