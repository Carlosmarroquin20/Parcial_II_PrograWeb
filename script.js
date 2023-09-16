document.addEventListener('DOMContentLoaded', function () {
    const tablaLink = document.getElementById('tabla-link');
    const cardsLink = document.getElementById('cards-link');
    const relojLink = document.getElementById('reloj-link');
    const contenido = document.querySelector('.contenido');
    const tiempoReloj = document.getElementById('tiempo-reloj'); // Elemento para mostrar el tiempo
    let segundosTranscurridos = 0; // Variable para almacenar los segundos transcurridos
    let relojActivado = false; // Variable para controlar si el reloj está activado

    tablaLink.addEventListener('click', function (event) {
        event.preventDefault();
        fetchTableData();
    });

    cardsLink.addEventListener('click', function (event) {
        event.preventDefault();
        createCardColumns();
    });

    relojLink.addEventListener('click', function (event) {
        event.preventDefault();
        if (!relojActivado) {
            relojActivado = true;
            contenido.innerHTML = ''; // Limpiar cualquier contenido existente
            segundosTranscurridos = 0; // Reiniciar los segundos transcurridos
            addClock();
        } else {
            // Si el reloj está activado y se hace clic nuevamente en "Reloj", reiniciar desde cero
            segundosTranscurridos = 0;
            tiempoReloj.textContent = 'Has presionado el botón Reloj desde hace 0 segundos';
        }
    });

    function fetchTableData() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(data => createTable(data))
            .catch(error => console.error('Error:', error));
    }

    function createTable(data) {
        contenido.innerHTML = ''; // Limpiar el contenido existente

        // Agregar el título antes de la tabla
        const titulo = document.createElement('h1');
        titulo.textContent = 'Segundo Parcial Desarrollo Web';
        contenido.appendChild(titulo);

        const table = document.createElement('table');
        table.classList.add('table'); // Agregar una clase para estilos
        const thead = table.createTHead();
        const tbody = table.createTBody();

        // Crear la fila de encabezado con nombres de columnas
        const headerRow = thead.insertRow();
        for (const key in data[0]) {
            const th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }
        const thEliminar = document.createElement('th'); // Columna para el botón eliminar
        thEliminar.textContent = 'Eliminar';
        headerRow.appendChild(thEliminar);

        // Crear filas de datos
        data.forEach(function (item) {
            const row = tbody.insertRow();
            for (const key in item) {
                const cell = row.insertCell();
                cell.textContent = item[key];
            }

            const deleteCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', function () {
                deleteRow(row);
            });
            deleteCell.appendChild(deleteButton);
        });

        contenido.appendChild(table); // Agregar la tabla al área de contenido
    }

    function deleteRow(row) {
        row.parentElement.removeChild(row);
    }

    function createCardColumns() {
        contenido.innerHTML = ''; // Limpiar el contenido existente

        const titulo = document.createElement('h1');
        titulo.textContent = 'Segundo Parcial Desarrollo Web';
        contenido.appendChild(titulo);

        // Crear columnas de tarjetas
        for (let i = 1; i <= 3; i++) {
            const columna = document.createElement('div');
            columna.classList.add('columna');
            const columnaTitulo = document.createElement('h2');
            columnaTitulo.textContent = `Columna ${i}`;
            const nuevaTareaBtn = document.createElement('button');
            nuevaTareaBtn.classList.add('nueva-tarea-btn');
            nuevaTareaBtn.textContent = 'Nueva tarea';
            const nuevaTareaForm = document.createElement('div');
            nuevaTareaForm.classList.add('nueva-tarea-form');
            nuevaTareaForm.style.display = 'none';
            const tareaInput = document.createElement('textarea');
            tareaInput.classList.add('tarea-input');
            tareaInput.placeholder = 'Escribe una tarea';
            const confirmarTareaBtn = document.createElement('button');
            confirmarTareaBtn.classList.add('confirmar-tarea-btn');
            confirmarTareaBtn.textContent = 'Confirmar';

            nuevaTareaBtn.addEventListener('click', function () {
                nuevaTareaForm.style.display = 'block';
            });

            confirmarTareaBtn.addEventListener('click', function () {
                const tareaTexto = tareaInput.value;
                if (tareaTexto.trim() !== '') {
                    const tarjeta = document.createElement('div');
                    tarjeta.classList.add('tarjeta');
                    tarjeta.textContent = tareaTexto;
                    nuevaTareaForm.style.display = 'none';
                    columna.appendChild(tarjeta);
                }
            });

            nuevaTareaForm.appendChild(tareaInput);
            nuevaTareaForm.appendChild(confirmarTareaBtn);

            columna.appendChild(columnaTitulo);
            columna.appendChild(nuevaTareaBtn);
            columna.appendChild(nuevaTareaForm);

            contenido.appendChild(columna);
        }
    }    function addClock() {
        const titulo = document.createElement('h1');
        titulo.textContent = 'Reloj En Accion en el Footer ↓';
        contenido.appendChild(titulo);

        // Función para actualizar el tiempo transcurrido
        function actualizarTiempo() {
            segundosTranscurridos++;
            tiempoReloj.textContent = `Has presionado el botón Reloj desde hace ${segundosTranscurridos} segundos`;
        }

        // Actualizar el tiempo cada segundo
        setInterval(actualizarTiempo, 1000);
    }
});