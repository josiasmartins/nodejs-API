/**
 * 0 Obter o usuario
 * 1 Obter o numero de telefone de um usuario a partir de seu Id
 * 2 Obter o endereco do usuario pelo Id
 */

function getUser(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Ibag',
            dataDeNascimento: new Date()
        })
    }, 1000)
}
function getPhone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            phone: '1123233',
            ddd: 11
        })
    }, 2000);
}
function getAdress(idUsuario, callback) {
    setTimeout(function() {
        
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

function resolveUser(erro, user) {

    console.log('usuario', user);
}

getUser(function resolveUsuario(error, usuario) {
    // null || "" || 0 === false
    if (error) {
        console.log('Deu ruim', error);
        return;
    }
    getPhone(usuario.id, function resolveTelefone(error1, phone) {
        if (error1) {
            console.log('Deu ruim', error);
            return;
        }
        getAdress(usuario.id, function resolveAdress(error2, adress) {
            if (error2) {
                console.log('Deu ruim', error);
                return;
            }

            console.log(`
             Nome: ${usuario.nome},
             Endereco: ${adress.rua}, ${adress.numero},
             Telefone: (${phone.ddd})${phone.phone}
            `)
        })
    })
})
// const phone = getPhone(user.id);

// console.log('usuario', phone);