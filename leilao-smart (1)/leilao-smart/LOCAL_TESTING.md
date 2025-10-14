# 🧭 Guia de Teste Local — leilao-smart

## 1. Pré-requisitos
Certifique-se de ter instalado:
- Docker e Docker Compose
- Git (opcional, caso queira versionar)
- Node.js 18+ (apenas se quiser rodar fora do container)

## 2. Estrutura do Projeto
```
leilao-smart/
├── backend/
├── scraper-service/
├── nginx/
├── docker-compose.yml
├── .env.example
├── DEPLOY_GUIDE.md
├── README_ADMIN.md
└── LOCAL_TESTING.md
```

## 3. Configurar variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e ajuste se necessário:
```bash
cp .env.example .env
```
Em modo local, o backend acessa o scraper via:
```
SCRAPER_URL=http://scraper-service:4020
```

## 4. Subir o ambiente completo
Dentro da pasta `leilao-smart/`, execute:
```bash
docker compose up --build
```
Após o build, acesse:
```
http://localhost
```
ou diretamente:
```
http://localhost/api/search?estado=SP&cidade=Sao%20Paulo
```

## 5. Testar o scraper isoladamente
```bash
docker compose exec scraper-service npm run dev
```
Ou fora do container:
```bash
cd scraper-service
npm install
node index.js
```
Teste com:
```bash
curl http://localhost:4020/scraper?estado=SP&cidade=Sao%20Paulo
```

## 6. Verificar logs
```bash
docker compose logs -f
docker compose logs backend
docker compose logs scraper-service
```

## 7. Debug rápido (conexão interna)
```bash
docker compose exec backend curl scraper-service:4020/health
```
Deve retornar:
```json
{ "status": "ok" }
```

## 8. Testar API completa
```bash
curl "http://localhost/api/search?estado=SP&cidade=Sao%20Paulo"
```

## 9. Encerrar ambiente
```bash
docker compose down
docker compose down -v
```

## 10. HTTPS local (opcional)
Adicione ao `/etc/hosts`:
```
127.0.0.1   api.leilaosmart.com.br
```
E acesse:
```
https://api.leilaosmart.com.br
```
