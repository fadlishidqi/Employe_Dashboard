import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export interface Employee {
  id: string;
  nama: string;
  jenis_kelamin: string;
  cabang_olahraga: string;
  nip: string;
  jabatan: string;
  peran: string;
  sertifikasi: string;
  domisili: string;
  propinsi: string;
  tempat_melatih: string;
  tim_dilatih: string;
  avatar_url: string | null;
  user_id?: string | null;
}

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEmployees(data || []);
    } catch (error) {
      toast.error('Error fetching employees');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function getEmployeeById(id: string): Promise<Employee | null> {
    try {
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      toast.error('Error fetching employee');
      console.error('Error:', error);
      return null;
    }
  }

  async function createEmployee(employee: Omit<Employee, 'id'>) {
    try {
      const { data, error } = await supabase
        .from('employees')
        .insert([{ ...employee }])
        .select()
        .single();

      if (error) throw error;
      setEmployees(prev => [data, ...prev]);
      toast.success('Employee created successfully');
      return data;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error creating employee');
      }
      console.error('Error:', error);
      return null;
    }
  }

  async function updateEmployee(id: string, updates: Partial<Employee>) {
    try {
      const { data, error } = await supabase
        .from('employees')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setEmployees(prev => prev.map(emp => emp.id === id ? data : emp));
      toast.success('Employee updated successfully');
      return data;
    } catch (error) {
      toast.error('Error updating employee');
      console.error('Error:', error);
      return null;
    }
  }

  async function deleteEmployee(id: string) {
    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setEmployees(prev => prev.filter(emp => emp.id !== id));
      toast.success('Employee deleted successfully');
    } catch (error) {
      toast.error('Error deleting employee');
      console.error('Error:', error);
    }
  }

  return {
    employees,
    loading,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById
  };
}

// Hook khusus untuk mendapatkan single employee
export function useEmployee(id: string) {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchEmployee() {
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('employees')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setEmployee(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error fetching employee');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id]);

  return { employee, loading, error };
}