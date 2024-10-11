/* ==========
 * Split Navigation for Squarespace
 * This Code is licensed by Will-Myers.com 
========== */
(function(){ 
  moveStylesheet();

  let header = document.querySelector('#header'),
      navList = header.querySelector('.header-display-desktop .header-nav-list'),
      headerStyles = window.getComputedStyle(header),
      rightNavLinkCount = headerStyles.getPropertyValue('--right-nav-links'),
      rightNavLinks = navList.querySelectorAll(`:scope > *:nth-of-type(n+${navList.children.length - parseInt(rightNavLinkCount) + 1})`),
      headerActionsRight = header.querySelector('.header-actions--right');

  //Add Unique Targeting Class
  header.classList.add('wm-split-nav')
  
  //Add New Nav
  let newNav = `<div class="header-nav"><div class="header-nav-wrapper header-nav-wrapper--right"><nav class="header-nav-list header-nav-list--right"></nav></div></div>`;
  headerActionsRight.insertAdjacentHTML('afterbegin', newNav);
  newNav = headerActionsRight.querySelector('.header-nav-list--right');
  rightNavLinks.forEach(link => newNav.append(link));
  
  
  //Move Stylesheet
  function moveStylesheet() {
    let stylesheet = document.querySelector('link[href*="/SplitNav"]');
    if (!stylesheet) return;
    document.head.prepend(stylesheet);
  }

  /*
  * Check If Flex Gap Is Supported
  * Delete by Jan 2023 if no issues have popped up with this
  **/
  function checkFlexGap() {
    // create flex container with row-gap set
    var flex = document.createElement("div");
    flex.style.display = "flex";
    flex.style.flexDirection = "column";
    flex.style.rowGap = "1px";

    // create two, elements inside it
    flex.appendChild(document.createElement("div"));
    flex.appendChild(document.createElement("div"));

    // append to the DOM (needed to obtain scrollHeight)
    document.body.appendChild(flex);
    var isSupported = flex.scrollHeight === 1; // flex container should be 1px high from the row-gap
    flex.parentNode.removeChild(flex);

    return isSupported;
  }
  if (!checkFlexGap()) {
    document.body.classList.add("no-flexbox-gap");

    let header = document.querySelector('#header')
    let styles = window.getComputedStyle(header);
    let leftAlign = styles.getPropertyValue('--left-alignment');
    let rightAlign = styles.getPropertyValue('--right-alignment');

    if (leftAlign == 'right'){
      leftAlign = 'flex-end';
    } else if (leftAlign == 'left'){
      leftAlign = 'flex-start';
    }

    if (rightAlign == 'right'){
      rightAlign = 'flex-end';
    } else if (rightAlign == 'left'){
      rightAlign = 'flex-start';
    }

    header.style.setProperty('--left-alignment', leftAlign);
    header.style.setProperty('--right-alignment', rightAlign)
  }
  
}());
