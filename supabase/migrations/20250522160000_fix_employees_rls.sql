/*
  # Fix employees table RLS policies for anonymous access

  1. Changes
    - Drop all existing conflicting policies
    - Create simple policies that allow:
      - Public read access (no auth required)
      - Public insert access (no auth required) 
      - Public update access (no auth required)
      - Public delete access (no auth required)
    
  2. Security
    - Allow anonymous access for demo purposes
    - Remove authentication requirements
*/

-- Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Enable public read access" ON employees;
DROP POLICY IF EXISTS "Enable read access for all users" ON employees;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON employees;
DROP POLICY IF EXISTS "Enable insert for authenticated users with user ID" ON employees;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON employees;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON employees;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON employees;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON employees;

-- Remove user_id column requirement by making it optional
ALTER TABLE employees ALTER COLUMN user_id DROP NOT NULL;

-- Create simple policies that allow public access
CREATE POLICY "Allow public select" ON employees
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Allow public insert" ON employees
  FOR INSERT TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update" ON employees
  FOR UPDATE TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete" ON employees
  FOR DELETE TO public
  USING (true);

-- Remove any triggers that might be setting user_id requirements
DROP TRIGGER IF EXISTS set_employee_user_id_trigger ON employees;
DROP FUNCTION IF EXISTS set_employee_user_id CASCADE;
DROP FUNCTION IF EXISTS public.set_employee_user_id CASCADE;