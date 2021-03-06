#! /usr/bin/env node

console.log('This script populates some tiposDeQuarto, hoteis and quartosInstance to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async');
var quartoInstance = require('./models/quartoinstance');
var TipoDeQuarto = require('./models/tipoDeQuarto');
var Hotel = require('./models/hotel');

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var MongoClient = require('mongodb').MongoClient;
var tiposDeQuarto = []
var hoteis = []
var quartosInstance = []

function tipoQuartoCreate(tipo,nQuarto, servicos, precoEpocaAlta, precoEpocaBaixa, cb) {
  tipoQuartoDetail = {tipo: tipo, nQuarto: nQuarto, servicos: servicos, precoEpocaAlta: precoEpocaAlta, precoEpocaBaixa: precoEpocaBaixa}
  
  var tipoQuarto = new TipoDeQuarto(tipoQuartoDetail);
       
  tipoQuarto.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New tipoQuarto: ' + tipoQuarto);
    tiposDeQuarto.push(tipoQuarto)
    cb(null, tipoQuarto)
  }  );
}

function hotelCreate(nome, morada, mail, coordenadas, telefone, ntotal, quarto, descricao, servicos, imagens, cb) {
  hotelDetail = {nome: nome, morada: morada, mail: mail, coordenadas: coordenadas, 
    telefone: telefone, ntotal: ntotal, quarto: quarto, descricao: descricao, servicos: servicos,imagens: imagens}
  var hotel = new Hotel(hotelDetail);

  hotel.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New hotel: ' + hotel);
    hoteis.push(hotel)
    cb(null, hotel);
  }   );
}

function quartoInstanceCreate(quarto, status, dataInicio, dataFinal, cb) {
  quartoDetail = {
    quarto: quarto,
    status: status,
    dataInicio: dataInicio,
    dataFinal: dataFinal
  }
  var quartoinstance = new quartoInstance(quartoDetail);    
  quartoinstance.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
      console.log('New quarto: ' + quartoinstance);
      quartosInstance.push(quartoinstance)
      cb(null, quartoinstance)
    
    
  }  );
}

function createTiposDeQuarto(cb) {
  async.series([
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televis??o LED', 'Canais por cabo', 'Mini-bar', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletr??nica de seguran??a', 'Roup??o e chinelos', 'Maquina de caf??']
        tipoQuartoCreate('Standard', 3, servicos, 270, 180, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televis??o LED', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletr??nica de seguran??a', 'Sala-de-estar', 'Roup??o e chinelos', 'Maquina de caf??']
        tipoQuartoCreate('Su??te', 1, servicos, 330, 250, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televis??o LED', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos',
        'Servi??o de quarto 24 horas', 'Fechadura eletr??nica de seguran??a', 'Sala-de-estar', 'Roup??o e chinelos', 'Maquina de caf??']
        tipoQuartoCreate('Su??te Duplex', 1 ,servicos, 350, 270, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televis??o LED', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de higiene pessoal gratuitos',
        'Servi??o de quarto 24 horas', 'Fechadura eletr??nica de seguran??a', 'Sala-de-estar', 'Roup??o e chinelos', 'Maquina de caf??']
        tipoQuartoCreate('Su??te Deluxe', 1,servicos, 450, 310, callback);
      },  
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televis??o LCD', 'Canais por cabo', 'Mini-bar', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletr??nica de seguran??a', 'Servi??o de quarto 24 horas', 'Chaleira']
        tipoQuartoCreate('Standard', 182,servicos, 160, 90, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televis??o LCD', 'Canais por cabo', 'Mini-bar', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletr??nica de seguran??a', 'Servi??o de quarto 24 horas', 'Sala-de-estar', 'Chaleira']
        tipoQuartoCreate('Su??te Junior',  5 ,servicos, 180, 120, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gratuito', 'Ar condicionado', 'Televis??o LCD', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Produtos de higiene pessoal gratuitos',
        'Fechadura eletr??nica de seguran??a', 'Servi??o de quarto 24 horas', 'Sala-de-estar', 'Varanda', 'Chaleira']
        tipoQuartoCreate('Su??te Junior Superior', 15, servicos, 210, 130, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gr??tis', 'Ar condicionado', 'Televis??o LCD', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de Higiene Pessoal Gratuitos',
        'Kitchenette', 'Fechadura Eletr??nica de seguran??a', 'Servi??o de Quarto 24 horas', 'Frigor??fico', 'Micro-ondas', 'Chaleira']
        tipoQuartoCreate('Standard', 114, servicos, 210, 70, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gr??tis', 'Ar condicionado', 'Televis??o LCD', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de Higiene Pessoal Gratuitos',
        'Kitchenette', 'Fechadura Eletr??nica de seguran??a', 'Servi??o de Quarto 24 horas', 'Varanda', 'Frigor??fico', 'Micro-ondas', 'Sala-de-estar', 'Chaleira']
        tipoQuartoCreate('Su??te Junior', 98, servicos, 250, 90, callback);
      },
      function(callback) {
        var servicos = ['Telefone', 'Wi-fi gr??tis', 'Ar condicionado', 'Televis??o LCD', 'Canais por cabo', 'Cofre',
        'Casa de banho privativa com telefone', 'Secador de cabelo', 'Espelho de maquilhagem', 'Produtos de Higiene Pessoal Gratuitos',
        'Kitchenette', 'Fechadura Eletr??nica de seguran??a', 'Servi??o de Quarto 24 horas', 'Sala-de-estar', 'Sof??-cama', 'Varanda', 'Frigor??fico', 'Micro-ondas', 'Chaleira']
        tipoQuartoCreate('Su??te S??nior', 8, servicos, 240, 120, callback);
      }
      ],
      // optional callback
      cb);
}

function createquartosInstance(cb) {
  async.series([ 
      function(callback) {
        for (i = 0; i < 2; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[0], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[0],'Available',null,null, callback);
      },
      function(callback) {
        quartoInstanceCreate(tiposDeQuarto[1],'Available', null, null, callback);
      },
      function(callback) {
        quartoInstanceCreate(tiposDeQuarto[2],'Available', null, null, callback);
      },
      function(callback) {
        quartoInstanceCreate(tiposDeQuarto[3],'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 181; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[4], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[4], 'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 4; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[5], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[5], 'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 14; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[6], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[6], 'Available', null, null, callback);
      },
    
      function(callback) {
        for (i = 0; i < 113; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[7], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[7], 'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 97; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[8], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[8], 'Available', null, null, callback);
      },
      function(callback) {
        for (i = 0; i < 7; i++){
          MongoClient.connect(mongoDB, function(err, db) {
            if (err) throw err;
            var dbo = db.db("");
            var qd = {quarto: tiposDeQuarto[9], status: 'Available', dataInicio: null, dataFinal: null};
            var q = new quartoInstance(qd);
            dbo.collection("quartoinstances").insertOne(q, function(err, res) {
              if (err) throw err;
              db.close();
            });
          });
        }
        quartoInstanceCreate(tiposDeQuarto[9], 'Available', null, null, callback);
      }
    ],
    // optional callback
    cb);
}

function createHotel(cb) {
    async.series([
      function(callback) {
        var morada = 'Hotel Douro Vinhas, Quinta do Moreira ??? Marmelal, 5110-672 Armamar, Portugal'
        var quarto = [tiposDeQuarto[0], tiposDeQuarto[1], tiposDeQuarto[2], tiposDeQuarto[3]]
        var descricao = 'Com uma vista de cortar o f??lego para o Rio Douro e para o Rio Tedo, ?? no cora????o do Douro Vinhateiro que surge o Hotel Douro Vinhas. Com uma forte componente de agro e enoturismo, esta unidade estende-se pela centen??ria Quinta do Moreira.\n' + 
        'Na margem sul do Douro, perto da pitoresca aldeia do Marmelal, a propriedade que acolhe o Hotel Douro Vinhas fica muito pr??xima de um dos dois marcos mandados construir pelo Marqu??s de Pombal em 1757. Classificados como im??veis de interesse p??blico, serviam\n' + 
        'para demarcar a zona dos vinhos generosos do Douro, ?? ??poca sob jurisdi????o da Companhia Geral da Agricultura das Vinhas Douro. Nascia assim a primeira regi??o demarcada de vinhos do mundo. Hoje, os vinhedos em socalcos tornam ??nica a paisagem que rodeia esta unidade.\n' +
        'Numa primeira fase com apenas sete quartos, o Hotel Douro Vinhas distingue-se pela localiza????o, pelo charme e pela exclusividade. Aqui poder?? desfrutar da calma e do sil??ncio, do cen??rio, mas tamb??m a piscina exterior, da gastronomia regional do restaurante Moreira,\n' + 
        'cujos grandes janel??es permitem admirar a envolvente. Mas tamb??m das visitas ?? adega e provas de vinhos do Porto, produzidos no local. Poder?? ainda aproveitar para passear entre as vinhas, pelo olival ou pelo amendoal (particularmente bonito durante as amendoeiras em flor),\n' +
        'sempre com o Tedo e o Douro como companhia. Para completar a estadia, fa??a um cruzeiro fluvial, visite as quintas vin??colas da regi??o ou fa??a um passeio de comboio. Ver as amendoeiras em flor ou participar nas vindimas s??o outras sugest??es.'
        var servicos = ['Adega Moreira', 'Acesso gratuito ?? internet via wi-fi', 'Servi??o de lavandaria', 'Acessos para pessoas com mobilidade reduzida', 'Rece????o 24 horas', 'Biblioteca']
        var imagens = ['public/images/Hotel1/1.jpg', 'public/images/Hotel1/2.jpg', 'public/images/Hotel1/3.jpg', 'public/images/Hotel1/4.jpg', 'public/images/Hotel1/5.jpg', 'public/images/Hotel1/6.jpg', 'public/images/Hotel1/7.jpg', 'public/images/Hotel1/8.jpg', 'public/images/Hotel1/9.jpg', 'public/images/Hotel1/10.jpg']
        hotelCreate('Douro Vinhas', morada, 'dourovinhas@hoteispsi.com', '41??09\'26.0"N 7??38\'26.0"W', '(+351) 254 249 000', 6, quarto, descricao, servicos, imagens, callback);
      },
      function(callback) {
        var morada = 'Hotel A Ver o Mar, Largo dos Navegantes, 2655-320 Ericeira, PORTUGAL'
        var quarto = [tiposDeQuarto[4], tiposDeQuarto[5], tiposDeQuarto[6]]
        var descricao = 'Situado na pitoresca vila da Ericeira, mesmo em cima da praia, este hotel com hist??ria e tradi????o, que resulta da reabilita????o do marcante Hotel de Turismo da Ericeira, tem como cen??rio o Oceano Atl??ntico.\n' +
        'A 30 minutos de Lisboa, com acesso direto por autoestrada, o hotel A Ver o Mar disp??e de quatro tipologias de quarto, destacando-se os que t??m varanda e vista para o mar. Este hotel na Ericeira inclui um restaurante, dois bares, '+  
        'salas para eventos e reuni??es empresariais, clube de crian??as e parque infantil e um moderno clube de sa??de com salas de massagens, jacuzzi, sauna, banho turco e gin??sio.\n' +
        'Durante a sua estadia no hotel A Ver o Mar, n??o deixe de dar um mergulho nas duas piscinas para adultos, uma das quais de ??gua salgada. J?? as crian??as v??o adorar os escorregas aqu??ticos.\n' +
        'Partindo deste hotel na Ericeira, aventure-se a conhecer as praias da regi??o. E saiba que se apreciar desportos de ondas, est?? em plena reserva mundial de surf, e palco de uma das etapas do circuito WSL World Tour que junta os ' +
        'melhores surfistas do mundo. Pode ainda visitar o Pal??cio Nacional de Mafra ou Sintra, a 20 minutos de dist??ncia do hotel A Ver o Mar, de carro.\n' +
        'No ver??o, a anima????o da vila aumenta gra??as a v??rios festivais, entre os quais um dedicado exclusivamente ?? m??sica reggae.'
        var servicos = ['Jardins e espa??os exteriores', 'Piscina exterior para adultos e crian??as', 'Acesso gratuito ?? internet via wi-fi', 'Parque de estacionamento', 
                        'Nep Kids Club', 'Parque infantil', 'Sala de jogos', 'Servi??o de lavandaria', 'Acessos para pessoas com mobilidade reduzida', 'Clube de sa??de', 'Rece????o 24 horas']
        var imagens = ['public/images/Hotel2/1.jpg', 'public/images/Hotel2/2.jpg', 'public/images/Hotel2/3.jpg', 'public/images/Hotel2/4.jpg', 'public/images/Hotel2/5.jpg', 'public/images/Hotel2/6.jpg', 'public/images/Hotel2/7.jpg', 'public/images/Hotel2/8.jpg', 'public/images/Hotel2/9.jpg', 'public/images/Hotel2/10.jpg']
        hotelCreate('A Ver o Mar', morada, 'averomar@hoteispsi.com', '38??57\'56.0"N 9??25\'09.0"W', '(+351) 261 869 700', 202, quarto, descricao, servicos, imagens, callback);
      },
      function(callback) {
        var morada = 'Hotel Mediterr??neo, Praia da Gal??, 8200-995 Albufeira, PORTUGAL'
        var quarto = [tiposDeQuarto[7], tiposDeQuarto[8], tiposDeQuarto[9]]
        var descricao = 'Encontrar?? o Hotel Mediterr??neo mesmo junto ?? praia e apenas a cinco minutos do centro de Albufeira, no Algarve.\n' +
        'Este hotel em Albufeira oferece quartos modernos e amplos, dos quais se destacam os com vista para o mar ou as su??tes. Todos t??m kitchenette, sendo ideais para fam??lias com crian??as.\n' + 
        'Conta ainda com um bar, um restaurante com buffet internacional e piscinas exteriores para adultos e crian??as, prometendo dias de muito sol e anima????o. Tem ainda uma sala de jogos, parque infantil, clube de crian??as com atividades ' +
        'para os mais novos e animadores pr??prios, spa com piscina interior, banho turco e jacuzzi, salas de massagem, gin??sio e wi-fi gratuito em todas as zonas.\n' +
        'Durante a sua estadia aproveite para conhecer as irresist??veis praias de Albufeira, aventurar-se em desportos n??uticos ou desfrutar das animadas ruas da cidade, repletas de bares, restaurantes e com??rcio, ou passear na marina.\n' +
        'Pode tamb??m visitar diferentes parques tem??ticos como o Zoomarine, Aqualand e Aquashow.'
        var servicos = ['Jardins e espa??os exteriores', 'Piscina exterior para adultos e crian??as', 'Acesso gratuito ?? internet via wi-fi', 'Parque de estacionamento', 
                        'Nep Kids Club', 'Parque infantil', 'Sala de jogos', 'Servi??o de lavandaria', 'Acessos para pessoas com mobilidade reduzida', 'Clube de Sa??de',
                        'Rece????o 24 horas', 'Lojas']
        var imagens = ['public/images/Hotel3/1.jpg', 'public/images/Hotel3/2.jpg', 'public/images/Hotel3/3.jpg', 'public/images/Hotel3/4.jpg', 'public/images/Hotel3/5.jpg', 'public/images/Hotel3/6.jpg','public/images/Hotel3/7.jpg', 'public/images/Hotel3/8.jpg', 'public/images/Hotel3/9.jpg', 'public/images/Hotel3/10.jpg']               
        hotelCreate('Mediterr??neo', morada, 'mediterraneo@hoteispsi.com', '37??04\'55.0"N 8??19\'03.0"W', '(+351) 289 570 700', 220, quarto, descricao, servicos, imagens, callback);
      }
      ],
      // Optional callback
      cb);
}

async.series([
  createTiposDeQuarto,
  createquartosInstance,
  createHotel
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('H??teis: ' + hoteis);     
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




