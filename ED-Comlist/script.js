
const predefinedEntries = [
  "Aluminium", 
  "Biowaste", "Bioreducing Lichen", "Building Fabricators",
  "Ceramic Composites", "CMM Composite", "Computer Components", "Copper", "Crop Harvesters", "Emergency Power Cells", 
  "Evacuation Shelter", 
  "Food Cartridges", "Fruit and Vegetables", 
  "Geological Equipment", "Grain", 
  "H.E. Suits", 
  "Insulating Membrane",
  "Liquid oxygen", "Land Enrichment Systems",
  "Medical Diagnostic Equipment", "Muon Imager", "Non-Lethal Weapons", 
  "Pesticides", "Polymers", "Power Generators", 
  "Robotics", 
  "Semiconductors", "Steel", "Superconductors", "Structural Regulators", "Surface Stabilisers", "Survival Equipment",
  "Titanium", 
  "Water", "Water Purifiers"
];

window.onload = () => {
  predefinedEntries.forEach(entry => addItem(entry));
};

function addItem(name = null, value = 0, step = 1) {
  const input = document.getElementById('itemInput');
  const itemList = document.getElementById('itemList');
  const itemName = name ? name : input.value.trim();
  if (!itemName) {
    alert('Please enter a commodity name!');
    return;
  }

  const li = document.createElement('li');
  li.className = 'item';

  const nameSpan = document.createElement('span');
  nameSpan.textContent = itemName;

  const valueInput = document.createElement('input');
  valueInput.type = 'number';
  valueInput.value = value;

  const incrementButton = document.createElement('button');
  incrementButton.textContent = '+';
  incrementButton.onclick = () => {
    valueInput.value = parseInt(valueInput.value) + 1;
  };

  const decrementButton = document.createElement('button');
  decrementButton.textContent = '-';
  decrementButton.onclick = () => {
    valueInput.value = Math.max(0, parseInt(valueInput.value) - 1);
  };

  const stepInput = document.createElement('input');
  stepInput.type = 'number';
  stepInput.placeholder = 'Step Value';
  stepInput.value = step;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.className = 'removeButton';
  removeButton.onclick = () => {
    itemList.removeChild(li);
  };

  li.append(nameSpan, valueInput, incrementButton, decrementButton, stepInput, removeButton);
  itemList.appendChild(li);

  if (!name) input.value = ''; // Clear the input field
}

function saveList() {
  const itemList = document.getElementById('itemList');
  const items = Array.from(itemList.children).map(item => ({
    name: item.querySelector('span').textContent,
    value: item.querySelector('input[type="number"]').value,
    step: item.querySelector('input[placeholder="Step Value"]').value,
  }));
  localStorage.setItem('commodityList', JSON.stringify(items));
  alert('List saved successfully!');
}

function loadList() {
  const savedItems = JSON.parse(localStorage.getItem('commodityList') || '[]');
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = ''; // Clear current list
  savedItems.forEach(item => addItem(item.name, item.value, item.step));
  alert('List loaded successfully!');
}

function exportToXML() {
  const itemList = document.getElementById('itemList');
  const items = Array.from(itemList.children).map(item => ({
    name: item.querySelector('span').textContent,
    value: item.querySelector('input[type="number"]').value,
    step: item.querySelector('input[placeholder="Step Value"]').value,
  }));

  let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n<commodities>\n';
  items.forEach(item => {
    xmlContent += `
      <commodity>
        <name>${item.name}</name>
        <value>${item.value}</value>
        <step>${item.step}</step>
      </commodity>\n`;
  });
  xmlContent += '</commodities>';

  const blob = new Blob([xmlContent], { type: 'application/xml' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'commodities_list.xml';
  link.click();
}

function importFromXML() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];
  if (!file) {
    alert('No file selected!');
    return;
  }

  const reader = new FileReader();
  reader.onload = event => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(event.target.result, 'application/xml');
    const commodities = xmlDoc.getElementsByTagName('commodity');
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Clear current list

    Array.from(commodities).forEach(commodity => {
      const name = commodity.getElementsByTagName('name')[0].textContent;
      const value = commodity.getElementsByTagName('value')[0].textContent;
      const step = commodity.getElementsByTagName('step')[0].textContent;
      addItem(name, value, step);
    });

    alert('XML imported successfully!');
  };
  reader.readAsText(file);
}
function addItem(name = null, value = 0, step = 1) {
  const input = document.getElementById('itemInput');
  const itemList = document.getElementById('itemList');
  const itemName = name ? name : input.value.trim();
  if (!itemName) {
    alert('Please enter a commodity name!');
    return;
  }

  const li = document.createElement('li');
  li.className = 'item';

  const nameSpan = document.createElement('span');
  nameSpan.textContent = itemName;

  const valueInput = document.createElement('input');
  valueInput.type = 'number';
  valueInput.value = value;

  const incrementButton = document.createElement('button');
  incrementButton.textContent = '+';
  incrementButton.onclick = () => {
    const stepValue = parseInt(stepInput.value) || 1; // Use step value or default to 1
    valueInput.value = parseInt(valueInput.value || 0) + stepValue;
  };

  const decrementButton = document.createElement('button');
  decrementButton.textContent = '-';
  decrementButton.onclick = () => {
    const stepValue = parseInt(stepInput.value) || 1; // Use step value or default to 1
    valueInput.value = Math.max(0, parseInt(valueInput.value || 0) - stepValue);
  };

  const stepInput = document.createElement('input');
  stepInput.type = 'number';
  stepInput.placeholder = 'Step Value';
  stepInput.value = step;

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.className = 'removeButton';
  removeButton.onclick = () => {
    itemList.removeChild(li);
  };

  li.append(nameSpan, valueInput, incrementButton, decrementButton, stepInput, removeButton);
  itemList.appendChild(li);

  if (!name) input.value = ''; // Clear the input field
}

