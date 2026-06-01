// lib/metrics.ts

const API_BASE_URL = "https://greencodeapi-production.up.railway.app/api/plantas";

/**
 * Incrementa o contador de visualizações de uma planta específica.
 */
export async function incrementViews(plantId: string | number): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/${plantId}/visualizacoes`, {
      method: "PATCH",
      headers: { "Accept": "*/*" }
    });
  } catch (error) {
    console.error("Erro ao incrementar visualizações:", error);
  }
}

/**
 * Registra o intervalo de tempo de leitura usando keepalive para evitar travamento (Timeout).
 */
export async function registerPlantReading(
  plantId: string | number,
  usuarioId: number,
  inicio: string,
  fim: string
): Promise<void> {
  try {
    const inicioFormatado = inicio.replace("Z", "");
    const fimFormatado = fim.replace("Z", "");

    const urlWithParams = `${API_BASE_URL}/${plantId}/leitura?usuarioId=${usuarioId}&inicio=${encodeURIComponent(inicioFormatado)}&fim=${encodeURIComponent(fimFormatado)}`;

    // O 'keepalive: true' permite que a requisição continue rodando em segundo plano
    // mesmo que o usuário saia da página ou feche a aba, sem travar o Next.js
    fetch(urlWithParams, {
      method: "POST",
      headers: { "Accept": "*/*" },
      keepalive: true 
    }).then((response) => {
      if (response.ok) {
        console.log("Leitura registrada com sucesso no Back-end!");
        // Dispara o cálculo da média de forma independente, sem encadear travas
        fetch(`${API_BASE_URL}/${plantId}/tempo-leitura`, { 
          method: "PATCH", 
          headers: { "Accept": "*/*" } 
        }).catch(err => console.error("Erro ao computar média de tempo:", err));
      }
    }).catch(err => console.error("Erro na requisição de leitura:", err));

  } catch (error) {
    console.error("Erro interno no script de métricas:", error);
  }
}