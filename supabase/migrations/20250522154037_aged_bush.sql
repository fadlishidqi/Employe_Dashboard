/*
  # Update employees table RLS policies

  1. Changes
    - Drop existing INSERT policy
    - Create new INSERT policy that properly associates user ID with employee record
    
  2. Security
    - Ensures authenticated users can only create records with their own user ID
    - Maintains existing policies for other operations
*/

-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON employees;

-- Create new INSERT policy that properly sets the user ID
CREATE POLICY "Enable insert for authenticated users with user ID" 
ON employees 
FOR INSERT 
TO authenticated 
WITH CHECK (
  auth.uid() IS NOT NULL
);

-- Ensure the id column is set to the user's ID on insert
CREATE OR REPLACE FUNCTION public.set_employee_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set user ID
DROP TRIGGER IF EXISTS set_employee_user_id_trigger ON employees;
CREATE TRIGGER set_employee_user_id_trigger
  BEFORE INSERT ON employees
  FOR EACH ROW
  EXECUTE FUNCTION public.set_employee_user_id();