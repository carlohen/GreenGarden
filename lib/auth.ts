export interface DecodedToken {
  sub?: string; // Geralmente a matrícula ou nome de usuário
  role?: string; // Role do usuário (ex: ADMIN, ALUNO)
  exp?: number;  // Timestamp de expiração
  [key: string]: any;
}

export interface AuthState {
  token: string | null;
  matricula: string | null;
  role: string | null;
}

const API_BASE_URL = "https://greencodeapi-production.up.railway.app";

/**
 * Decodifica um token JWT no client-side com segurança
 */
export function decodeToken(token: string): DecodedToken | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Erro ao decodificar JWT:", e);
    return null;
  }
}

/**
 * Realiza a requisição de login à API do Greencode
 */
export async function loginUser(matricula: string, senha: string): Promise<string> {
  // Bypass local para usuário ADMIN de testes
  if (matricula === "9999" && senha === "admin123") {
    return "mocked-jwt-token-admin";
  }

  const response = await fetch(`${API_BASE_URL}/api/usuarios/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    body: JSON.stringify({ matricula, senha })
  });

  if (!response.ok) {
    let errorMessage = "Matrícula ou senha incorretos.";
    try {
      const text = await response.text();
      if (text) errorMessage = text;
    } catch (e) {
      // Ignorar erros de leitura de texto
    }
    throw new Error(errorMessage);
  }

  // A API retorna o token JWT como uma String pura no corpo da resposta
  const token = await response.text();
  return token;
}

/**
 * Salva os dados de autenticação no localStorage
 */
export function saveAuth(token: string, fallbackMatricula?: string): AuthState {
  if (typeof window === "undefined") {
    return { token: null, matricula: null, role: null };
  }

  localStorage.setItem("greencode_token", token);
  
  let matricula = fallbackMatricula || "Usuário";
  let role = "ALUNO";

  if (token === "mocked-jwt-token-admin") {
    matricula = "9999";
    role = "ADMIN";
  } else {
    const decoded = decodeToken(token);
    // Extrai matrícula e role do token, caindo de volta nos parâmetros se necessário
    matricula = decoded?.sub || decoded?.matricula || fallbackMatricula || "Usuário";
    role = decoded?.role || decoded?.roles?.[0] || "ALUNO"; // Padrão seguro
  }
  
  localStorage.setItem("greencode_matricula", matricula);
  localStorage.setItem("greencode_role", role);

  return { token, matricula, role };
}

/**
 * Recupera os dados de autenticação armazenados
 */
export function getAuth(): AuthState {
  if (typeof window === "undefined") {
    return { token: null, matricula: null, role: null };
  }

  const token = localStorage.getItem("greencode_token");
  const matricula = localStorage.getItem("greencode_matricula");
  const role = localStorage.getItem("greencode_role");

  if (!token) {
    return { token: null, matricula: null, role: null };
  }

  // Verifica se o token expirou (caso possua claim exp)
  const decoded = decodeToken(token);
  if (decoded?.exp) {
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp < currentTime) {
      logoutUser(); // Token expirado, faz logout automático
      return { token: null, matricula: null, role: null };
    }
  }

  return { token, matricula, role };
}

/**
 * Remove todos os dados de autenticação do localStorage
 */
export function logoutUser(): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem("greencode_token");
  localStorage.removeItem("greencode_matricula");
  localStorage.removeItem("greencode_role");
}

/**
 * Realiza a requisição de cadastro de usuário à API do Greencode
 */
export async function registerUser(matricula: string, senha: string, role: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/usuarios`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    body: JSON.stringify({ matricula, senha, role })
  });

  if (!response.ok) {
    let errorMessage = "Erro ao cadastrar usuário.";
    try {
      const text = await response.text();
      if (text) {
        try {
          const parsed = JSON.parse(text);
          if (parsed.message) {
            errorMessage = parsed.message;
          } else {
            errorMessage = text;
          }
        } catch {
          errorMessage = text;
        }
      }
    } catch (e) {
      // Ignorar erros de decodificação
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Exclui um usuário (Apenas Admin)
 */
export async function deleteUser(id: number, token: string): Promise<boolean> {
  const response = await fetch(`${API_BASE_URL}/api/usuarios/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "*/*"
    }
  });

  if (!response.ok) {
    let errorMessage = "Erro ao excluir usuário.";
    try {
      const text = await response.text();
      if (text) errorMessage = text;
    } catch {}
    throw new Error(errorMessage);
  }

  return true;
}

/**
 * Atualiza um usuário (Apenas Admin pode alterar roles de terceiros)
 */
export async function updateUser(
  id: number,
  roleSolicitante: string,
  matricula: string,
  senhaAtiva: string,
  novaRole: string,
  token: string
): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/api/usuarios/${id}?roleSolicitante=${roleSolicitante}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "Accept": "*/*"
    },
    body: JSON.stringify({
      matricula,
      senha: senhaAtiva, // Requer a senha ativa ou nova
      role: novaRole
    })
  });

  if (!response.ok) {
    let errorMessage = "Erro ao atualizar usuário.";
    try {
      const text = await response.text();
      if (text) errorMessage = text;
    } catch {}
    throw new Error(errorMessage);
  }

  return response.json();
}
