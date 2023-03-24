class ColorPicker {
    constructor(root) {
        this.root = root;
        this.colorjoe = colorjoe.rgb(this.root.querySelector(".colorjoe"));
        this.selectedColor = null;

        this.colorjoe.show();
        this.setSelectedColor("#009578");

        this.colorjoe.on("change", color => {
            this.setSelectedColor(color.hex(), true);
                let hexVal = this.root.getElementsByClassName('selected-color-text')[0].textContent;
                let modelViewerParameters = document.querySelector("model-viewer#model");
                let [materialCol] = modelViewerParameters.model.materials;
                materialCol.pbrMetallicRoughness.setBaseColorFactor(hexVal);
        });

        this.root.querySelectorAll(".selected-color").forEach((el, i) => {
            el.addEventListener("mouseup", e => {
                this.setSelectedColor(el.dataset.color);
                });
            });
        }

    setSelectedColor(color, skipCjUpdate = false) {
        this.selectedColor = color;
        this.root.querySelector(".selected-color-text").textContent = color;
        this.root.querySelector(".selected-color").style.background = color;

        if (!skipCjUpdate) {
            this.colorjoe.set(color);
        }
    }
}

const cp = new ColorPicker(document.querySelector(".container"));


if (location.protocol != "https:") {
  location.href =
    "https:" +
    window.location.href.substring(window.location.protocol.length);
}
  
const modelViewerParameters = document.querySelector("model-viewer#model");
modelViewerParameters.addEventListener("load", (ev) => {

  let material = modelViewerParameters.model.materials[0];
  
  document.querySelector('#metalness-range').addEventListener('input', (event) => {
    material.pbrMetallicRoughness.setMetallicFactor(event.target.value);
    metalnessDisplay.textContent = event.target.value;
  });

  document.querySelector('#roughness-range').addEventListener('input', (event) => {
    material.pbrMetallicRoughness.setRoughnessFactor(event.target.value);
    roughnessDisplay.textContent = event.target.value;
  });
});
  