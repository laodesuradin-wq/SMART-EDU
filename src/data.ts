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

  return subjectsList.map((s, idx) => {
    let steps: { title: string; detail: string; imageUrl?: string; audioUrl?: string }[] = [
      { title: "Pendahuluan & Apersepsi", detail: `Halo anak-anak hebat! Selamat pagi! Wah, Ibu lihat semuanya sudah siap belajar ya hari ini. Bagaimana kabarnya? Hari ini kita akan belajar mata pelajaran ${s.title}. Tujuan kita hari ini adalah agar kalian bisa memahami materi ini dengan baik. Sebelum kita mulai, mari kita baca doa bersama-sama. Berdoa mulai!`, imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800" },
      { title: "Penyampaian Materi Inti", detail: `Baiklah, sekarang coba perhatikan layar Smart Board ini ya. Pada materi ${s.title} kali ini, pembahasannya sangat seru! Coba kalian amati dan perhatikan baik-baik konsep utamanya. Ibu akan menjelaskan secara perlahan. Jangan lupa siapkan buku catatannya ya, catat bagian-bagian yang penting.`, imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800" },
      { title: "Sesi Diskusi & Tanya Jawab", detail: `Oke anak-anak, penjelasan Ibu tentang ${s.title} tadi sudah selesai. Nah, sampai di sini, apakah ada yang ingin ditanyakan? Ayo, siapa yang berani bertanya atau mau membagikan pengalamannya? Jangan malu-malu ya, kita sama-sama belajar di sini!`, imageUrl: "https://images.unsplash.com/photo-1543269664-56d7426615b1?auto=format&fit=crop&q=80&w=800" },
      { title: "Kesimpulan & Penutup", detail: `Hebat sekali partisipasi kalian hari ini! Mari kita tarik kesimpulan sama-sama. Jadi, inti dari pelajaran ${s.title} kita hari ini adalah bagaimana kita memahaminya di kehidupan sehari-hari. Tetap semangat belajarnya ya! Kita tutup pelajaran hari ini, sampai jumpa di pertemuan berikutnya!`, imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" }
    ];

    let video = "https://www.youtube.com/embed/gEBmJjS-fXw?autoplay=1&mute=1&loop=1";

    if (kelas === 1 && s.title === "Pendidikan Agama") {
      video = "https://www.youtube.com/embed/8B0dCOUdcNU?autoplay=1&mute=1&loop=1";
      steps = [
        { title: "Bab 1: Aku Cinta Al-Qur'an", detail: "Assalamualaikum anak-anak yang shalih dan shalihah! Alhamdulillah hari ini kita bisa bertemu lagi. Hari ini, Ibu akan mengenalkan huruf hijaiyah. Ada yang sudah tahu huruf hijaiyah itu ada berapa? Yuk, kita buka pelajaran hari ini dengan membaca Basmalah bersama-sama!", imageUrl: "https://images.unsplash.com/photo-1609599006353-e629aaab315d?auto=format&fit=crop&q=80&w=800", audioUrl: "https://www.youtube.com/embed/8B0dCOUdcNU?autoplay=1" },
        { title: "Bab 2: Mengenal Rukun Iman", detail: "Anak-anak, coba perhatikan gambar di layar Smart Board ini. Di sini tertulis ada 6 Rukun Iman. Rukun Iman yang pertama adalah Iman kepada Allah. Coba siapa yang berani menyebutkan rukun yang kedua? Wah pintar sekali! Yuk, kita bernyanyi lagu Rukun Iman agar lebih meresap di hati.", imageUrl: "https://images.unsplash.com/photo-1564344445690-67ee0b9dfba3?auto=format&fit=crop&q=80&w=800" },
        { title: "Bab 3: Membaca Basmalah & Hamdalah", detail: "Ayo siapa yang tadi pagi sarapan baca Bismillah dulu? Mengucapkan Basmalah sebelum memulai sesuatu dan Hamdalah setelah selesai itu tanda rasa syukur kita kepada Allah. Ayo, siapa yang mau ngasih contoh lagi kapan kita harus baca Bismillah?", imageUrl: "https://images.unsplash.com/photo-1584553421349-3557471bed79?auto=format&fit=crop&q=80&w=800" },
        { title: "Bab 4: Mengenal Rukun Islam", detail: "Selain Rukun Iman, kita juga wajib tahu Rukun Islam lho! Jumlahnya ada lima. Rukun Islam yang pertama adalah membaca dua kalimat Syahadat. Mari kita ikuti Ibu melafalkan bersama-sama: 'Asyhadu an laa ilaaha illallah...'", imageUrl: "https://images.unsplash.com/photo-1601618652438-bb45eb551d02?auto=format&fit=crop&q=80&w=800" },
        { title: "Bab 5: Nabi dan Rasul Panutanku", detail: "Sebagai kesimpulan belajar kita hari ini, kita harus selalu bersyukur dan meneladani sifat mulia para Nabi dan Rasul. Siapa yang mau jadi anak yang jujur seperti Nabi Muhammad? Jaga ibadahnya ya nak. Mari kita tutup dengan Hamdalah. Alhamdulillahi Rabbil 'Aalamin.", imageUrl: "https://images.unsplash.com/photo-1558227691-41ea78d1fb53?auto=format&fit=crop&q=80&w=800" }
      ];
    }

    return {
      id: `k${kelas}_mapel${idx+1}`,
      title: s.title,
      icon: s.icon,
      description: `Materi LIVE ${s.title} untuk kelas ${kelas} sesuai standar Kurikulum Merdeka.`,
      videoUrl: video,
      sourceName: "Rumah Belajar Kemdikbudristek",
      sourceUrl: "https://belajar.kemdikbud.go.id/",
      steps: steps
    };
  });
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
