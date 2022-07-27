/*
 *
 * data
 *
 */
let projects = PROJRECTS;

// modal box
const modal = document.getElementById('conModal');
const modalInfo = document.getElementById('modal_text');
const modalImg = document.getElementById('modal_img');
const modalTech = document.getElementById('modal_tech');
const modalCloseBtn = document.querySelector('.modal_close_btn');
/*
/**
 * @description Add projects in projects section
 */
function addProjects() {
  let myworksSection = document.getElementsByClassName('my_works')[0];
  console.log(myworksSection);
  projects.forEach(function (project, index) {
    /**
     * create htmls elements needed for each project
     * **/
    let projectSection = document.createElement('div');
    let projectInnerSection = document.createElement('div');
    let projectPic = document.createElement('a');
    let projectThumbnail = document.createElement('img');
    let projectTitle = document.createElement('h3');
    let projectUrl2 = document.createElement('a');
    let projectInfo = document.createElement('a');
    let projectUrl = document.createElement('a');
    let projectGit = document.createElement('a');
    let projectLinks = document.createElement('div');

    /**
     * add attributes to html elements needed for each project
     * **/
    setAttributes(projectSection, { class: 'myWork text_center col-sm-6 col-lg-3 my-2' });
    setAttributes(projectInnerSection, { class: 'myWork' });
    setAttributes(projectLinks, { class: 'readmore' });
    setAttributes(projectInfo, { class: 'readmore px-2 fs-4'});
    setAttributes(projectUrl, { class: 'readmore px-2 fs-4'});
    setAttributes(projectGit, { class: 'readmore px-2 fs-4',target: '_blank'});
    if (typeof project.git !== undefined) {
      setAttributes(projectGit, { href: project.git });
      console.log('you in');
      projectLinks.appendChild(projectGit);
    }
    if (typeof project.href !== undefined) {
      setAttributes(projectUrl2, { href: project.href, target: '_blank' });
      console.log('you in');
      projectTitle.appendChild(projectUrl2);
    }
    setAttributes(projectUrl, { href: project.href, target: '_blank'});
    setAttributes(projectPic, { href: project.href, target: '_blank'});
    setAttributes(projectThumbnail, { class: 'project_img', src: project.src, alt: project.alt });
    projectPic.appendChild(projectThumbnail);

    // capitalize the first letter of each word in project title
    projectUrl2.innerHTML = letterCapitalize(project.title);
 /**
     * append elements
     * **/
    // add projectSection element to myworksSection parent
    myworksSection.appendChild(projectSection);

    // add html elements to projectSection parent
    projectSection.appendChild(projectThumbnail);
    projectSection.appendChild(projectTitle);
    projectSection.appendChild(projectLinks);

    // add projectUrl element as child to projectLink parent
    projectLinks.appendChild(projectUrl);

    // add projectInfo element as child to projectLink parent
    projectLinks.appendChild(projectInfo);

    /**
     * add project link icons
     * **/
    // add projectUrl content
    if (typeof project.href !== 'undefined') {
      projectUrl.innerHTML = '<i class="fas fa-link spin"></i>';
    }
    // add projectInfo content
    projectInfo.innerHTML = `<i class="info-icon fas fa-info-circle spin" id=${index}></i>`;

    // check it project has a git link or not to add git icon
    if (typeof project.git !== 'undefined') {
      projectGit.innerHTML = '<i class="fab fa-github spin"></i>';
    }
  });

  // add a click event listener for project info btn
  myworksSection.addEventListener('click', showInfomodal);
}

/**
 * @description Set attributes at once for an element
 * @param {html element} element
 * @param {object} attributes
 */
function setAttributes(element, attributes) {
  for (key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

/**
 * @description Capitalize the first letter of each word
 * @param {string} str
 * @returns {string} first letter of each word in str capitalized
 */
function letterCapitalize(str) {
  // our regex [a-z] matches every alphabetic character in the string
  // \b is used to find a match at the beginning or end of a word
  // replace(searchvalue, newvalue)
  // searches a string for a specified value, or a regular expression,
  // and returns a new string where the specified values are replaced
  // using a function to return first letter of each word capitalized
  return str.replace(/\b[a-z]/gi, function (char) {
    return char.toUpperCase();
  });
}

/**
 * @description show info modal and display data
 * @param {object} evt
 */
function showInfomodal(evt) {
  if (evt.target.nodeName.toLowerCase() === 'i' && evt.target.classList.contains('info-icon')) {
    console.log('info widow', evt.target, typeof evt);
    // show info modal
    modal.style.cssText = 'display: block';
    id = Number(evt.target.getAttribute('id'));
    modalInfo.innerHTML = projects[id].info.replace(/. ●/g, '.<br>●'); // add new line after every project point
    modalTech.innerHTML = projects[id].tech;
    modalImg.setAttribute('src', projects[id].src);
  }
}

/*
 *
 * event listeners
 *
 */
// add click event to modal close icon to close the modal
modalCloseBtn.addEventListener('click', function () {
  modal.style.cssText = 'display: none';
});

// add click event to window any click outside of the modal close it
window.addEventListener('click', function (evt) {
  if (evt.target == modal) {
    modal.style.cssText = 'display: none';
  }
});

addProjects();
