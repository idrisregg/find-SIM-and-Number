// finding potential phone number ids or classes on the page
const selectors = [
    'a[href^="tel:"] span[data-v-13095103-s]',
    'a[href^="tel:"] span.phone-number',
    'a[href^="tel:"] span.num',
    'span[data-v-13095103-s]',
    'span.phone-number',
    'span.num',
    'div.phone',
    'div.num',
    '#phone',
    '.contact-number'
];

function extractPhoneNumbers() {
    const result = [];
    
    document.querySelectorAll(selectors.join(', ')).forEach(span => {
        const number = span.textContent.trim();
        if (!number) return;
        // Determine SIM type based on the second character
        const secondChar = number.replace(/\s/g, '')[1];
        
        let simType = 'Unknown SIM';
        if (secondChar === '5') simType = 'Ooredoo';
        else if (secondChar === '6') simType = 'Mobilis';
        else if (secondChar === '7') simType = 'Djezzy';
        
        result.push({ phone: number, simType });
    });
    
    return result;
}

// Wait for page to load, then extract and log
window.addEventListener('load', () => {
    setTimeout(() => {
        const phoneNumbers = extractPhoneNumbers();
        console.log('Phone Numbers Found:', phoneNumbers);
        phoneNumbers.forEach(({ phone, simType }) => {
            console.log(`${phone} - ${simType}`);
        });
    }, 1000);
});