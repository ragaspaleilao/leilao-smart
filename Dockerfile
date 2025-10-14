# Etapa 1: escolher a imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copiar os arquivos do backend
COPY leilao-smart-updated/leilao-smart/backend ./backend

# Entrar na pasta backend
WORKDIR /app/backend

# Instalar dependências
RUN npm install

# Expor porta padrão
EXPOSE 8080

# Rodar o servidor
CMD ["npm", "start"]
