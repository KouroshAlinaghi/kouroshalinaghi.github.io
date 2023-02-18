const render = data => {
    document.getElementById("header-title").innerHTML = data.heading.title;
    document.getElementById("header-description").innerHTML = data.heading.description;

    skillsContainer = document.getElementById("skills-container");

    let i = 0;
    data.skills.forEach(skill => {
        let skill_projects_el = document.createElement("div")
        skill_projects_el.className = "skill-projects";

        skill.skill_projects.forEach(project => {
            let project_el = document.createElementFromString(projectTemplate(project))
            skill_projects_el.appendChild(project_el)
        })

        let skill_el = document.createElement("div");
        skill_el.className = "skill";

        let title_el = document.createElement("h3");
        title_el.className = "skill-title";
        title_el.innerHTML = skill.skill_title;

        let projects_scroll_el = document.createElement("div")
        projects_scroll_el.className = "projects-scroll";

        skill_el.appendChild(title_el)

        projects_scroll_el.appendChild(document.createElementFromString(`<button class="slideLeft scroll" type="button" onclick="slide('left', ${i})"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"><path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z"/></svg></button>`))
        projects_scroll_el.appendChild(skill_projects_el)
        projects_scroll_el.appendChild(document.createElementFromString(`<button class="slideRight scroll" type="button" onclick="slide('right', ${i})"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"/></svg></button>`))

        skill_el.appendChild(projects_scroll_el)
        skillsContainer.appendChild(skill_el);
        i++
    })
}

Document.prototype.createElementFromString = str => {
   const element = new DOMParser().parseFromString(str, 'text/html')
   const child = element.documentElement.querySelector('body').firstChild
   return child
}

const url = "https://raw.githubusercontent.com/KouroshAlinaghi/kouroshalinaghi.github.io/master/json/index.json"

const projectTemplate = project => {
    return `<div class="project"><div class="project-title">${project.title}</div><div class="project-description">${project.description}</div><div class="project-link-container"><a href="${project.url}" target="_blank" class="project-link">View on Github</a></div></div>`
}

const slide = (direction, index) => {
    const container = document.querySelectorAll(".skill-projects")[index]
    scrollCompleted = 0;
    var slideVar = setInterval(() => {
        container.scrollLeft = direction == 'left' ? container.scrollLeft - 4 : container.scrollLeft + 4
        scrollCompleted += 4
        
        if (scrollCompleted >= document.querySelector(".project").offsetWidth + 40){
            window.clearInterval(slideVar)
        }
    }, 3)
} 

let data;
fetch(url)
    .then((response) => response.json())
    .then((json) => render(json));
