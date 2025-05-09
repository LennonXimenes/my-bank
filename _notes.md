# ENTITY

Responsável por garantir que o objeto esteja consistente e válido internamente.  
Validações simples e essenciais para o funcionamento do objeto, como formato de e-mail, senha mínima, nome não vazio, etc.
**Exemplo**:

- Verificar se o nome não está vazio.
- Validar formato de e-mail.

---

# VALIDATOR

Responsável por validar regras de negócio externas.  
Faz consultas ao banco e valida regras mais complexas que envolvem dados externos, como verificar se o e-mail já existe ou se a idade do usuário é válida.

**Exemplo**:

- Verificar se o e-mail já está registrado no banco.
- Validar idade mínima do usuário.
