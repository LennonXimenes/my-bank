var UserValidator = /** @class */ (function () {
    function UserValidator() {
    }
    UserValidator.prototype.validateBirthDate = function (birth_date) {
        if (!(birth_date instanceof Date)) {
            throw new Error("Invalid birth date format");
        }
        var today = new Date();
        if (birth_date > today) {
            throw new Error("Birth date cannot be in the future");
        }
        var minAgeDate = new Date();
        minAgeDate.setFullYear(today.getFullYear() - 18);
        if (birth_date > minAgeDate) {
            throw new Error("User must be at least 18 years old");
        }
        console.log("Data válida:", birth_date.toISOString());
    };
    return UserValidator;
}());
// Criando instância e testando
var validator = new UserValidator();
try {
    // ✅ Teste com uma data válida (com mais de 18 anos)
    validator["validateBirthDate"](new Date("2000-05-09"));
    // ❌ Teste com data no futuro
    validator["validateBirthDate"](new Date("2050-01-01"));
    // ❌ Teste com menor de 18 anos
    validator["validateBirthDate"](new Date("2010-01-01"));
}
catch (error) {
    console.error("Erro:", error.message);
}
