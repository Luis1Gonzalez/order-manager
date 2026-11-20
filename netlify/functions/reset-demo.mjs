// Función programada de Netlify: restablece los datos de la demo cada noche (04:00 UTC).
// Llama a la ruta /api/demo/reset de la propia app con un secreto compartido.
export default async () => {
  const res = await fetch(`${process.env.URL}/api/demo/reset`, {
    method: "POST",
    headers: { authorization: `Bearer ${process.env.DEMO_RESET_SECRET}` },
  });
  console.log("Reset demo:", res.status, await res.text());
};

export const config = { schedule: "0 4 * * *" };
