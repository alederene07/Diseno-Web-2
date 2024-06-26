$(document).ready(function () {
    //  cargar personas al cargar la página
    function loadPersons() {
        $.ajax({
            url: 'read.php',
            type: 'GET',
            success: function (response) {
                let persons = JSON.parse(response);
                let output = '';
                for (let i = 0; i < persons.length; i++) {
                    let person = persons[i];
                    output += `<tr id="row-${person.id}">
                        <td>${person.id}</td>
                        <td><span id="doce_nombre_${person.id}">${person.doce_nombre}</span><input type="text" class="form-control edit-input" id="edit_doce_nombre_${person.id}" value="${person.doce_nombre}" style="display:none;"></td>
                        <td><span id="doce_apellido_${person.id}">${person.doce_apellido}</span><input type="text" class="form-control edit-input" id="edit_doce_apellido_${person.id}" value="${person.doce_apellido}" style="display:none;"></td>
                        <td><span id="per_cumple_${person.id}">${person.per_cumple}</span><input type="date" class="form-control edit-input" id="edit_per_cumple_${person.id}" value="${person.per_cumple}" style="display:none;"></td>
                        <td><span id="per_mail_${person.id}">${person.per_mail}</span><input type="email" class="form-control edit-input" id="edit_per_mail_${person.id}" value="${person.per_mail}" style="display:none;"></td>
                        <td><span id="doce_cel_${person.id}">${person.doce_cel}</span><input type="text" class="form-control edit-input" id="edit_doce_cel_${person.id}" value="${person.doce_cel}" style="display:none;"></td>
                        <td>
                            <button class="btn btn-warning btn-edit" data-id="${person.id}">Editar</button>
                            <button class="btn btn-success btn-save" data-id="${person.id}" style="display:none;">Guardar</button>
                            <button class="btn btn-danger btn-delete" data-id="${person.id}">Eliminar</button>
                        </td>
                    </tr>`;
                }
                $('#personTable').html(output);
            }
        });
    }

    loadPersons(); //// cargar la página

    
    $(document).on('click', '.btn-edit', function () {
        let id = $(this).data('id');

        
        $(`#row-${id}`).find('span').hide();
        $(`#row-${id}`).find('.edit-input').show();

        
        $(`#row-${id}`).find('.btn-edit').hide();
        $(`#row-${id}`).find('.btn-save').show();
    });

    // guardar los cambios editados
    $(document).on('click', '.btn-save', function () {
        let id = $(this).data('id');
        let nombre = $(`#edit_doce_nombre_${id}`).val();
        let apellido = $(`#edit_doce_apellido_${id}`).val();
        let cumple = $(`#edit_per_cumple_${id}`).val();
        let mail = $(`#edit_per_mail_${id}`).val();
        let cel = $(`#edit_doce_cel_${id}`).val();

        // actualizar datos en la tabla 
        $(`#doce_nombre_${id}`).text(nombre);
        $(`#doce_apellido_${id}`).text(apellido);
        $(`#per_cumple_${id}`).text(cumple);
        $(`#per_mail_${id}`).text(mail);
        $(`#doce_cel_${id}`).text(cel);

        
        $(`#row-${id}`).find('.edit-input').hide();
        $(`#row-${id}`).find('span').show();

        $(`#row-${id}`).find('.btn-save').hide();
        $(`#row-${id}`).find('.btn-edit').show();

        // enviar datos a XAMPP
        $.post('update.php', {
            id: id,
            doce_nombre: nombre,
            doce_apellido: apellido,
            per_cumple: cumple,
            per_mail: mail,
            doce_cel: cel
        }, function (response) {
            alert(response); 
        });
    });

    $(document).on('click', '.btn-cancel', function () {
        let id = $(this).data('id');
        $(`#row-${id}`).find('.edit-input').hide();
        $(`#row-${id}`).find('span').show();
        $(`#row-${id}`).find('.btn-save').hide();
        $(`#row-${id}`).find('.btn-edit').show();
    });
    $(document).on('click', '.btn-delete', function () {
        let id = $(this).data('id');
        if (confirm("¿Estás seguro de eliminar este registro?")) {
            $.post('delete.php', { id: id }, function (response) {
                alert(response); 
                loadPersons(); 
            });
        }
    });
    
    
    $('#personForm').submit(function (e) {
        e.preventDefault();
        
        let nombre = $('#doce_nombre').val();
        let apellido = $('#doce_apellido').val();
        let cumple = $('#per_cumple').val();
        let mail = $('#per_mail').val();
        let cel = $('#doce_cel').val();
        
        $.post('create.php', {
            doce_nombre: nombre,
            doce_apellido: apellido,
            per_cumple: cumple,
            per_mail: mail,
            doce_cel: cel
        }, function (response) {
            alert(response); 
            loadPersons(); 
            $('#personForm')[0].reset(); 
        });
    });
});
