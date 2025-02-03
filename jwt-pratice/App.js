// 1. Token JWT generado manualmente (simulación)
const JWT_TOKEN = localStorage.getItem('jwt_token') || 'eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoidXN1YXJpb19wcnVlYmEiLCJleHAiOjE3MzU2ODk2MDAsImFsZyI6IkhTMjU2In0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.TfhtEL8GoJ_fFGwsJ9AheG3KKoyvUK5ufBRU3S7MqF4';

// 2. Función para validar el token (simulación)
function validateToken(token) {
    try {
        // Decodificar el token (sin verificar firma)
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp < Math.floor(Date.now() / 1000) + 60) {
            alert("Token expirado. Por favor, genera uno nuevo.");
            return false;
        }
        return true;
    } catch (error) {
        console.error("Token inválido:", error);
        return false;
    }
}

// 3. Función GET con JWT
async function fetchDataWithJWT() {
    if (!validateToken(JWT_TOKEN)) {
        return;
    }
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
            headers: { 'Authorization': `Bearer ${JWT_TOKEN}` }
        });
        const data = await response.json();
        document.getElementById('response').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        console.error("Error GET:", error);
    }
}

// 4. Función POST con JWT
document.getElementById('postForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateToken(JWT_TOKEN)) {
        return;
    }

    const postData = {
        title: document.getElementById('data').value,
        body: 'Contenido de prueba',
        userId: 1
    };

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${JWT_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        document.getElementById('response').innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    } catch (error) {
        console.error("Error POST:", error);
    }
});


