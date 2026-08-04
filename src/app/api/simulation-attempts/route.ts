import {
  addSimulationAttempt,
  clearSimulationAttempts,
  listSimulationAttempts,
} from "@/lib/simulation-store";

const USERNAME_PATTERN = /^ogrenci-\d{2,4}$/i;
const PASSWORD_PATTERN = /^DEMO-[A-Z0-9-]{4,24}$/i;

function isInstructor(request: Request) {
  const expectedPin = process.env.SIMULATION_INSTRUCTOR_PIN ?? "2468";
  return request.headers.get("x-instructor-pin") === expectedPin;
}

export async function GET(request: Request) {
  if (!isInstructor(request)) {
    return Response.json({ error: "Eğitmen PIN'i hatalı." }, { status: 401 });
  }

  return Response.json({ attempts: listSimulationAttempts() });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const { username, demoPassword } = body as Record<string, unknown>;

  if (
    typeof username !== "string" ||
    typeof demoPassword !== "string" ||
    !USERNAME_PATTERN.test(username) ||
    !PASSWORD_PATTERN.test(demoPassword)
  ) {
    return Response.json(
      {
        error:
          "Yalnızca size verilen ogrenci-XX kullanıcı kodunu ve DEMO- ile başlayan simülasyon parolasını kullanın.",
      },
      { status: 400 },
    );
  }

  const attempt = addSimulationAttempt(username.toLowerCase(), demoPassword.toUpperCase());
  return Response.json({ attempt }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!isInstructor(request)) {
    return Response.json({ error: "Eğitmen PIN'i hatalı." }, { status: 401 });
  }

  clearSimulationAttempts();
  return Response.json({ ok: true });
}
