/**
 * 0 Obter o usuario
 * 1 Obter o numero de telefone de um usuario a partir de seu Id
 * 2 Obter o endereco do usuario pelo Id
 */

// importamos um módulo interno do node.js;
const util = require('util');
const obterEnderecoAsync = util.promisify(getAdress());

function getUser(callback) {
    // quando der algum problea -> reject(ERRO);
    // quando for sucesso -> RESOLVE
    return new Promise(function resolvePromise(resolve, reject) {

        setTimeout(function () {
            // return reject(new Error('Deu ruim de verdade'));

            return resolve({
                id: 1,
                nome: 'Ibag',
                dataDeNascimento: new Date()
            })
        }, 1000)
    })
}
function getPhone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            phone: '1123233',
            ddd: 11
        })
    }, 2000);
}
function getAdress(idUsuario) {

    return new Promise(function resolverPromise(resolve, reject) {

        setTimeout(function() {
            
            return resolve({
                rua: 'dos bobos',
                numero: 0
            })
        }, 2000)
    })
}

const usuarioPromise = getUser();
// para manipular o sucesso, usamos a função .then
// para manipular os errros, usamos o .catch
// usuario -> telefone -> telefone
usuarioPromise
    .then(function (usuario) {
        return getUser(usuario.id) 
            .then(function resolveTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result,
                }
            }) 
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id);
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: resultado
            }
        });
    })
    .then(function (resultado) {
    console.log('resultado', resultado);
    })
    .catch(function (error) {
    console.error('DEU RUIM', error);
})

// function resolveUser(erro, user) {

//     console.log('usuario', user);
// }

// getUser(function resolveUsuario(error, usuario) {
//     // null || "" || 0 === false
//     if (error) {
//         console.log('Deu ruim', error);
//         return;
//     }
//     getPhone(usuario.id, function resolveTelefone(error1, phone) {
//         if (error1) {
//             console.log('Deu ruim', error);
//             return;
//         }
//         getAdress(usuario.id, function resolveAdress(error2, adress) {
//             if (error2) {
//                 console.log('Deu ruim', error);
//                 return;
//             }

//             console.log(`
//              Nome: ${usuario.nome},
//              Endereco: ${adress.rua}, ${adress.numero},
//              Telefone: (${phone.ddd})${phone.phone}
//             `)
//         });
//     });
// });
// const phone = getPhone(user.id);

// console.log('usuario', phone);