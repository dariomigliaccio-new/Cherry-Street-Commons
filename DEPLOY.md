# Guia de Deploy — Cherry Street Commons

## 1. Configurar o VPS Hostinger

### Requisitos no servidor
```bash
# Instalar Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2 globalmente
sudo npm install -g pm2

# Instalar Git
sudo apt-get install -y git
```

### Clonar o repositório no VPS
```bash
cd /var/www
sudo git clone https://github.com/dariomigliaccio-new/Cherry-Street-Commons.git cherry-street-commons
cd cherry-street-commons
```

### Criar o arquivo .env no VPS
```bash
cat > .env.local << 'EOF'
DATABASE_URL="file:./prisma/data.db"
NEXTAUTH_URL="https://SEU_DOMINIO_OU_IP"
NEXTAUTH_SECRET="GERE_UMA_CHAVE_FORTE_AQUI"
ADMIN_EMAIL="dariomigliaccio@gmail.com"
ADMIN_PASSWORD="@Eleicha1963"
EOF
```

### Instalar dependências e inicializar o banco
```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm run db:seed
npm run build
```

### Iniciar com PM2
```bash
pm2 start npm --name "cherry-street-commons" -- start
pm2 save
pm2 startup  # seguir as instruções exibidas
```

---

## 2. Configurar GitHub Actions Secrets

Acesse: https://github.com/dariomigliaccio-new/Cherry-Street-Commons/settings/secrets/actions

Adicione os seguintes secrets:

| Secret         | Valor                          |
|---------------|-------------------------------|
| `VPS_HOST`     | IP do seu VPS Hostinger        |
| `VPS_USER`     | Usuário SSH (geralmente `root`) |
| `VPS_SSH_KEY`  | Chave SSH privada              |
| `VPS_PORT`     | Porta SSH (padrão: `22`)       |
| `NEXTAUTH_URL` | `https://seu-dominio.com`      |
| `DATABASE_URL` | `file:./prisma/data.db`        |
| `NEXTAUTH_SECRET` | Chave secreta gerada          |

### Gerar chave SSH (no seu Mac)
```bash
ssh-keygen -t ed25519 -C "deploy@cherry-street-commons" -f ~/.ssh/cherry_deploy
# Copie a chave pública para o VPS:
ssh-copy-id -i ~/.ssh/cherry_deploy.pub root@SEU_IP_VPS
# Adicione a chave PRIVADA no secret VPS_SSH_KEY do GitHub
cat ~/.ssh/cherry_deploy
```

---

## 3. Acesso ao Admin

- **URL:** `https://seu-dominio.com/admin`
- **Email:** `dariomigliaccio@gmail.com`
- **Senha:** definida no .env.local do servidor

---

## 4. Deploy Automático

Após configurar tudo, qualquer push para a branch `main` vai:
1. Fazer build do projeto
2. Conectar via SSH no VPS
3. Fazer git pull + build + migrate + restart PM2

```bash
git add .
git commit -m "atualização"
git push  # dispara o deploy automático!
```
