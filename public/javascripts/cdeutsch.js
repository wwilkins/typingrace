$(document).ready(function(e){



	TR.initSound(function() {

		var sounds = [];

		sounds.push({
			id: 'theme',
			url: 'sounds/kombat.mp3',
			autoLoad: true
		});

		TR.preloadSounds(sounds, function() {
			TR.playSound(('theme'));
		});
	});

});