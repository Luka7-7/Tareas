const STATUS = document.querySelector("#status")
async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholer.typicode.com/posts');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const posts = await response.json();
        displayPosts(posts.slice(0, 5)); // Mostrar solo 5 posts 
    } catch (error) {
        STATUS.textContent=`Error: ${error} `
        //console.error('Error:', error);
    }
}
function displayPosts(posts) {
    const container = document.getElementById('posts');
    container.innerHTML = posts
        .map(post => `<div><h3>${post.title}</h3><p>${post.body}</p></div>`)
        .join('');
}

fetchPosts();
// 4. Función de login 
async function loginUser(email, password) {
    if(email!==null && password !==null){
    try {
        const response = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        return data.token; // Retorna el token JWT 
    } catch (error) {
        console.error('Login fallido:', error);
    }}
    else{
        STATUS.textContent=`Datos vacios, favor de llenar datos`
    }
}
async function main() {
    const token = await loginUser('eve.holt@reqres.in', 'cityslicka'); // Credenciales de prueba
    if (token) {
        console.log('Token JWT:', token);
        // ¡Ahora puedes usar este token en otras peticiones! 
    }
}
main();
// 6. Función para obtener datos protegidos con JWT
async function fetchProtectedData(token) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1', {
            headers: { 'Authorization': `Bearer ${token}` }, // Simulación 
        });
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const user = await response.json();
        console.log('Usuario protegido:', user);
    } catch (error) {
        console.error('Error al obtener datos protegidos:', error);
    }
}
// Modificar la función main para incluir esto: 
async function main() {
    const token = await loginUser('eve.holt@reqres.in', 'cityslicka');
    if (token) {
        await fetchProtectedData(token); // Usar el token 
    }
}
