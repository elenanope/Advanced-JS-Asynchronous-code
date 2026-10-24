//1
async function getAllBreeds() {
    try {
        let response = await fetch(
            `https://dog.ceo/api/breeds/list/all`
        );
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const breeds = await response.json();
        return Object.keys(breeds.message);
    } catch (error) {
        console.error("No se pudo obtener la lista:", error.message);
    }
}

//2
async function getRandomDog() {
    try {
        let response = await fetch(
            `https://dog.ceo/api/breeds/image/random`
        );
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const randomDog = await response.json();
        return randomDog.message;
    } catch (error) {
        console.error("No se pudo obtener la imagen:", error.message);
    }
}

//3
async function getAllImagesByBreed() {
    try {
        let response = await fetch(
            `https://dog.ceo/api/breed/komondor/images`
        );
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const allKomondorDogs = await response.json();
        return allKomondorDogs.message;
    } catch (error) {
        console.error("No se pudo obtener la lista:", error.message);
    }
}

//4
async function getAllImagesByBreed2(breed) {
    try {
        let response = await fetch(
            `https://dog.ceo/api/breed/${breed}/images`
        );
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const allDogsFromBreed = await response.json();
        return allDogsFromBreed.message;
    } catch (error) {
        console.error("No se pudo obtener la lista:", error.message);
    }
}

//5
async function getGitHubUserProfile(username) {
    try {
        let response = await fetch(
            `https://api.github.com/users/${username}`
        );
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const gitHubProfile = await response.json();
        return gitHubProfile;
    } catch (error) {
        console.error("No se pudo obtener el perfil:", error.message);
    }
}

//6
async function printGithubUserProfile(username) {
    let profileData = await getGitHubUserProfile(username);
    if (!profileData) return;
    const img = profileData.avatar_url;
    const name = profileData.name || profileData.login;
    const printedProfile = document.createElement("section");
    printedProfile.innerHTML =
        `<img src="${img}" alt="${name}">
        <h1>${name}</h1>`;
    document.body.append(printedProfile);
    return { img, name };
}

//7
async function getAndPrintGitHubUserProfile(username) {
        const gitHubProfile = await getGitHubUserProfile(username);
        if(!gitHubProfile) return;

        const img = gitHubProfile.avatar_url;
        const name = gitHubProfile.name || gitHubProfile.login;
        return `<section>
        <img src="${img}" alt="${name}">
        <h1>${name}</h1>
        <p>Public repos: ${gitHubProfile.public_repos}</p>
        </section>`;
}

//8
function addSearchElements() {
    const inputGitHub = document.createElement('input');
    inputGitHub.type = "text";
    inputGitHub.placeholder = "escribe tu username en GitHub";
    inputGitHub.style.width = "12rem";
    document.body.append(inputGitHub);

    const inputButton = document.createElement('input');
    inputButton.type = "button";
    inputButton.value = "Buscar";
    inputButton.style.marginInline = "1rem";
    document.body.append(inputButton);

    inputButton.addEventListener("click", async () => {
        if (!inputGitHub.value) return;
        document.body.insertAdjacentHTML("beforeend", await getAndPrintGitHubUserProfile(inputGitHub.value));
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addSearchElements();
});

//9
async function fetchGithubUsers(userNames) {
    try {
        const responses = await Promise.all(
            userNames.map(name => fetch(`https://api.github.com/users/${name}`))
        );
        for (const response of responses) {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
        }

        const gitHubUsers = await Promise.all(responses.map(response => response.json()));
        gitHubUsers.forEach(user => console.log(`username y url: `, user.name || user.login, user.html_url));
        return gitHubUsers;
    } catch (error) {
        console.error("No se pudo obtener la lista:", error.message);
    }
}