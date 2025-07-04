const express = require('express');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const port = 3000;

// Configurações do Metabase
const METABASE_SITE_URL = "https://metabase.skyinformatica.com.br";
const METABASE_SECRET_KEY = "0ea69615468a2ff4859d94bb587f94850e8bf2277c2c0b7bb502a7070bbfb337";

// Rota principal
app.get('/', (req, res) => {
    // Gerando o token JWT
    const payload = {
        resource: { dashboard: 14 },
        params: {
            "versao": []
        },
        exp: Math.round(Date.now() / 1000) + (10 * 60) // 10 minutos de expiração
    };

    const token = jwt.sign(payload, METABASE_SECRET_KEY);
    const iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#background=false&bordered=false&titled=false";

    // Renderiza a página HTML com o iframe
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para obter a URL do iframe (será usada pelo frontend)
app.get('/iframe-url', (req, res) => {
    const payload = {
        resource: { dashboard: 14 },
        params: {
            "versao": ["2020.07.01"]
        },
        exp: Math.round(Date.now() / 1000) + (10 * 60)
    };

    const token = jwt.sign(payload, METABASE_SECRET_KEY);
    const iframeUrl = METABASE_SITE_URL + "/embed/dashboard/" + token + "#background=false&bordered=false&titled=true";;

    res.json({ iframeUrl });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});