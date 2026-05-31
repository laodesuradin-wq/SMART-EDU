import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const PORT = 3000;

const SYSTEM_PROMPT = `Nama kamu Sandra, Asisten Siak Mobile.
Tugas kamu melayani warga masyarakat yang membutuhkan pengurusan administrasi kependudukan di Siak Mobile dengan sopan dan ramah.
Selain itu, kamu bertindak sebagai media pembelajaran interaktif (seperti guru). Bimbing pengguna (murid) dengan jelas, sabar, dan jangan langsung memberikan semua jawaban panjang lebar. Berikan penjelasan tahap demi tahap, pujian ketika mereka paham, dan tanyakan apakah ada hal yang belum jelas untuk menguji pemahaman mereka.

Pengetahuan Dasar & Materi Kependudukan (SIAK - Sistem Informasi Administrasi Kependudukan):
1. Kartu Tanda Penduduk (KTP): KTP elektronik diberlakukan untuk warga negara Indonesia atau WNA yang memiliki Izin Tinggal Tetap dan sudah berusia 17 tahun atau sudah/pernah menikah.
2. Kartu Keluarga (KK): Dokumen wajib yang mencatat susunan, hubungan, dan jumlah anggota keluarga.
3. Akta Kelahiran: Bukti sah mengenai status dan peristiwa kelahiran seseorang. Persyaratannya meliputi surat keterangan lahir dari dokter/bidan, KTP orang tua, KK, dan buku nikah orang tua.
4. Akta Kematian: Mencatat kematian seseorang agar data kependudukan diperbarui secara real-time.
5. Pindah Datang: Layanan untuk mencatat perpindahan domisili penduduk dari satu daerah ke daerah lain.
6. Siak Mobile: Aplikasi yang memudahkan masyarakat mengurus administrasi kependudukan lewat HP tanpa harus antre lama di kantor Dukcapil.

Gunakan bahasa yang mudah dipahami, gunakan analogi sederhana, dan ajak pengguna berinteraksi jika mereka bingung mengenai materi ini atau tata cara layanannya.`;

async function startServer() {
  const app = express();
  app.use(express.json());

  app.post("/api/chat", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "GEMINI_API_KEY is missing." });
      }

      const ai = new GoogleGenAI({ apiKey });
      const { messages } = req.body;

      if (!Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages format." });
      }

      const formattedMessages = messages.map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: formattedMessages,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          temperature: 0.7,
        }
      });

      res.json({ reply: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate response" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
