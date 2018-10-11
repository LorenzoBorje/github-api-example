'use strict'

function displayResults(response) {
    $('.search-results').empty();
    console.log("Displaying results")
    response.forEach(repo => {
        $('.search-results').append(`<li><a href="${repo.svn_url}">${repo.name}</a></li>`)
    });

}

function getRepositories(handle) {
    const url = `https://api.github.com/users/${handle}/repos`;
    console.log("Fetching user repositories")
    fetch(url)
        .then(response => {
            if (response.ok) {
                console.log("GET successful")
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert(`Error! User ${error.message}`));
}

function watchForm() {
    $('form').submit(event => {
        const handle = $('#handle').val();
        event.preventDefault();
        getRepositories(handle);
    })
}

$(watchForm);