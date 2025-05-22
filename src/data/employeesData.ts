export interface Employee {
  id: number;
  nama: string;
  jenisKelamin: 'Laki-laki' | 'Perempuan';
  cabangOlahraga: string;
  nip: string;
  jabatan: string;
  peran: string;
  sertifikasi: string;
  domisili: string;
  propinsi: string;
  tempatMelatih: string;
  timDilatih: string;
  avatar: string;
}

export const employees: Employee[] = [
  {
    id: 1,
    nama: 'Budi Santoso',
    jenisKelamin: 'Laki-laki',
    cabangOlahraga: 'Sepak Bola',
    nip: '198504152010011001',
    jabatan: 'Kepala Pelatih',
    peran: 'Pelatih',
    sertifikasi: 'Lisensi A AFC',
    domisili: 'Jakarta Selatan',
    propinsi: 'DKI Jakarta',
    tempatMelatih: 'Stadion Gelora Bung Karno',
    timDilatih: 'Tim Nasional U-23',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    nama: 'Siti Rahayu',
    jenisKelamin: 'Perempuan',
    cabangOlahraga: 'Bulu Tangkis',
    nip: '199003242012012003',
    jabatan: 'Asisten Pelatih',
    peran: 'Ast. Pelatih',
    sertifikasi: 'BWF Level 3',
    domisili: 'Bandung',
    propinsi: 'Jawa Barat',
    tempatMelatih: 'PB Djarum',
    timDilatih: 'Tim Putri',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    nama: 'Ahmad Wijaya',
    jenisKelamin: 'Laki-laki',
    cabangOlahraga: 'Basket',
    nip: '198708112013031005',
    jabatan: 'Wasit Utama',
    peran: 'Wasit',
    sertifikasi: 'FIBA Level 2',
    domisili: 'Surabaya',
    propinsi: 'Jawa Timur',
    tempatMelatih: 'GOR Kertajaya',
    timDilatih: 'Liga Basket Indonesia',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    nama: 'Dewi Purnama',
    jenisKelamin: 'Perempuan',
    cabangOlahraga: 'Renang',
    nip: '199112052014042008',
    jabatan: 'Pelatih Teknik',
    peran: 'Pelatih',
    sertifikasi: 'FINA Level 3',
    domisili: 'Denpasar',
    propinsi: 'Bali',
    tempatMelatih: 'Stadion Renang GBK',
    timDilatih: 'Tim Renang Junior',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 5,
    nama: 'Rudi Hartono',
    jenisKelamin: 'Laki-laki',
    cabangOlahraga: 'Atletik',
    nip: '198302182009011004',
    jabatan: 'Pelatih Lari',
    peran: 'Pelatih',
    sertifikasi: 'IAAF Level 3',
    domisili: 'Yogyakarta',
    propinsi: 'D.I. Yogyakarta',
    tempatMelatih: 'Stadion Mandala Krida',
    timDilatih: 'Tim Lari Jarak Menengah',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 6,
    nama: 'Rina Susanti',
    jenisKelamin: 'Perempuan',
    cabangOlahraga: 'Senam',
    nip: '199506272016012010',
    jabatan: 'Asisten Pelatih',
    peran: 'Ast. Pelatih',
    sertifikasi: 'FIG Level 2',
    domisili: 'Semarang',
    propinsi: 'Jawa Tengah',
    tempatMelatih: 'GOR Jatidiri',
    timDilatih: 'Tim Senam Artistik Putri',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];