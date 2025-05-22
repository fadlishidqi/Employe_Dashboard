/*
  # Update employees table RLS policies

  1. Changes
    - Remove existing RLS policies
    - Add new policies with proper authentication checks
    - Ensure proper access control for CRUD operations
  
  2. Security
    - Enable RLS on employees table
    - Add policies for:
      - Public read access
      - Authenticated users can create records
      - Users can only update/delete their own records
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow authenticated create access" ON employees;
DROP POLICY IF EXISTS "Allow authenticated delete access" ON employees;
DROP POLICY IF EXISTS "Allow authenticated update access" ON employees;
DROP POLICY IF EXISTS "Allow public read access" ON employees;

-- Create new policies
CREATE POLICY "Enable read access for all users" ON employees
  FOR SELECT USING (true);

CREATE POLICY "Enable insert access for authenticated users" ON employees
  FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for users based on id" ON employees
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable delete for users based on id" ON employees
  FOR DELETE
  TO authenticated
  USING (auth.uid() = id);