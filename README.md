# assistant-notifier

Ce plugin de [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/) permet de faire parler son Google Home.

**Ne pas l'installer si vous ne possédez pas de Google Home !**

## Installation

Si vous n'avez pas installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), alors il faut le faire, et sélectionner **notifier** comme plugin.

Si vous avez déjà installé [`assistant-plugins`](https://aymkdn.github.io/assistant-plugins/), et que vous souhaitez ajouter ce plugin, alors :
  - Pour Windows, télécharger [`install_notifier.bat`](https://github-proxy.kodono.info/?q=https://raw.githubusercontent.com/Aymkdn/assistant-notifier/master/install_notifier.bat&download=install_notifier.bat) dans le répertoire `assistant-plugins`, puis l'exécuter en double-cliquant dessus.  
  - Pour Linux/MacOS, ouvrir une console dans le répertoire `assistant-plugins` et taper :  
  `npm install assistant-notifier@latest --save --loglevel error && npm run-script postinstall`

## Configuration

Éditer le fichier `configuration.json` du répertoire `assistant-plugins` et y indiquer l'adresse IP de votre Google Home.

l'adresse IP de votre Google Home se trouve sur l'application Google Home de votre téléphone :

  1) Ouvrir l'application Google Home  
  2) Cliquer sur l'icône en haut à droite (*un téléviseur avec une enceinte*)  
  3) Votre appareil Google Home devrait apparaitre  
  4) Cliquer sur les *trois points* de votre appareil et choisir **Paramètres**  
  5) Descendre tout en bas jusqu'à la section **Informations**  
  6) Utiliser l'adresse IP qui est donnée (tout en bas)
  
La section du fichier `configuration.json` qui nous intéresse devrait ressembler à la partie ci-dessous (ici on va dire que l'IP est 192.168.0.13) :
```javascript
  "plugins": {
    "notifier": {
      "hosts":"192.168.0.13"
    }
  }
```

## Utilisation

Son intérêt est surtout d'être appelé par les autres plugins (par exemple dans le plugin `assistant-freebox`) grâce à : `this.plugins.notifier("message à faire dire")`

Sinon, depuis IFTTT, voici un exemple de comment procéder :

  1) Suivre la procédure principale pour vérifier que `assistant-plugins` est bien lancé  
  2) Créer une nouvelle *applet* dans IFTTT : [https://ifttt.com/create](https://ifttt.com/create)  
  3) Cliquer sur **this** puis choisir **Google Assistant**  
  4) Choisir la carte **Say a phrase with a text ingredient**  
  5) Dans *« What do you want to say? »* mettre une phrase, par exemple : `répète la phrase $`  
     Le symbôle `$` sera remplacé par Google  
  6) Remplir les autres champs de la carte  
  7) Maintenant, cliquer sur **that** puis choisir **Pushbullet**  
  8) Choisir la carte **Push a Note**  
  9) Dans le champs *« Title »*, mettre `Assistant`  
  10) Dans le champs *« Message »*, mettre `notifier_\{\{TextField\}\}`  
  11) Enregistrer puis cliquer sur **Finish**  
  12) Dites : « OK Google, répète la phrase voilà une belle journée »  
  13) Google Home va dire : « voilà une belle journée »  
