const explosives = [
    {
        inputId: 'rocket',
        outputId: 'materials-rocket',
        materials: [
            { name: 'pipeline', multiplier: 2, img: '../assets/metalpipe.webp' },
            { name: 'charcoal', multiplier: 1950, img: '../assets/charcoal.webp' },
            { name: 'sulfur', multiplier: 1400, img: '../assets/sulfur.webp' }
        ]
    },
    {
        inputId: 'rocket-hv',
        outputId: 'materials-rocket-hv',
        materials: [
            { name: 'pipeline', multiplier: 1, img: '../assets/metalpipe.webp' },
            { name: 'charcoal', multiplier: 300, img: '../assets/charcoal.webp' },
            { name: 'sulfur', multiplier: 200, img: '../assets/sulfur.webp' }
        ]
    },
    {
        inputId: 'c4',
        outputId: 'materials-c4',
        materials: [
            { name: 'techparts', multiplier: 2, img: '../assets/techparts.webp' },
            { name: 'charcoal', multiplier: 3000, img: '../assets/charcoal.webp' },
            { name: 'sulfur', multiplier: 2200, img: '../assets/sulfur.webp' },
            { name: 'fuel', multiplier: 60, img: '../assets/lowgradefuel.webp' }
        ]
    },
    {
        inputId: 'beancan',
        outputId: 'materials-beancan',
        materials: [
            { name: 'charcoal', multiplier: 180, img: '../assets/charcoal.webp' },
            { name: 'sulfur', multiplier: 120, img: '../assets/sulfur.webp' }
        ]
    },
    {
        inputId: 'satchel',
        outputId: 'materials-satchel',
        materials: [
            { name: 'beancan', multiplier: 4, img: '../assets/grenade-beancan.webp' },
            { name: 'rope', multiplier: 1, img: '../assets/rope.webp' }
        ]
    },
    {
        inputId: 'explosive-ammo',
        outputId: 'materials-explosive-ammo',
        materials: [
            { name: 'charcoal', multiplier: 30, img: '../assets/charcoal.webp' },
            { name: 'sulfur', multiplier: 25, img: '../assets/sulfur.webp' }
        ]
    }
];

function setupExplosiveCalculator(inputId, outputContainerId, materialMultipliers) {
    const input = document.getElementById(inputId);
    const output = document.getElementById(outputContainerId);

    input.addEventListener('input', () => {
        const count = parseInt(input.value) || 0;
        output.innerHTML = '';

        materialMultipliers.forEach(material => {
            if (!globalTotals[material.name]) {
                globalTotals[material.name] = { amount: 0, img: material.img };
            }
            const prevAmount = parseInt(input.dataset[material.name]) || 0;
            globalTotals[material.name].amount -= prevAmount;
            if(globalTotals[material.name].amount < 0) globalTotals[material.name].amount = 0;
        });

        if (count > 0) {
            materialMultipliers.forEach(material => {
                const amount = count * material.multiplier;

                const block = document.createElement('div');
                block.className = 'material-block';

                const image = document.createElement('img');
                image.src = material.img;
                image.alt = material.name;

                const label = document.createElement('span');
                label.textContent = amount;

                block.appendChild(image);
                block.appendChild(label);
                output.appendChild(block);

                input.dataset[material.name] = amount;

                globalTotals[material.name].amount += amount;
            });
        } else {
            materialMultipliers.forEach(material => {
                input.dataset[material.name] = 0;
            });
        }
        updateTotalDisplay();
    });
}


explosives.forEach(({ inputId, outputId, materials }) => {
    setupExplosiveCalculator(inputId, outputId, materials);
});

const resetButton = document.getElementById('reset-btn');

resetButton.addEventListener('click', () => {
    const inputs = document.querySelectorAll('.half-division input[type="number"]');
    inputs.forEach(input => {
        input.value = '';
        for (const key in input.dataset) {
            delete input.dataset[key];
        }
    });

    const outputs = document.querySelectorAll('[id^="materials-"]');
    outputs.forEach(output => output.innerHTML = '');

    for (const key in globalTotals) {
        globalTotals[key].amount = 0;
    }

    const totalList = document.getElementById('total-list');
    if (totalList) totalList.innerHTML = '';
});


const globalTotals = {};

function updateTotalDisplay() {
    const totalList = document.getElementById('total-list');
    totalList.innerHTML = '';
    if (Object.keys(globalTotals).length === 0) return;

    for (const materialName in globalTotals) {
        const totalAmount = globalTotals[materialName].amount;
        const imgSrc = globalTotals[materialName].img;

        if (totalAmount > 0) {
            const block = document.createElement('div');
            block.className = 'material-block';

            const image = document.createElement('img');
            image.src = imgSrc;
            image.alt = materialName;

            const label = document.createElement('span');
            label.textContent = totalAmount;

            block.appendChild(image);
            block.appendChild(label);
            totalList.appendChild(block);
        }
    }
}