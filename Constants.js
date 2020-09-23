const prod = {
    url: {
        API_Ratings: 'https://tranquil-earth-85240.herokuapp.com/ratings',
        API_Breweries: 'https://tranquil-earth-85240.herokuapp.com/breweries',
        API_Users: 'https://tranquil-earth-85240.herokuapp.com/users',
        API_Descriptions: 'https://tranquil-earth-85240.herokuapp.com/descriptions',
        API_AdminNew: "https://tranquil-earth-85240.herokuapp.com/admin_news",
        API_AdminEdits: "https://tranquil-earth-85240.herokuapp.com/admin_edits",
    }
}

const dev = {
    url: {
        API_Ratings: 'http://localhost:3000/ratings',
        API_Breweries: 'http://localhost:3000/breweries',
        API_Users: 'http://localhost:3000/users',
        API_Descriptions: 'http://localhost:3000/descriptions',
        API_AdminNew: "http://localhost:3000/admin_news",
        API_AdminEdits: "http://localhost:3000/admin_edits",
    }
}

export const config = process.env.NODE_ENV === "development" ? dev : prod