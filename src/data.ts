import { ServiceModule, QuizQuestion, Subject } from "./types";

const generateSubjects = (kelas: number): Subject[] => {
  let subjectsList: {title: string, icon: string}[] = [];
  
  if (kelas >= 1 && kelas <= 6) {
    subjectsList = [
      { title: "Pendidikan Agama", icon: "Book" },
      { title: "Pancasila", icon: "Flag" },
      { title: "Bahasa Indonesia", icon: "BookOpen" },
      { title: "Matematika", icon: "Calculator" },
      { title: "IPAS", icon: "Globe" },
      { title: "PJOK", icon: "Activity" },
      { title: "Seni Budaya", icon: "Palette" },
      { title: "Bahasa Inggris", icon: "MessageSquare" }
    ];
  } else if (kelas >= 7 && kelas <= 9) {
    subjectsList = [
      { title: "Pendidikan Agama", icon: "Book" },
      { title: "Pancasila", icon: "Flag" },
      { title: "Bahasa Indonesia", icon: "BookOpen" },
      { title: "Matematika", icon: "Calculator" },
      { title: "IPA", icon: "FlaskConical" },
      { title: "IPS", icon: "Globe" },
      { title: "Bahasa Inggris", icon: "MessageSquare" },
      { title: "PJOK", icon: "Activity" },
      { title: "Informatika", icon: "Monitor" },
      { title: "Seni Budaya", icon: "Palette" }
    ];
  } else {
    subjectsList = [
      { title: "Pendidikan Agama", icon: "Book" },
      { title: "Pancasila", icon: "Flag" },
      { title: "Bahasa Indonesia", icon: "BookOpen" },
      { title: "Matematika", icon: "Calculator" },
      { title: "Fisika", icon: "Zap" },
      { title: "Kimia", icon: "FlaskConical" },
      { title: "Biologi", icon: "Leaf" },
      { title: "Sosiologi", icon: "Users" },
      { title: "Ekonomi", icon: "TrendingUp" },
      { title: "Geografi", icon: "Globe" },
      { title: "Sejarah", icon: "Hourglass" },
      { title: "Bahasa Inggris", icon: "MessageSquare" },
      { title: "PJOK", icon: "Activity" },
      { title: "Informatika", icon: "Monitor" },
      { title: "Seni Budaya", icon: "Palette" }
    ];
  }

  return subjectsList.map((s, idx) => ({
    id: `k${kelas}_mapel${idx+1}`,
    title: s.title,
    icon: s.icon,
    description: `Materi LIVE ${s.title} untuk kelas ${kelas} sesuai standar Kurikulum Merdeka.`,
    videoUrl: "https://www.youtube.com/embed/gEBmJjS-fXw?autoplay=1&mute=1&loop=1",
    steps: [
      { title: "Sesi Pembuka", detail: `Tutor akan membuka sesi LIVE ${s.title} dengan pemaparan tujuan pembelajaran.` },
      { title: "Materi Utama", detail: "Perhatikan dan catat poin penting dari penjelasan konsep secara langsung." },
      { title: "Sesi Tanya Jawab", detail: "Gunakan fitur tanya jawab untuk bertanya jika ada materi yang belum dipahami kepada tutor." },
      { title: "Kesimpulan", detail: `Tutor akan menarik kesimpulan untuk materi ${s.title} hari ini.` }
    ]
  }));
};

export const modules: ServiceModule[] = Array.from({ length: 12 }, (_, i) => {
  const kelas = i + 1;
  return {
    id: `kelas_${kelas}`,
    title: `Kelas ${kelas}`,
    icon: "GraduationCap",
    description: `Materi pelajaran Kelas ${kelas} kurikulum kemendikbud.`,
    subjects: generateSubjects(kelas)
  };
});

export const quizzes: QuizQuestion[] = [
  {
    id: "q1",
    question: "Apa langkah yang paling penting saat melakukan Registrasi Akun baru untuk memastikan keamanan data?",
    options: [
      "Membayar biaya pendaftaran",
      "Melakukan Swafoto (Selfie) dengan memegang KTP",
      "Menghubungi petugas via telepon",
      "Memberikan password akun ke teman"
    ],
    correctAnswerIndex: 1,
    explanation: "Swafoto dengan KTP memastikan bahwa yang mendaftar adalah pemilik sah dari identitas NIK tersebut, demi menghindari penipuan."
  },
  {
    id: "q2",
    question: "Dalam layanan Akta Kelahiran, dokumen utama yang menjadi syarat mutlak adalah...",
    options: [
      "Ijazah terakhir orang tua",
      "Kartu Vaksin bayi",
      "Surat Keterangan Lahir dari RS/Bidan",
      "Akta Kelahiran Ayah"
    ],
    correctAnswerIndex: 2,
    explanation: "Surat Keterangan Lahir adalah bukti otentik yang dikeluarkan pihak medis dan menjadi rujukan utama pembuatan Akta Kelahiran."
  },
  {
    id: "q3",
    question: "Jika ingin mengurus KTP yang hilang melalui Siak Mobile, dokumen pertama yang harus disiapkan adalah:",
    options: [
      "Kartu Keluarga asli terbaru",
      "Surat Pindah (SKPWNI)",
      "Surat Permohonan RT/RW",
      "Surat Keterangan Kehilangan dari Kepolisian"
    ],
    correctAnswerIndex: 3,
    explanation: "KTP yang hilang wajib dibuktikan dengan adanya laporan/Surat Keterangan Kehilangan dari pihak Kepolisian agar tidak disalahgunakan."
  }
];

export const leaderboardData = [
  { rank: 1, name: "Budi Santoso", points: 2450, avatar: "BS" },
  { rank: 2, name: "Siti Aminah", points: 2100, avatar: "SA" },
  { rank: 3, name: "Andi Wijaya", points: 1950, avatar: "AW" },
  { rank: 4, name: "Rina Kartika", points: 1800, avatar: "RK" },
  { rank: 5, name: "Dwi Putra", points: 1550, avatar: "DP" },
  { rank: 6, name: "Maya Indah", points: 1400, avatar: "MI" },
  { rank: 7, name: "Pelajar Hebat", points: 1250, avatar: "PH", isCurrentUser: true },
  { rank: 8, name: "Agus Pratama", points: 1100, avatar: "AP" }
];
