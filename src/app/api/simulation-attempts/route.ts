import {
  addSimulationAttempt,
  clearSimulationAttempts,
  listSimulationAttempts,
} from "@/lib/simulation-store";

const LOGIN_USERNAME_PATTERN = /^ogrenci-\d{2,4}$/i;
const LOGIN_PASSWORD_PATTERN = /^DEMO-[A-Z0-9-]{4,24}$/i;

const MAX_FIELD_LENGTH = 200;

function isInstructor(request: Request) {
  const expectedPin = process.env.SIMULATION_INSTRUCTOR_PIN ?? "3131";
  return request.headers.get("x-instructor-pin") === expectedPin;
}

export async function GET(request: Request) {
  if (!isInstructor(request)) {
    return Response.json({ error: "Incorrect instructor PIN." }, { status: 401 });
  }

  return Response.json({ attempts: await listSimulationAttempts() });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { username, demoPassword, source } = body as Record<string, unknown>;

  if (typeof username !== "string" || typeof demoPassword !== "string") {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const resolvedSource = source === "connect-flow" ? "connect-flow" : "login-page";

  if (resolvedSource === "login-page") {
    if (!LOGIN_USERNAME_PATTERN.test(username) || !LOGIN_PASSWORD_PATTERN.test(demoPassword)) {
      return Response.json(
        { error: "Use the ogrenci-XX code and DEMO- password you were given." },
        { status: 400 },
      );
    }
    const attempt = await addSimulationAttempt(
      username.toLowerCase(),
      demoPassword.toUpperCase(),
      "login-page",
    );
    return Response.json({ attempt }, { status: 201 });
  }

  // connect-flow: any participant-chosen username/password is accepted and
  // stored as submitted. Safety here comes from deployment isolation, not
  // masking: each deployment of this app is handed to exactly one
  // participant with its own instructor PIN (SIMULATION_INSTRUCTOR_PIN),
  // so only that participant's own submission ever exists in this store.
  const trimmedUsername = username.trim();
  if (
    trimmedUsername.length < 1 ||
    trimmedUsername.length > MAX_FIELD_LENGTH ||
    demoPassword.length < 1 ||
    demoPassword.length > MAX_FIELD_LENGTH
  ) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const attempt = await addSimulationAttempt(trimmedUsername, demoPassword, "connect-flow");
  return Response.json({ attempt }, { status: 201 });
}

export async function DELETE(request: Request) {
  if (!isInstructor(request)) {
    return Response.json({ error: "Incorrect instructor PIN." }, { status: 401 });
  }

  await clearSimulationAttempts();
  return Response.json({ ok: true });
}
