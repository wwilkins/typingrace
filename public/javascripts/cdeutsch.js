
$(document).ready(function(e){

	if (TR === undefined) {
		TR = {};
	};

	TR.initSound(function() {

		var sounds = [];

		sounds.push({
			id: 'theme',
			url: 'sounds/kombat.mp3',
			autoLoad: true
		});

		sounds.push({
			id: 'punch',
			url: 'sounds/Punch.mp3',
			autoLoad: true
		});

		sounds.push({
			id: 'gong',
			url: 'sounds/Asian-Gong-Hit.mp3',
			autoLoad: true
		});

		sounds.push({
			id: 'sword1',
			url: 'sounds/Ninja-Samurai-Sword.mp3',
			autoLoad: true
		});

		sounds.push({
			id: 'sword2',
			url: 'sounds/Swords-Clashing.mp3',
			autoLoad: true
		});

		sounds.push({
			id: 'shuriken',
			url: 'sounds/Thrown-Shuriken.mp3',
			autoLoad: true
		});

		TR.preloadSounds(sounds, function() {
			//TR.playSound(('theme'));

			var playing = false;

			$(document).on('keyup', function(e) {
				if (!playing) {
					var sound = '';
					switch(Math.floor(Math.random()*10+1)) {
						case 1:
						case 2:
							sound = 'shuriken';
							break;
						case 3:
						case 4:
							sound = 'sword1';
							break;
						case 5:
						case 6:
						case 7:
							sound = 'sword2';
							break;
						case 8:
						case 9:
						case 10:
							sound = 'punch';
							break;
					}
					if (sound) {
						playing = true;
						// TR.playSound(sound, function() { playing = false; });
					}


				}

			});
		});
	});

});