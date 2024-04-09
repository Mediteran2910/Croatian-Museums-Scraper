const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const XLSX = require('xlsx');

const baseURL = 'https://hvm.mdc.hr';

axios(`${baseURL}/?view=alphabet`)
    .then(async res => {
        const html = res.data;
        const $ = cheerio.load(html);
        const museums = [];

        $('h2.museo.no-border a').each(function() {
            let path = $(this).attr('href');
            museums.push({ url: `${baseURL}${path}` });
        });

        console.log("Processing museums...");

        const data = [];

        for (const museum of museums) {
            try {
                const response = await axios(museum.url);
                const museumHTML = response.data;
                const $ = cheerio.load(museumHTML);
                
                const name = $('h1 a').text().trim();

            
                const museumText = $('.top-right-column').text().trim();
                const phonePattern = /T\s([^T\s][^\s]*)/; 
                const emailPattern = /E\s*([^E\s][^@\s]+@[^.\s]+\.[^\s]+)/; 
                const phoneMatch = museumText.match(phonePattern);
                const emailMatch = museumText.match(emailPattern);
                const phone = phoneMatch ? phoneMatch[1].trim() : 'Not available';
                const email = emailMatch ? emailMatch[1].trim() : 'Not available';
                
                data.push([name, email, phone]);
            } catch (error) {
                console.error(`Error fetching text for ${museum.url}:`, error);
            }
        }

        console.log("Museum processing complete.");

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet([['Museum Name', 'Museum Email', 'Museum Telephone'], ...data]);

        XLSX.utils.book_append_sheet(wb, ws, 'Museums');

        XLSX.writeFile(wb, 'museums.xlsx');

        console.log("Excel file generated successfully!");
    })
    .catch(err => console.log(err));

app.listen('8080', () => {
    console.log('SERVING ON 8080');
});