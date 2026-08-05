import {
  addSimulationAttempt,
  clearSimulationAttempts,
  listSimulationAttempts,
} from "@/lib/simulation-store";

const USERNAME_PATTERN = /^ogrenci-\d{2,4}$/i;
const PASSWORD_PATTERN = /^DEMO-[A-Z0-9-]{4,24}$/i;

// Fixed, instructor-issued credential pair for the "Connect Instagram"
// dashboard flow. Kept as an exact allowlisted pair (not a permissive
// pattern) so the endpoint can never accept/store a real Instagram
// password submitted by mistake — only this pre-arranged training pair.
const CONNECT_FLOW_CREDENTIALS = { username: "ogrenci1", password: "123123" };

function isAllowedSubmission(username: string, demoPassword: string) {
  if (USERNAME_PATTERN.test(username) && PASSWORD_PATTERN.test(demoPassword)) {
    return true;
  }
  return (
    username.toLowerCase() === CONNECT_FLOW_CREDENTIALS.username &&
    demoPassword === CONNECT_FLOW_CREDENTIALS.password
  );
}

function isInstructor(request: Request) {
  const expectedPin = process.env.SIMULATION_INSTRUCTOR_PIN ?? "719284";
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

  const { username, demoPassword, source } = body as Record<string, unknown>;

  if (
    typeof username !== "string" ||
    typeof demoPassword !== "string" ||
    !isAllowedSubmission(username, demoPassword)
  ) {
    return Response.json(
      { error: "Bu bilgiler simülasyonun kabul ettiği eğitim kimlik bilgileriyle eşleşmiyor." },
      { status: 400 },
    );
  }

  const resolvedSource = source === "connect-flow" ? "connect-flow" : "login-page";
  const normalizedPassword = resolvedSource === "connect-flow" ? demoPassword : demoPassword.toUpperCase();
  const attempt = addSimulationAttempt(username.toLowerCase(), normalizedPassword, resolvedSource);
  return Response.json({ attempt }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!isInstructor(request)) {
    return Response.json({ error: "Eğitmen PIN'i hatalı." }, { status: 401 });
  }

  clearSimulationAttempts();
  return Response.json({ ok: true });
}
