export const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

  // Функция для проверки валидности пароля (например, минимум 6 символов)
export const isValidPassword = (password: string) => {
    return password.length >= 6;
};