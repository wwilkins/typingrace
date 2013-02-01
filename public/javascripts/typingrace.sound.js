
soundManager.url = 'javascripts/';
soundManager.flashVersion = 9; // optional: shiny features (default = 8)
soundManager.useFlashBlock = false; // optionally, enable when you're ready

TR.soundsPlaying = [];
TR.wasInitialized = false;

TR.initSound = function(callback) {
	if (TR.wasInitialized) {
		if (callback) {
			callback();
		}
	}
	else {
		soundManager.onready(function() {
			TR.wasInitialized = true;
			if (callback) {
				callback();
			}
		});
	}
};

// Sound Format is the same as soundManager's:
// http://www.schillmania.com/projects/soundmanager2/doc/#sound-properties
//{
//  id: 'mySound',
//  url: '/path/to/some.mp3',
//  autoLoad: true,
//  autoPlay: false,
//  onload: function() {
//    alert('The sound '+this.sID+' loaded!');
//  },
//  volume: 50
//}
TR.preloadSounds = function(sounds, callback) {
	var loading = 0,
		allQueued = false,
		sound = null,
		// once all sounds have loaded we need to call the callback.
		onload = function(success) {
			console.log('success:' + success);
			loading -= 1;
			console.log('loading:' + loading);
			console.log('queued:' + allQueued);
			// to trigger callback all "createSound" requests must be queued and all must be finished loading.
			if (allQueued && loading === 0 && callback) {
				allQueued = false;
				console.log('CALLBACK 1');
				callback();
			}
		};

	// create each sound.
	for (var xx = 0; xx < sounds.length; xx+=1) {
		console.log(sounds[xx].id);
		//console.log(soundManager.load(sounds[xx].id));
		sounds[xx].onload = onload;
		sound = soundManager.createSound(sounds[xx]);
		// if sound has been previously loaded don't increment counter.
		if (!sound.loaded) {
			loading += 1;
		}
		// if this is the last sound to queue then mark all as queued.
		if (xx === sounds.length - 1) {
			allQueued = true;
			// check if we reached end without waiting on any onload callbacks.
			if (loading === 0 && callback) {
				console.log('CALLBACK 2');
				callback();
			}
		}
	}

};

TR.playSound = function(id, callback) {
	console.log(id);

	TR.stopSounds();

	var sound = soundManager.play(id, {
		onfinish: function() {
			delete TR.soundsPlaying[sound];

			if (callback) {
				callback();
			}
		}
	});
	TR.soundsPlaying.push(sound);
};

TR.playSounds = function(ids, callback) {
	TR.stopSounds();
	// play each sound in order.
	if (ids && ids.length > 0) {
		TR.playSound(ids[0], function() {
			// play next audio file(s)
			TR.playSounds(ids.slice(1, ids.length), callback);
		});
	}
	else {
		if (callback) {
			callback();
		}
	}
};

TR.stopSounds = function() {
	$.each(TR.soundsPlaying, function() {
		this.stop();
	});
};

