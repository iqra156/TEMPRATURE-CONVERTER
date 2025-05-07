let fromUnit = null;
let toUnit = null;

// Handle unit selection
function selectUnit(element, type) {
    const containerId = type === 'from' ? 'from-units' : 'to-units';
    const allOptions = document.querySelectorAll(`#${containerId} .unit-option`);
    allOptions.forEach(option => option.classList.remove('selected'));
    element.classList.add('selected');

    // Set selected units
    if (type === 'from') {
        fromUnit = element.textContent.trim();
    } else {
        toUnit = element.textContent.trim();
    }

    // Try converting if input already exists
    convertTemperature();
}

// Conversion function
function convertTemperature() {
    const input = document.getElementById("temp-input").value;
    const output = document.getElementById("converted-temp");

    if (!fromUnit || !toUnit || input === "") {
        output.value = "";
        return;
    }

    const value = parseFloat(input);
    let result;

    // Convert input to Celsius first
    let celsius;
    switch (fromUnit) {
        case "Celsius (°C)":
            celsius = value;
            break;
        case "Fahrenheit (°F)":
            celsius = (value - 32) * 5 / 9;
            break;
        case "Kelvin (K)":
            celsius = value - 273.15;
            break;
        case "Rankine (°R)":
            celsius = (value - 491.67) * 5 / 9;
            break;
        default:
            celsius = value;
    }

    // Convert from Celsius to target unit
    switch (toUnit) {
        case "Celsius (°C)":
            result = celsius;
            break;
        case "Fahrenheit (°F)":
            result = (celsius * 9 / 5) + 32;
            break;
        case "Kelvin (K)":
            result = celsius + 273.15;
            break;
        case "Rankine (°R)":
            result = (celsius + 273.15) * 9 / 5;
            break;
        default:
            result = celsius;
    }

    output.value = result.toFixed(2);
}


function clearFields() {
    document.getElementById("temp-input").value = "";
    document.getElementById("converted-temp").value = "";

    // Optionally remove selected unit highlighting
    document.querySelectorAll('.unit-option').forEach(el => el.classList.remove('selected'));

    fromUnit = null;
    toUnit = null;
}
