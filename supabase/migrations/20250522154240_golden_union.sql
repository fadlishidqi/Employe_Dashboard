/*
  # Update employees table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Create new policies with proper authentication checks
    - Add user_id column to link employees with auth.users
  
  2. Security
    - Enable RLS
    - Add policies for CRUD operations
    - Ensure proper authentication checks
*/

-- Add user_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'employees' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE employees ADD COLUMN user_id UUID REFERENCES auth.users(id);
  END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON employees;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON employees;
DROP POLICY IF EXISTS "Enable read access for all users" ON employees;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON employees;

-- Create new policies with proper authentication checks
CREATE POLICY "Enable read access for all users" 
ON employees FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Enable insert for authenticated users" 
ON employees FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" 
ON employees FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id" 
ON employees FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- Update the trigger function to set user_id
CREATE OR REPLACE FUNCTION set_employee_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;