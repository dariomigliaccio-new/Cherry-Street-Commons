#!/bin/bash
# Cherry Street Commons — Setup VPS Hostinger
# Rode como root: bash server-setup.sh

set -e

DOMAIN="1244cherry.com"
APP_DIR="/var/www/cherry-street-commons"
REPO="https://github.com/dariomigliaccio-new/Cherry-Street-Commons.git"
NODE_VERSION="20"

echo "🚀 Iniciando setup do servidor para $DOMAIN..."

# ── 1. Atualizar sistema ─────────────────────────────────────────
apt-get update -y && apt-get upgrade -y

# ── 2. Instalar Node.js 20 ───────────────────────────────────────
curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
apt-get install -y nodejs

# ── 3. Instalar ferramentas ──────────────────────────────────────
apt-get install -y git nginx certbot python3-certbot-nginx ufw

# ── 4. PM2 global ───────────────────────────────────────────────
npm install -g pm2

# ── 5. Clonar repositório ────────────────────────────────────────
mkdir -p $APP_DIR
if [ -d "$APP_DIR/.git" ]; then
  cd $APP_DIR && git pull origin main
else
  git clone $REPO $APP_DIR
  cd $APP_DIR
fi

# ── 6. Criar .env.local ─────────────────────────────────────────
cat > $APP_DIR/.env.local << 'ENVEOF'
DATABASE_URL="file:./prisma/data.db"
NEXTAUTH_URL="https://1244cherry.com"
NEXTAUTH_SECRET="SUBSTITUA_POR_UMA_CHAVE_FORTE_AQUI"
ADMIN_EMAIL="dariomigliaccio@gmail.com"
ADMIN_PASSWORD="@Eleicha1963"
ENVEOF

echo "⚠️  Edite $APP_DIR/.env.local e coloque um NEXTAUTH_SECRET forte!"
echo "   Gere um com: openssl rand -base64 32"

# ── 7. Instalar dependências e build ─────────────────────────────
cd $APP_DIR
npm install
npx prisma generate
DATABASE_URL="file:./prisma/data.db" npx prisma migrate deploy
DATABASE_URL="file:./prisma/data.db" ADMIN_EMAIL="dariomigliaccio@gmail.com" ADMIN_PASSWORD="@Eleicha1963" npx tsx prisma/seed.ts
npm run build

# ── 8. PM2 ──────────────────────────────────────────────────────
pm2 delete cherry-street-commons 2>/dev/null || true
pm2 start npm --name "cherry-street-commons" -- start -- -p 3000
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash

# ── 9. Nginx ────────────────────────────────────────────────────
cat > /etc/nginx/sites-available/cherry-street-commons << 'NGINXEOF'
server {
    listen 80;
    server_name 1244cherry.com www.1244cherry.com;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";

    # Uploads estáticos com cache longo
    location /uploads/ {
        alias /var/www/cherry-street-commons/public/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Proxy para Next.js
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/cherry-street-commons /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ── 10. Firewall ─────────────────────────────────────────────────
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

# ── 11. SSL (Let's Encrypt) ──────────────────────────────────────
certbot --nginx -d 1244cherry.com -d www.1244cherry.com --non-interactive --agree-tos -m dariomigliaccio@gmail.com

echo ""
echo "✅ Setup concluído!"
echo "   Site: https://1244cherry.com"
echo "   Admin: https://1244cherry.com/admin"
echo "   PM2: pm2 status"
echo "   Logs: pm2 logs cherry-street-commons"
