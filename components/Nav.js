function createListHTML(links) {
  //Use join to change the array and make it a string separated by spaces
  return links
    .map(
      link =>
        `<li class ="btn"><a href="./${link.toLowerCase()}" data-navigo>${link}</a></li>`
    )
    .join("");
}

export default st => `
<nav>
  <ul class="flex justify-space-around">
    ${createListHTML(st)}
  </ul>
</nav>
`;
