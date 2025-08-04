const explosives = [
    { id: "satchel", name: "Satchel Charge", damage: 250, img: "../assets/explosive-satchel.webp" },
    { id: "c4", name: "C4 Explosive", damage: 500, img: "../assets/explosive-timed.webp" },
    { id: "rocket", name: "Rocket", damage: 750, img: "../assets/rocket.webp" },
    { id: "f1_grenade", name: "Grenade", damage: 150, img: "../assets/grenade-f1.webp" },
    { id: "molotov", name: "molotov", damage: 35, img: "../assets/rust-grenade-molotov-300x300.webp" },
];

const materials = [
    {type: "hardWood", hp: 250, model: "../assets/wood-wall.webp", bestOption: [{ explosiveId: "molotov", quantity: 5 }, { explosiveId: "satchel", quantity: 3 }] },
    {type: "hardStone", hp: 500, model: "../assets/stoneHardSide.png", bestOption: [{ explosiveId: "rocket", quantity: 4 }] },
    {type: "hardMetal", hp: 1000, model: "../assets/metalHardSide.png", bestOption: [{ explosiveId: "c4", quantity: 4 }] },
    {type: "hardHQ", hp: 2000, model: "../assets/hqHardSide.png", bestOption: [{ explosiveId: "c4", quantity: 8 }] }
]

const materialList = document.getElementById("materials-list");
const bestOptionDiv  = document.getElementById("best-option");

materials.forEach(material => {
    const div = document.createElement("div");
    div.className = "material-card";
    div.innerHTML = `<img src="${material.model}" alt="${material.type}" class="material-img">`;

    div.addEventListener("click", () => {
        showBestOption(material);
    });
    materialList.appendChild(div);
});

function showBestOption(material) {
    // Limpiar contenido anterior
    bestOptionDiv.innerHTML = "";

    material.bestOption.forEach(bestOption => {
        const explosive = explosives.find(e => e.id === bestOption.explosiveId);
        if (explosive) {
            // Crear contenedor de opción
            const optionDiv = document.createElement("div");
            optionDiv.className = "explosive-option";

            // Crear imagen
            const img = document.createElement("img");
            img.src = explosive.img;
            img.alt = explosive.name;
            img.className = "explosive-img";

            // Crear texto de nombre y cantidad
            const label = document.createElement("p");
            label.textContent = `${explosive.name} x${bestOption.quantity}`;
            label.className = "explosive-label";

            // Agregar elementos al contenedor
            optionDiv.appendChild(img);
            optionDiv.appendChild(label);

            // Mostrar en el DOM
            bestOptionDiv.appendChild(optionDiv);
        }
    });
}
