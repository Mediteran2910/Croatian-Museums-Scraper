# Croatian-Museums-Scraper

This Node.js script is designed to scrape contact details of museums in Croatia from the official website of the Croatian Museum Documentation Centre (HVM).

## Description

This script utilizes the following libraries:
- `express`: for creating a simple server to host the scraper
- `axios`: for making HTTP requests to fetch HTML content from the website
- `cheerio`: for parsing HTML and extracting data from it
- `XLSX`: for generating an Excel file to store the scraped data

The script performs the following steps:
1. Fetches the list of museums from the HVM website.
2. Scrapes the name, email, and phone number of each museum.
3. Generates an Excel file (`museums.xlsx`) containing the scraped data.

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/croatian-museums-scraper.git
    ```

2. **Install dependencies:**

    ```bash
    cd croatian-museums-scraper
    npm install
    ```

## Usage

To run the scraper, execute the following command:

```bash
node scraper.js
