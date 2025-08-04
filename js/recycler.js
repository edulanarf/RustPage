const slots = document.querySelectorAll('.slot');
const itemList = document.getElementById('item-list');
let selectedSlot = null;
let selectedSlotIndex = null;

const items = [
    {
        name: 'Tech Trash',
        id: 'techparts',
        img: '../assets/techparts.webp',
        yields: { scrap: 20, hq:1 }
    },
    {
        name: 'Spring',
        id: 'spring',
        img: '../assets/metalspring.webp',
        yields: { scrap: 10, hq: 1 }
    },
    {
        name: 'Gears',
        id: 'gears',
        img: '../assets/gears.webp',
        yields: { scrap: 10, metalfrags: 13 }
    },
    {
        name: 'Rope',
        id: 'rope',
        img: '../assets/rope.webp',
        yields: { cloth: 15 }
    },
    {
        name: 'SMG Body',
        id: 'smgbody',
        img: '../assets/smgbody.webp',
        yields: { scrap: 15, hq: 2}
    },
    {
        name: 'Semi Body',
        id: 'semibody',
        img: '../assets/semibody.webp',
        yields: { scrap: 15, metalfrags: 75, hq:2}
    },
    {
        name: 'Rifle Body',
        id: 'riflebody',
        img: '../assets/riflebody.webp',
        yields: { scrap: 25, hq: 2}
    },
    {
        name: 'Metal Blade',
        id: 'metalblade',
        img: '../assets/metalblade.webp',
        yields: { scrap: 2, metalfrags: 15 }
    },
    {
        name: 'Sewing Kit',
        id: 'sewingkit',
        img: '../assets/sewingkit.webp',
        yields: { cloth: 10, rope: 2 }
    },
    {
        name: 'Metal Pipe',
        id: 'metalpipe',
        img: '../assets/metalpipe.webp',
        yields: {scrap:6, hq: 2 }
    },
    {
        name: 'Sheet Metal',
        id: 'sheetmetal',
        img: '../assets/Sheet_Metal_icon.webp',
        yields: {scrap:8, metalfrags: 100, hq:1}
    },
    {
        name: 'Camera',
        id: 'camera',
        img: '../assets/cctv-camera.webp',
        yields: { techtrash: 2, hq: 2 }
    },
    {
        name: 'Computer Station',
        id: 'computerstation',
        img: '../assets/targeting-computer.webp',
        yields: { techtrash: 3, hq: 1, metalfrags: 50 }
    },
    {
        name: 'Tarp',
        id: 'tarp',
        img: '../assets/Tarp_icon.png',
        yields: { cloth: 50 }
    },
    {
        name: 'Fuse',
        id: 'fuse',
        img: '../assets/Electric_Fuse_icon.webp',
        yields: { scrap: 24 }
    },
    {
        name: 'Propane Tank',
        id: 'propanetank',
        img: '../assets/propanetank.webp',
        yields: { metalfrags: 50 }
    },
    {
        name: 'Road Sign',
        id: 'roadsign',
        img: '../assets/roadsigns.webp',
        yields: { scrap: 5, hq:1 }
    },
    {
        name: 'Rope',
        id: 'rope',
        img: '../assets/rope.webp',
        yields: { cloth: 15}
    }
];

const materials = [
    { id: 'scrap', name: 'Scrap', img: '../assets/scrap.webp' },
    { id: 'hq', name: 'High Quality Metal', img: '../assets/metal-refined.webp' },
    { id: 'metalfrags', name: 'Metal Fragments', img: '../assets/metal-fragments.webp' },
    { id: 'cloth', name: 'Cloth', img: '../assets/cloth.webp' },
    { id: 'techtrash', name: 'Tech Trash', img: '../assets/techparts.webp' },
    { id: 'rope', name: 'Rope', img: '../assets/rope.webp' }
];

// Generar la lista visual
items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-option';

    const img = document.createElement('img');
    img.src = item.img;
    img.alt = item.name;
    img.style.width = '32px';
    img.style.height = '32px';

    const label = document.createElement('span');
    label.textContent = item.name;

    div.appendChild(img);
    div.appendChild(label);
    div.addEventListener('click', () => {
        if (selectedSlot && selectedSlotIndex !== null) {
            setItemInSlot(selectedSlotIndex, item.id);
            itemList.style.display = 'none';
        }
    });

    itemList.appendChild(div);
});

// Mostrar la lista al hacer click en una ranura
slots.forEach((slot, index) => {
    slot.addEventListener('click', () => {
        selectedSlot = slot;
        selectedSlotIndex = index;
        itemList.style.display = 'flex';
    });
});

let selectedItems = [null, null, null, null, null]; // Para 5 slots

function setItemInSlot(slotIndex, itemId) {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const quantity = 1;

    selectedItems[slotIndex] = { item, quantity };

    const slot = document.querySelector(`.slot[data-index="${slotIndex}"]`);
    slot.innerHTML = `
        <img src="${item.img}" alt="${item.name}" title="${item.name}">
        <input type="number" class="item-quantity-input" min="1" max="20" value="${quantity}" data-index="${slotIndex}">
    `;
}

document.getElementById('recycle-button').addEventListener('click', () => {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.style.display = 'flex';  // Mostrar animación

    setTimeout(() => {
        loadingScreen.style.display = 'none';  // Ocultar animación después de 1s

        let resultDiv = document.getElementById('recycle-results');
        resultDiv.innerHTML = '';

        // Tu código original de reciclaje aquí:
        const total = {}; // Materiales reciclados

        selectedItems.forEach(slotData => {
            if (slotData && slotData.item && slotData.item.yields) {
                const { item, quantity } = slotData;

                for (let mat in item.yields) {
                    total[mat] = (total[mat] || 0) + item.yields[mat] * quantity;
                }
            }
        });

        // Mostrar resultados
         resultDiv = document.getElementById('recycle-results');

        for (let mat in total) {
            const material = materials.find(m => m.id === mat);

            const materialBlock = document.createElement('div');
            materialBlock.style.display = 'inline-block';
            materialBlock.style.textAlign = 'center';
            materialBlock.style.margin = '8px';

            const img = document.createElement('img');
            img.src = material.img;
            img.alt = material.name;
            img.style.width = '40px';
            img.style.height = '40px';

            const quantity = document.createElement('div');
            quantity.textContent = total[mat];
            quantity.style.fontWeight = 'bold';
            quantity.style.marginTop = '4px';

            materialBlock.appendChild(img);
            materialBlock.appendChild(quantity);

            resultDiv.appendChild(materialBlock);
        }
    }, 1000);
});

document.getElementById('reset-button').addEventListener('click', () => {
    selectedItems = [null, null, null, null, null];

    slots.forEach(slot => {
        slot.innerHTML = '';
    });

    document.getElementById('recycle-results').innerHTML = '';

    itemList.style.display = 'none';

    selectedSlot = null;
    selectedSlotIndex = null;
});

document.addEventListener('input', (event) => {
    if (event.target.classList.contains('item-quantity-input')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        let value = parseInt(event.target.value);

        if (isNaN(value) || value < 1) value = 1;
        if (value > 20) value = 20;

        event.target.value = value; // Corrige visualmente

        if (selectedItems[index]) {
            selectedItems[index].quantity = value;
        }
    }
});