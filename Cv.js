document.addEventListener('DOMContentLoaded', function() {
    const cvData = JSON.parse(localStorage.getItem('cvData'));

    if (!cvData) {
        document.getElementById('cv-output-left').innerHTML = '<p>No CV data found. Please go back and generate your CV.</p>';
        return;
    }

    const { name, profession, email, phone, address, profilePicture, education, experience, skills, languages, summary, projects } = cvData;

    let leftColumnOutput = `
        <h2>${name}</h2>
        <p><b>Profession:</b> ${profession}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Address:</b> ${address}</p>
        <hr>
        <h3>Summary</h3>
        <p>${summary}</p>
        <hr>
        <h3>Education</h3>
        <ul>
    `;
    education.forEach(edu => {
        leftColumnOutput += `<li>${edu.degree} at ${edu.school} Started in ${edu.year}</li>`;
    });
    leftColumnOutput += `</ul><hr>`;

    leftColumnOutput += `<h3>Experience</h3><ul>`;
    experience.forEach(exp => {
        leftColumnOutput += `<li>${exp.position} at ${exp.company} For ${exp.duration}</li>`;
    });
    leftColumnOutput += `</ul><hr>`;

    leftColumnOutput += `<h3>Projects</h3><ul>`;
    projects.forEach(project => {
        leftColumnOutput += `<li><b>${project.name}</b>: ${project.description}</li>`;
    });
    leftColumnOutput += `</ul>`;

    document.getElementById('cv-output-left').innerHTML = leftColumnOutput;

    let rightColumnOutput = `
        ${profilePicture ? `<img src="${profilePicture}" alt="Profile Picture" class="profile-picture">` : ''}
        <h3>Skills</h3><ul>`;
    skills.forEach(skill => {
        rightColumnOutput += `<li>${skill.trim()}</li>`;
    });
    rightColumnOutput += `</ul><hr>`;

    rightColumnOutput += `
        <h3>Programming Languages</h3>
        ${languages.map(lang => `
            <div class="progress-container">
                <p class="language">${lang.name}</p>
                <div class="progress">
                    <div class="progress-bar" style="width: ${lang.proficiency}%;"></div>
                </div>
            </div>
        `).join('')}
        `;

    document.getElementById('cv-output-right').innerHTML = rightColumnOutput;

    document.getElementById('download-pdf').addEventListener('click', function() {
        const element = document.querySelector('.cv-layout');
        const opt = {
            margin: 0.5,
            filename: `${name}_CV.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        html2pdf().from(element).set(opt).save();
    });
});
