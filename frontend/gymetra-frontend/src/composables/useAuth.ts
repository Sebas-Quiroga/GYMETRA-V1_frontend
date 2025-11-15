// src/composables/useAuth.ts
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { isAuthenticated, getToken, decodeJWT, logout } from '@/services/authService';

export function useAuth() {
  const router = useRouter();
  const isLoading = ref(false);

  // Estado de autenticación reactivo
  const authenticated = computed(() => isAuthenticated());
  const token = computed(() => getToken());

  // Obtener información del usuario desde el token
  const userInfo = computed(() => {
    const currentToken = getToken();
    if (!currentToken) return null;
    
    const decoded = decodeJWT(currentToken);
    if (!decoded) return null;
    
    console.log('🔍 Token decodificado en useAuth:', decoded);
    
    return {
      userId: decoded.userId,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      status: decoded.status,
      roleIds: decoded.roleIds,
      photoUrl: decoded.photoUrl,
      exp: decoded.exp,
      iat: decoded.iat
    };
  });

  // Verificar autenticación y redirigir si es necesario
  const requireAuth = (redirectTo: string = '/login') => {
    if (!isAuthenticated()) {
      console.warn('🔒 Usuario no autenticado, redirigiendo al login');
      router.push(redirectTo);
      return false;
    }
    return true;
  };

  // Manejar logout
  const handleLogout = () => {
    console.log('👋 Cerrando sesión...');
    logout();
  };

  // Verificar si el token está por expirar (opcional)
  const isTokenExpiringSoon = computed(() => {
    const user = userInfo.value;
    if (!user?.exp) return false;
    
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = user.exp - now;
    const fiveMinutes = 5 * 60;
    
    return timeLeft <= fiveMinutes;
  });

  // Obtener headers de autorización para peticiones API
  const getAuthHeaders = () => {
    const currentToken = getToken();
    if (!currentToken) return {};
    
    return {
      'Authorization': `Bearer ${currentToken}`,
      'Content-Type': 'application/json'
    };
  };

  // Hook para inicializar autenticación en componentes
  const initAuth = (options: { requireAuth?: boolean, redirectTo?: string } = {}) => {
    const { requireAuth: needsAuth = false, redirectTo = '/login' } = options;
    
    if (needsAuth && !requireAuth(redirectTo)) {
      return false;
    }
    
    console.log('✅ Usuario autenticado:', userInfo.value?.email || 'Usuario');
    return true;
  };

  return {
    // Estado
    authenticated,
    token,
    userInfo,
    isLoading,
    isTokenExpiringSoon,
    
    // Métodos
    requireAuth,
    handleLogout,
    getAuthHeaders,
    initAuth
  };
}