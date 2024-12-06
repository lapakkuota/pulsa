const form = document.getElementById('pulsaForm');
const resultDiv = document.getElementById('result');
const phoneInput = document.getElementById('phone');
const nominalSelect = document.getElementById('nominal');

// Produk berdasarkan operator
const products = {
    Telkomsel: [
        { sku: 'ist5', name: '10.000' },
        { sku: 'tks20', name: '20.000' },
    ],
    Indosat: [
        { sku: 'ims10', name: '10.000' },
        { sku: 'ims20', name: '20.000' },
    ],
    XL: [
        { sku: 'xl10', name: '10.000' },
        { sku: 'xl20', name: '20.000' },
    ],
    Smartfren: [
        { sku: 'sf10', name: '10.000' },
        { sku: 'sf20', name: '20.000' },
    ],
    Axis: [
        { sku: 'ax10', name: '10.000' },
        { sku: 'ax20', name: '20.000' },
    ],
    Unknown: [
        { sku: '', name: 'Nominal tidak tersedia' },
    ],
};

// Fungsi untuk mendeteksi operator
const detectOperator = async (phone) => {
    if (!phone) return;

    try {
        const response = await fetch('/detect-operator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone }),
        });

        const data = await response.json();
        if (response.ok) {
            updateProductOptions(data.operator);
        } else {
            console.error('Gagal mendeteksi operator:', data.error);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Fungsi untuk memperbarui daftar produk
const updateProductOptions = (operator) => {
    nominalSelect.innerHTML = ''; // Kosongkan dropdown
    const operatorProducts = products[operator] || products.Unknown;

    operatorProducts.forEach((product) => {
        const option = document.createElement('option');
        option.value = product.sku;
        option.textContent = product.name;
        nominalSelect.appendChild(option);
    });
};

// Tambahkan event listener untuk mendeteksi perubahan pada input nomor telepon
phoneInput.addEventListener('input', () => {
    const phone = phoneInput.value;
    if (phone.length >= 4) {
        detectOperator(phone);
    }
});
