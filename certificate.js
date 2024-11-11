// Function to convert month number to month name
function getMonthName(monthNumber) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[monthNumber - 1]; // Adjust for zero-based index
}

// Extract the certificate ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const certificateID = urlParams.get('certificate');

// Replace with your Google Sheets API or Web App URL
const googleSheetURL = `
https://script.google.com/macros/s/AKfycbyxi3AN03bFM2Ixd8EF2cBzTEEixcVxwG8Bp0DRO7cr4vt9gcF5MKwYlS4Rk72y3WI/exec?certificate=${certificateID}`;

// Fetch certificate details from Google Sheets
fetch(googleSheetURL)
  .then(response => response.json())
  .then(data => {
    const recipientNameElement = document.getElementById('recipient-name');
    const issueDateElement = document.getElementById('issue-date');
    const linkedinButton = document.getElementById('linkedin-button');
    const addToLinkedInLink = document.getElementById('add-to-linkedin');
    
    if (data && data.certificate) {
      const { certificateID, firstname, lastname, issuedDate, eventName, theme, status, hashcertificateid } = data.certificate;

      // Populate the certificate details
      recipientNameElement.textContent = `${firstname} ${lastname}`;

      // Extract issue month and year from the date (assume date format is YYYY-MM-DD)
      const [issueYear, issueMonth] = issuedDate.split('-');
      const monthName = getMonthName(parseInt(issueMonth, 10));

      issueDateElement.innerHTML = `<strong>Issue date:</strong> ${monthName} ${issueYear}`;

      // Construct the LinkedIn URL
      const currentUrl = window.location.href;
      const certUrl = encodeURIComponent(`${currentUrl}`);
      const linkedinUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${eventName}&organizationId=2233984&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${certUrl}&certId=${certificateID}`;

      // Update the LinkedIn button URL
      addToLinkedInLink.href = linkedinUrl;

      // Show the LinkedIn button
      linkedinButton.style.display = 'block';
    } else {
      // If no certificate is found, redirect to another website
      // window.location.href = "https://www.appsflyer.com";
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Redirect to another website in case of any error
    // window.location.href = "https://www.appsflyer.com";
  });
