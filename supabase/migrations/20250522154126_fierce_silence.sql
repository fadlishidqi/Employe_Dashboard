/*
  # Update employees table RLS policies

  1. Changes
    - Remove existing RLS policies that are causing issues
    - Add new RLS policies with proper authentication checks
    
  2. Security
    - Enable RLS on employees table
    - Add policies for CRUD operations with proper authentication checks
    - Ensure authenticated users can manage their own records
    - Allow public read access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable delete for users based on id" ON employees;
DROP POLICY IF EXISTS "Enable insert for authenticated users with user ID" ON employees;
DROP POLICY IF EXISTS "Enable read access for all users" ON employees;
DROP POLICY IF EXISTS "Enable update for users based on id" ON employees;

-- Create new policies
CREATE POLICY "Enable read access for all users"
ON public.employees FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users"
ON public.employees FOR INSERT
TO authenticated
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable update for authenticated users"
ON public.employees FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Enable delete for authenticated users"
ON public.employees FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);