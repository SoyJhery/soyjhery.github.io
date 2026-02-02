const banks = [
    { code: '0102', name: 'Banco de Venezuela' },
    { code: '0105', name: 'Banco Mercantil' },
    { code: '0134', name: 'Banesco' },
    { code: '0108', name: 'Banco Provincial' },
    { code: '0114', name: 'Bancaribe' },
    { code: '0115', name: 'Banco Exterior' },
    { code: '0116', name: 'Banco Occidental de Descuento (BOD)' },
    { code: '0128', name: 'Banco Caroní' },
    { code: '0137', name: 'Banco Sofitasa' },
    { code: '0138', name: 'Banco Plaza' },
    { code: '0151', name: 'BFC Banco Fondo Común' },
    { code: '0156', name: '100% Banco' },
    { code: '0157', name: 'DelSur' },
    { code: '0163', name: 'Banco del Tesoro' },
    { code: '0166', name: 'Banco Agrícola de Venezuela' },
    { code: '0168', name: 'Bancrecer' },
    { code: '0169', name: 'Mi Banco' },
    { code: '0171', name: 'Banco Activo' },
    { code: '0172', name: 'Bancamiga' },
    { code: '0174', name: 'Banplus' },
    { code: '0175', name: 'Banco Bicentenario' },
    { code: '0177', name: 'Banfanb' },
    { code: '0191', name: 'Banco Nacional de Crédito' }
];

document.addEventListener('DOMContentLoaded', () => {
    const bankSelect = document.getElementById('bank');
    const typeSelect = document.getElementById('type');
    const idInput = document.getElementById('id-number');
    const areaCodeSelect = document.getElementById('area-code');
    const phoneNumberInput = document.getElementById('phone-number');
    const payButton = document.getElementById('pay-button');

    // Populate banks
    // Sort banks alphabetically for better UX, but keep BDV first ideally or common ones.
    // Let's just sort alphabetically.
    const sortedBanks = [...banks].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedBanks.forEach(bank => {
        const option = document.createElement('option');
        option.value = bank.code;
        option.textContent = `${bank.name} (${bank.code})`;
        bankSelect.appendChild(option);
    });

    // Set default bank to Venezuela if exists
    bankSelect.value = '0102';

    const getLink = () => {
        const type = typeSelect.value;
        const id = idInput.value.trim();
        const area = areaCodeSelect.value;
        const phone = phoneNumberInput.value.trim();
        const bank = bankSelect.value;

        // Base URL from requirements
        // https://bdvdigital.banvenez.com/pagomovil?id=(Tipo)(Cedula)&phone=58(FullPhone)&bank=(BankCode)&description=...
        
        let fullPhone = '';
        if (phone) {
             // Basic validation/cleaning
             fullPhone = area + phone;
        }

        const baseUrl = 'https://bdvdigital.banvenez.com/pagomovil';
        const description = '9dxBliWt4XnVSB0LTqNasQ%3D%3D'; // Fixed description as provided
        
        const params = new URLSearchParams();
        params.append('id', `${type}${id}`);
        params.append('phone', `58${fullPhone}`);
        params.append('bank', bank);
        
        // The prompt url has description directly, but we can append it safer or just string concat to match exactly
        // URLSearchParams encodes the value, the provided description looks already encoded? 
        // 9dxBliWt4XnVSB0LTqNasQ%3D%3D decodes to something binary or encrypted. 
        // Let's assume we need to pass it exactly as is.
        
        // Construct manually to match the exact format requested
        const finalUrl = `${baseUrl}?id=${type}${id}&phone=58${fullPhone}&bank=${bank}&description=${description}`;
        
        return finalUrl;
    };

    const updateLink = () => {
        const url = getLink();
        payButton.href = url;
        // console.log('Updated Link:', url); // Debug
    };

    // Listeners
    [typeSelect, idInput, areaCodeSelect, phoneNumberInput, bankSelect].forEach(el => {
        el.addEventListener('input', updateLink);
        el.addEventListener('change', updateLink);
    });

    // Initial update
    updateLink();
});
