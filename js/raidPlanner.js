const explosives = [
    { id: "satchel", name: "Satchel Charge", damage: 250, img: "../assets/explosive-satchel.webp" },
    { id: "c4", name: "C4 Explosive", damage: 500, img: "../assets/explosive-timed.webp" },
    { id: "rocket", name: "Rocket", damage: 750, img: "../assets/rocket.webp" },
    { id: "f1_grenade", name: "Grenade", damage: 150, img: "../assets/grenade-f1.webp" },
    { id: "molotov", name: "molotov", damage: 35, img: "../assets/rust-grenade-molotov-300x300.webp" },
];

const materials = [
    {type: "hardWood", hp: 250, model: "../assets/wood-wall.webp", bestOption: [{ explosiveId: "molotov", quantity: 5 }]},
    {type: "hardStone", hp: 500, model: "../assets/stoneHardSide.png", bestOption: [{ explosiveId: "rocket", quantity: 4 }] },
    {type: "hardMetal", hp: 1000, model: "../assets/metalHardSide.png", bestOption: [{ explosiveId: "c4", quantity: 4 }] },
    {type: "hardHQ", hp: 2000, model: "../assets/hqHardSide.png", bestOption: [{ explosiveId: "c4", quantity: 8 }] }
]

const materialList = document.getElementById("materials-list");
const bestOptionDiv  = document.getElementById("best-option");

const selectedMaterials = {};

materials.forEach(material => {
    const div = document.createElement("div");
    div.className = "material-card";
    div.innerHTML = `<img src="${material.model}" alt="${material.type}" class="material-img">`;

    div.addEventListener("click", () => {
        selectMaterial(material); // Acumular selección al hacer click
    });

    materialList.appendChild(div);
});

function showBestOption(material) {
    bestOptionDiv.innerHTML = "";

    material.bestOption.forEach(bestOption => {
        const explosive = explosives.find(e => e.id === bestOption.explosiveId);
        if (explosive) {
            const optionDiv = document.createElement("div");
            optionDiv.className = "explosive-option";

            const img = document.createElement("img");
            img.src = explosive.img;
            img.alt = explosive.name;
            img.className = "explosive-img";

            const label = document.createElement("p");
            label.textContent = `${explosive.name} x${bestOption.quantity}`;
            label.className = "explosive-label";

            optionDiv.appendChild(img);
            optionDiv.appendChild(label);
            bestOptionDiv.appendChild(optionDiv);
        }
    });
}

function selectMaterial(material) {
    const key = material.type;

    if (selectedMaterials[key]) {
        selectedMaterials[key].count += 1;
    } else {
        selectedMaterials[key] = {
            material: material,
            count: 1
        };
    }

    renderSelectionList();
    renderExplosivesSummary();
}


const selectionList = document.getElementById("selection-list");

function renderSelectionList() {
    selectionList.innerHTML = "";

    Object.values(selectedMaterials).forEach(entry => {
        const { material, count } = entry;

        const item = document.createElement("div");
        item.className = "selection-item";

        const img = document.createElement("img");
        img.src = material.model;
        img.className = "selection-img";

        const label = document.createElement("span");
        label.textContent = `${material.type.toUpperCase()} x${count}`;
        label.className = "selection-label";

        const delBtn = document.createElement("button");
        delBtn.textContent = "✖";
        delBtn.className = "delete-btn";
        delBtn.onclick = () => {
            delete selectedMaterials[material.type];
            renderSelectionList();
            renderExplosivesSummary();
        };

        item.appendChild(img);
        item.appendChild(label);
        item.appendChild(delBtn);
        selectionList.appendChild(item);
    });
}

function renderExplosivesSummary() {
    const totalExplosives = {};

    Object.values(selectedMaterials).forEach(entry => {
        const { material, count } = entry;

        material.bestOption.forEach(option => {
            if (!totalExplosives[option.explosiveId]) {
                totalExplosives[option.explosiveId] = 0;
            }
            totalExplosives[option.explosiveId] += option.quantity * count;
        });
    });

    bestOptionDiv.innerHTML = "";

    Object.entries(totalExplosives).forEach(([explosiveId, totalQty]) => {
        const explosive = explosives.find(e => e.id === explosiveId);
        if (explosive) {
            const container = document.createElement("div");
            container.className = "explosive-option";

            const img = document.createElement("img");
            img.src = explosive.img;
            img.className = "explosive-img";

            const label = document.createElement("p");
            label.textContent = `${explosive.name} x${totalQty}`;
            label.className = "explosive-label";

            container.appendChild(img);
            container.appendChild(label);
            bestOptionDiv.appendChild(container);
        }
    });
}