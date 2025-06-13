window.onload = function(){


const token = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNGI5MWQ5NmVlYmMwZDY2ZDAyNDczNTYxMzU5ZjQ1OCIsIm5iZiI6MTc0OTgyMjQyMS40MjIwMDAyLCJzdWIiOiI2ODRjMmJkNTgwYWQzMDExOTYyOTQ0NWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.5zx6N0CQOK5y3yC7WfXkAH6hPAvfkWXAbXegYtNQpRo";

const movieInput = document.getElementById("movie-input");
const container = document.querySelector(".container");
const btnSearch=document.querySelector("#search-btn");
let listaMovies = [];
container.style.display = "none";
const buscarMovie = () => {
    const nameMovie = movieInput.value.trim();
    
    if (nameMovie === "") {
        container.style.display = "block";
        container.innerHTML = `<p style="color: red;">Ingresa una palabra</p>`;
        return;
    }
    const url = `https://api.themoviedb.org/3/search/movie?query=${(nameMovie)}`;
    fetch(url,{
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json;charset=utf-8"
    }
    })
    .then(response => {
        
        return response.json();
    })
    .then(data => {
        if (data.results.length === 0) {
            throw new Error("Resultado no encontrado");
        }

        listaMovies = data.results;
        showMovie(listaMovies);
        
    })
    .catch(error => {
        container.innerHTML=`<p>${error.message}</p>`;
    });
};
    

    function showMovie(listaMovies){
        container.style.display = "block";
        container.innerHTML = "";

        listaMovies.forEach(nameMovie => {
        const movieDiv = document.createElement("div");
        movieDiv.classList.add("nameMovie-item");

        const img = document.createElement("img");
        if (nameMovie.poster_path) {

        img.src = `https://image.tmdb.org/t/p/w500${nameMovie.poster_path}`;

        img.alt = nameMovie.title;

        img.addEventListener("click", () => {
                mostrarDetalles(nameMovie);
            });

        movieDiv.appendChild(img);
        container.appendChild(movieDiv);



        }
    });
}

    function mostrarDetalles(nameMovie) {
    container.innerHTML = "";

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("InfoMovie-item");

    infoDiv.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w300${nameMovie.poster_path}" alt="${nameMovie.title}">
        <h2>${nameMovie.title}</h2>
        <p><strong>Título original:</strong> ${nameMovie.original_title}</p>
        <p><strong>Idioma original:</strong> ${nameMovie.original_language}</p>
        <p><strong>Sinopsis:</strong> ${nameMovie.overview}</p>
        <p><strong>Fecha:</strong> ${nameMovie.release_date}</p>
        <p><strong>Votos:</strong> ${nameMovie.vote_average}</p>
        <p><strong>Popularidad:</strong> ${nameMovie.popularity}</p>
        <button id="btn-volver">Volver</button>
    `;

    container.appendChild(infoDiv);

    
}


btnSearch.addEventListener("click",buscarMovie);

movieInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
    buscarMovie();
    }
});
}
