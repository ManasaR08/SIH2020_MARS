from serpapi.google_search_results import GoogleSearchResults

params = {
    "q": "Coffee",
    "hl": "en",
    "gl": "us",
    "google_domain": "google.com",
    "api_key": "872d5dde1c1b4ad04b1b288b3cc26683597993dd25a9eff1777c5c20a52b7d50"
}

client = GoogleSearchResults(params)
results = client.get_dict()

print(results)