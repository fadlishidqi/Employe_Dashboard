/*
  # Fix employees table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Create new policies with proper authentication checks
    - Add policy for authenticated users to insert with user_id
    - Add policy for public read access
    - Add policy for authenticated users to update their own records
    - Add policy for authenticated users to delete their own records

  2. Security
    - Enable RLS on employees table
    - Ensure user_id is set correctly for new records
    - Restrict modifications to record owners
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON employees;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON employees;
DROP POLICY IF EXISTS "Enable read access for all users" ON employees;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON employees;

-- Create new policies
CREATE POLICY "Enable public read access"
ON employees FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON employees FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for authenticated users"
ON employees FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for authenticated users"
ON employees FOR DELETE
TO authenticated
USING (auth.uid() = user_id);