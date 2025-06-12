module.exports = {
  // Define o parser para o ESLint entender TypeScript
  parser: "@typescript-eslint/parser",

  parserOptions: {
    project: "tsconfig.json", // Caminho para o tsconfig do projeto
    tsconfigRootDir: __dirname, // Define a raiz do projeto como diretório base do tsconfig
    sourceType: "module", // Usa o sistema de módulos ES (import/export)
  },

  // Plugins utilizados para extender as regras do ESLint
  plugins: ["@typescript-eslint/eslint-plugin"],

  // Conjuntos de regras que estão sendo estendidos
  extends: [
    "plugin:@typescript-eslint/recommended", // Regras recomendadas para TypeScript
    "plugin:prettier/recommended", // Integra ESLint com Prettier (Prettier como verificador de formatação)
  ],

  root: true, // Indica que esse é o arquivo de configuração raiz (impede herança de configurações superiores)

  env: {
    node: true, // Ativa variáveis globais do Node.js
    jest: true, // Ativa variáveis globais do Jest (testes)
  },

  ignorePatterns: [".eslintrc.js"], // Ignora esse próprio arquivo nas verificações

  rules: {
    // Define regras específicas que sobrescrevem as regras herdadas

    semi: ["error", "always"], // Exige ponto e vírgula ao final das linhas

    "@typescript-eslint/no-explicit-any": "off", // Permite o uso de "any" (não recomendado, mas pode ser útil em alguns casos)

    "@typescript-eslint/explicit-function-return-type": "error", // Exige declaração explícita do tipo de retorno das funções

    "@typescript-eslint/explicit-module-boundary-types": "error", // Exige tipo explícito para funções exportadas (interfaces públicas)

    "@typescript-eslint/naming-convention": [
      "error",
      {
        selector: "interface", // Aplica a regra a interfaces
        format: ["PascalCase"], // Usa PascalCase (ex: IClientData)
        prefix: ["i"], // Interfaces devem começar com "i"
      },
      {
        selector: "typeAlias", // Aplica a regra a type aliases
        format: ["PascalCase"], // Usa PascalCase (ex: TUserPayload)
        prefix: ["t"], // Tipos devem começar com "t"
      },
    ],

    "@typescript-eslint/no-unused-vars": [
      "warn", // Emite um aviso para variáveis não utilizadas
      {
        argsIgnorePattern: "^_", // Ignora argumentos iniciados com "_"
        varsIgnorePattern: "^_", // Ignora variáveis iniciadas com "_"
      },
    ],

    "@typescript-eslint/interface-name-prefix": "off", // Desativa regra obsoleta (usada em versões antigas do TypeScript)
  },
};
