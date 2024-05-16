document.getElementById('cv-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const profession = document.getElementById('profession').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const summary = document.getElementById('summary').value;

    const profilePictureFile = document.getElementById('profile-picture').files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const profilePicture = reader.result;

        const educationElements = document.querySelectorAll('.education-entry');
        const education = [];
        educationElements.forEach(entry => {
            education.push({
                degree: entry.querySelector('.degree').value,
                school: entry.querySelector('.school').value,
                year: entry.querySelector('.year').value
            });
        });

        const experienceElements = document.querySelectorAll('.experience-entry');
        const experience = [];
        experienceElements.forEach(entry => {
            experience.push({
                position: entry.querySelector('.position').value,
                company: entry.querySelector('.company').value,
                duration: entry.querySelector('.duration').value,
            });
        });

        const skills = document.getElementById('skills').value.split(',');

        const languageElements = document.querySelectorAll('.language-entry');
        const languages = [];
        languageElements.forEach(entry => {
            languages.push({
                name: entry.querySelector('.language-name').value,
                proficiency: entry.querySelector('.language-proficiency').value
            });
        });

        const projectElements = document.querySelectorAll('.project-entry');
        const projects = [];
        projectElements.forEach(entry => {
            projects.push({
                name: entry.querySelector('.project-name').value,
                description: entry.querySelector('.project-description').value
            });
        });

        const cvData = {
            name,
            profession,
            email,
            phone,
            address,
            summary,
            profilePicture,
            education,
            experience,
            skills,
            languages,
            projects
        };

        localStorage.setItem('cvData', JSON.stringify(cvData));
        window.location.href = 'Display_Cv.html';
    };

    if (profilePictureFile) {
        reader.readAsDataURL(profilePictureFile);
    }
});

document.getElementById('add-education').addEventListener('click', function() {
    const educationSection = document.getElementById('education-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry');
    newEntry.innerHTML = `
        <input type="text" placeholder="Degree" name="degree[]" class="degree" required>
        <input type="text" placeholder="School" name="school[]" class="school" required>
        <input type="text" placeholder="Starting Year" name="year[]" class="year" required>
    `;
    educationSection.appendChild(newEntry);
});

document.getElementById('add-experience').addEventListener('click', function() {
    const experienceSection = document.getElementById('experience-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('experience-entry');
    newEntry.innerHTML = `
        <input type="text" placeholder="Position" name="position[]" class="position" required>
        <input type="text" placeholder="Company" name="company[]" class="company" required>
        <input type="text" placeholder="Duration" name="duration[]" class="duration" required>
    `;
    experienceSection.appendChild(newEntry);
});

document.getElementById('add-language').addEventListener('click', function() {
    const languagesSection = document.getElementById('languages-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('language-entry');
    newEntry.innerHTML = `
        <input type="text" placeholder="Language" name="language[]" class="language-name" required>
        <input type="number" placeholder="Proficiency (%)" name="proficiency[]" class="language-proficiency" required>
    `;
    languagesSection.appendChild(newEntry);
});

document.getElementById('add-project').addEventListener('click', function() {
    const projectSection = document.getElementById('project-section');
    const newEntry = document.createElement('div');
    newEntry.classList.add('project-entry');
    newEntry.innerHTML = `
        <input type="text" placeholder="Project Name" name="project-name[]" class="project-name" required>
        <textarea placeholder="Project Description" name="project-description[]" class="project-description" required></textarea>
    `;
    projectSection.appendChild(newEntry);
});
