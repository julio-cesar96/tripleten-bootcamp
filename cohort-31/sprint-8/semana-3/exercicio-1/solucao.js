function validatePassword(password) {
    // processamento
    const hasEightCharacters = password.length >= 8;
    const hasNumber = /[0-9]/.test(password);
    const hasUpperCaseLetter = /[A-Z]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);


    const points = [hasEightCharacters, hasNumber, hasUpperCaseLetter, hasSpecialCharacter].filter(Boolean).length;

    console.log(points);

    const strength = points === 4 ? 'Forte'
        : points >= 2 ? "Média"
        : "Fraca";
    
    // retorno
    return { hasEightCharacters, hasNumber, hasUpperCaseLetter, hasSpecialCharacter, strength };

    
}

