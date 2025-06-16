async function cargarInvitaciones() {
      try {
        const respuesta = await fetch('/listainvitados', {
          method: 'POST',
          credentials: 'include'
        });
        const datos = await respuesta.json();

        const ul = document.getElementById('lista-invitaciones');
        ul.innerHTML = '';

        if (datos.length === 0) {
          ul.innerHTML = "<li>No tienes invitaciones pendientes</li>";
          return;
        }

        for (const partida of datos) {
          const li = document.createElement('li');
          li.innerHTML = `
            Partida: ${partida.nombreP} - Tipo: ${partida.tipo}
            <button onclick="aceptarInvitacion('${partida._id}')">Aceptar</button>
          `;
          ul.appendChild(li);
        }
      } catch (err) {
        console.error("Error al cargar invitaciones", err);
      }
    }

    // Función para aceptar una invitación
    async function aceptarInvitacion(idPartida) {
      try {
        const respuesta = await fetch('/aceptarInvitacion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ partidaId: idPartida })
        });

        const texto = await respuesta.text();
        alert(texto);
        cargarInvitaciones(); // actualizamos lista
      } catch (error) {
        console.error("Error al aceptar la invitación:", error);
        alert("Hubo un error");
      }
    }

    cargarInvitaciones(); // Ejecutar al cargar la página