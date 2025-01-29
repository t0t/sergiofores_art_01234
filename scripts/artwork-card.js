const ArtworkCard = (artwork) => {
  const card = document.createElement('div');
  card.className = 'artwork-card';
  
  const link = document.createElement('a');
  link.href = `/artwork/${artwork.id}`;
  link.setAttribute('data-link', '');
  
  const img = document.createElement('img');
  img.src = artwork.image;
  img.alt = artwork.title;
  img.loading = 'lazy';
  
  const content = document.createElement('div');
  content.className = 'artwork-card-content';
  
  const title = document.createElement('h3');
  title.textContent = artwork.title;
  
  const details = document.createElement('div');
  details.className = 'artwork-card-details';
  
  const technique = document.createElement('p');
  technique.className = 'technique';
  technique.textContent = artwork.technique;
  
  const year = document.createElement('p');
  year.className = 'year';
  year.textContent = artwork.year;
  
  const dimensions = document.createElement('p');
  dimensions.className = 'dimensions';
  dimensions.textContent = artwork.dimensions;
  
  const description = document.createElement('p');
  description.className = 'description';
  description.textContent = artwork.description.substring(0, 100) + '...';
  
  const tags = document.createElement('div');
  tags.className = 'tags';
  artwork.tags.forEach(tag => {
    const tagSpan = document.createElement('span');
    tagSpan.className = 'tag';
    tagSpan.textContent = tag;
    tags.appendChild(tagSpan);
  });
  
  details.appendChild(technique);
  details.appendChild(year);
  details.appendChild(dimensions);
  
  content.appendChild(title);
  content.appendChild(details);
  content.appendChild(description);
  content.appendChild(tags);
  
  link.appendChild(img);
  link.appendChild(content);
  card.appendChild(link);
  
  return card;
};

export default ArtworkCard;