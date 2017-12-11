var Client = require('castv2-client').Client;
var DefaultMediaReceiver = require('castv2-client').DefaultMediaReceiver;
var GoogleTTS = require('google-tts-api');
var AssistantNotifier = function(configuration) {
  this.host = configuration.host;
  this.sounds = configuration.sounds;
};
AssistantNotifier.prototype.init = function(plugins) {
  this.plugins = plugins;
  if (!this.host)
    return Promise.reject(
      '[assistant-notifier] Erreur : vous devez configurer ce plugin !'
    );
  return Promise.resolve(this);
};

/**
 * Fonction utilisée pour faire lire un texte
 *
 * @param {String} text Le texte à lire (par exemple: "bonjour et bienvenue")
 */
AssistantNotifier.prototype.play = function(url) {
  var _this = this;
  return new Promise(function(prom_res) {
    var client = new Client();
    client.connect(_this.host, function() {
      client.launch(DefaultMediaReceiver, function(err, player) {
        var media = {
          contentId: url,
          contentType: 'audio/mp3',
          streamType: 'BUFFERED'
        };
        player.load(
          media,
          {
            autoplay: true
          },
          function(err, status) {
            player.on('status', function(status) {
              if (status.playerState == 'IDLE') {
                player.stop();
                client.close();
                prom_res();
              }
            });
          }
        );
      });
    });
  });
};

/**
 * Fonction utilisée pour faire lire un texte
 *
 * @param {String} text Le texte à lire (par exemple: "bonjour et bienvenue")
 */
AssistantNotifier.prototype.getTextUrl = function(text) {
  return GoogleTTS(text, 'fr-FR', 1);
};

/**
 * Fonction appelée pour faire jouer un mp3
 *
 * @param {String} soundKey la clé associée au son à jouer dans l'objet sounds (config)
 */
AssistantNotifier.prototype.getSoundUrl = function(soundKey) {
  var soundUrl = this.sounds[soundKey];
  if (!soundUrl)
    return Promise.reject(
      `[assistant-notifier] Erreur : valeur non trouvée pour la clé suivante '${soundKey}' !`
    );
  return Promise.resolve(soundUrl);
};

/**
 * Fonction appelée par le système central
 *
 * @param {String} action L'action à exécuter (texte ou son)
 */
AssistantNotifier.prototype.action = function(action) {
  var _this = this;
  var type = action.substr(0, action.indexOf(' '));
  var content = action.substr(action.indexOf(' ') + 1);
  var getUrl;
  if (type === 'sound') {
    getUrl = this.getSoundUrl(content);
  } else {
    getUrl = this.getTextUrl(content);
  }
  getUrl.then(function(url) {
    _this.play(url);
  });
};

/**
 * Initialisation du plugin
 *
 * @param  {Object} configuration La configuration
 * @param  {Object} plugins Un objet qui contient tous les plugins chargés
 * @return {Promise} resolve(this)
 */
exports.init = function(configuration, plugins) {
  return new AssistantNotifier(configuration)
    .init(plugins)
    .then(function(resource) {
      console.log('[assistant-notifier] Plugin chargé et prêt.');
      return resource;
    });
};
