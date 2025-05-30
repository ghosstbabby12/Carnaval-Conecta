export const API_URL = 'http://localhost:9090/api/eventos';

export const getEventos = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const addEvento = async (evento: any) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento),
  });
  return res.json();
};
