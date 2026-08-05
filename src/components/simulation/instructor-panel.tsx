"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, EyeOff, Radio, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { SimulationAttempt } from "@/types/simulation";

export function InstructorPanel() {
  const [pin, setPin] = useState("");
  const [activePin, setActivePin] = useState<string | null>(null);
  const [attempts, setAttempts] = useState<SimulationAttempt[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState(true);

  const loadAttempts = useCallback(async (instructorPin: string, quiet = false) => {
    if (!quiet) setLoading(true);
    try {
      const response = await fetch("/api/simulation-attempts", {
        headers: { "x-instructor-pin": instructorPin },
        cache: "no-store",
      });
      const result = (await response.json()) as { attempts?: SimulationAttempt[]; error?: string };
      if (!response.ok) throw new Error(result.error ?? "Kayıtlar alınamadı.");
      setAttempts(result.attempts ?? []);
      setActivePin(instructorPin);
      setError(null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Kayıtlar alınamadı.");
      if (!quiet) setActivePin(null);
    } finally {
      if (!quiet) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!activePin) return;
    const timer = window.setInterval(() => void loadAttempts(activePin, true), 2000);
    return () => window.clearInterval(timer);
  }, [activePin, loadAttempts]);

  async function clearAttempts() {
    if (!activePin || !window.confirm("Tüm simülasyon kayıtları silinsin mi?")) return;
    const response = await fetch("/api/simulation-attempts", {
      method: "DELETE",
      headers: { "x-instructor-pin": activePin },
    });
    if (response.ok) setAttempts([]);
  }

  if (!activePin) {
    return (
      <form
        className="mx-auto w-full max-w-sm rounded-[var(--radius-lg)] border border-border bg-surface-1 p-6"
        onSubmit={(event) => {
          event.preventDefault();
          void loadAttempts(pin);
        }}
      >
        <Label htmlFor="instructor-pin">Eğitmen PIN&apos;i</Label>
        <Input
          id="instructor-pin"
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(event) => setPin(event.target.value)}
          className="mt-2"
          placeholder="••••"
          autoComplete="off"
        />
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
        <Button className="mt-4 w-full" disabled={loading || !pin}>
          {loading ? "Açılıyor…" : "Paneli aç"}
        </Button>
        <p className="mt-4 text-xs leading-5 text-text-secondary">
          PIN&apos;i eğitmenden alın. (Ortam değişkeni: SIMULATION_INSTRUCTOR_PIN.)
        </p>
      </form>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-success">
          <Radio className="h-4 w-4 animate-pulse" aria-hidden="true" />
          Canlı izleme açık · {attempts.length} gönderim
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowPasswords((value) => !value)}>
            {showPasswords ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showPasswords ? "Parolaları gizle" : "Parolaları göster"}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => void loadAttempts(activePin)}>
            <RefreshCw className="h-4 w-4" /> Yenile
          </Button>
          <Button variant="danger" size="sm" onClick={() => void clearAttempts()}>
            <Trash2 className="h-4 w-4" /> Kayıtları temizle
          </Button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface-1">
        {attempts.length === 0 ? (
          <div className="px-6 py-16 text-center text-sm text-text-secondary">
            Henüz bir gönderim yok. Öğrenci ekranı <span className="text-text-primary">/login</span>
            {" "}adresinde.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-border bg-surface-2 text-xs uppercase tracking-wider text-text-secondary">
                <tr>
                  <th className="px-5 py-3 font-medium">Zaman</th>
                  <th className="px-5 py-3 font-medium">Kaynak</th>
                  <th className="px-5 py-3 font-medium">Öğrenci kodu</th>
                  <th className="px-5 py-3 font-medium">Demo parola</th>
                  <th className="px-5 py-3 font-medium">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {attempts.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-surface-2/50">
                    <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                      {new Intl.DateTimeFormat("tr-TR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      }).format(new Date(attempt.createdAt))}
                    </td>
                    <td className="px-5 py-4 text-text-secondary">
                      {attempt.source === "connect-flow" ? "Instagram'a bağlan" : "Giriş sayfası"}
                    </td>
                    <td className="px-5 py-4 font-mono text-text-primary">{attempt.username}</td>
                    <td className="px-5 py-4 font-mono text-warning">
                      {showPasswords ? attempt.demoPassword : "••••••••••••"}
                    </td>
                    <td className="px-5 py-4 text-success">Panelde göründü</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <p className="mt-4 text-xs leading-5 text-text-secondary">
        Bu panel yalnızca simülatörün kabul ettiği eğitim kimlik bilgilerini gösterir:
        giriş sayfasından ogrenci-XX / DEMO-... biçimindeki kodlar, "Instagram'a bağlan"
        akışından ise yalnızca ogrenci1 / 123123 çifti. Başka hiçbir bilgi kabul edilmez
        veya saklanmaz. Uygulama yeniden başlatıldığında kayıtlar sıfırlanır.
      </p>
    </div>
  );
}
