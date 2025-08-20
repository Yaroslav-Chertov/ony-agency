class Player {
    constructor(player, isPlaying = false) {
        this.$player = player;
        if (!this.$player) return;
        this._isPlaying = isPlaying;
        this.userInteracted = false;
    }

    get isPlaying() {
        return this._isPlaying;
    }

    set isPlaying(value) {
        this._isPlaying = value;
    }

    get videoDuration() {
        return this.video.duration;
    }

    get videoCurrentTime() {
        return this.video.currentTime;
    }

    set videoCurrentTime(value) {
        this.video.currentTime = value;
    }

    init() {
        this.bgVideo = this.$player.querySelector('.video__bg');
        this.container = this.$player.querySelector('.video__container .video__cover');
        this.video = this.container.querySelector('.video__video');
        // this.backgroundVideoContainer = this.container.querySelector('.background-video'); // WARN: проверить, используется?
        this.playButton = this.$player.querySelector('[data-elt="playShowreel"]');
        this.timeline = this.$player.querySelector('[data-elt="showreelProgress"]');
        this.clock = this.$player.querySelector('[data-elt="showreelTime"]');

        this.initPlayerListeners();
        this.initTimelineListeners();

        /* для исключения автозапуска фонового видео со звуком */

        if (this.bgVideo) {
            this.bgVideo.muted = true;
            this.bgVideo.play().catch(err => {
                console.warn('Фоновое видео не удалось запустить автоматически', err);
            });
        }
    }

    initPlayerListeners() {
        /* if (this.isPlaying) this.play(); //предотвращение автоматического воспроизведения основного видео при быстрой перезагрузки странице или кэше*/
        this.togglePlay = () => {
            this.userInteracted = true;
            this.isPlaying ? this.pause() : this.play();
        };
        this.togglePlay = this.togglePlay.bind(this);
        this.container.addEventListener('click', this.togglePlay, false);
        this.endVideo = this.endVideo.bind(this);
        this.video.addEventListener('ended', this.endVideo, false);
        this.playButton.addEventListener('click', this.togglePlay, false);
        this.setCurrentTime = this.setCurrentTime.bind(this);
        this.video.addEventListener('timeupdate', this.setCurrentTime, false);
    }

    removePlayerListeners() {
        this.container.removeEventListener('click', this.togglePlay, false);
        this.video.removeEventListener('ended', this.endVideo, false);
        this.playButton.removeEventListener('click', this.togglePlay, false);
        this.video.removeEventListener(
            'timeupdate',
            this.setCurrentTime,
            false
        );
    }

    endVideo() {
        this.pause();
    }

    setCurrentTime() {
        const current = Number(this.videoCurrentTime.toFixed());
        let linelinedata = `${Math.floor(this.videoDuration / 60)}:${this.fixedNumber(
            Math.floor(this.videoDuration % 60)
        )}`;

        this.timeline.querySelector('.video__progress-line1').style.width =
            (this.videoCurrentTime / this.videoDuration) * 100 + '%';

        this.clock.textContent = this.formatTime(current) + ' / ' + linelinedata ;
    }

    formatTime(seconds) {
        return `${Math.floor(seconds / 60)}:${this.fixedNumber(
            Math.floor(seconds % 60)
        )}`;
    }

    fixedNumber(number) {
        return number < 10 ? `0${number}` : `${number}`;
    }

    initTimelineListeners() {
        this.calcGhostLineWidth = this.calcGhostLineWidth.bind(this);
        this.timeline.addEventListener(
            'mousemove',
            this.calcGhostLineWidth,
            false
        );
        this.setNeedbleCurrentTime = this.setNeedbleCurrentTime.bind(this);
        this.timeline.addEventListener(
            'click',
            this.setNeedbleCurrentTime,
            false
        );
    }

    removeTimelineListeners() {
        this.timeline.removeEventListener(
            'mousemove',
            this.calcGhostLineWidth,
            false
        );
        this.timeline.removeEventListener(
            'click',
            this.setNeedbleCurrentTime,
            false
        );
    }

    calcGhostLineWidth(event) {
        return;

        const { left } = event.target.getBoundingClientRect();
        const ghostLine = this.timeline.querySelector('.video__progress-line2');
        const percent =
            ((event.clientX - left) / this.timeline.offsetWidth) * 100 + '%';
        ghostLine.style.width = percent;
    }

    setNeedbleCurrentTime(event) {
        const { left } = event.target.getBoundingClientRect();
        console.log('left', left);

        const currentLine = this.timeline.querySelector('.video__progress-line1');
        const percent =
            ((event.clientX - left) / this.timeline.offsetWidth) * 100;
        const time = (this.videoDuration * percent) / 100;
        this.videoCurrentTime = time;
    }

    play() {
        if (!this.userInteracted) return;

        // Снимаем mute, если вдруг остался с прошлого состояния
        if (this.video.muted) {
            this.video.muted = false;
        }

        this.video.play().then((_) => {
            this.isPlaying = true;
            // this.backgroundVideoContainer.querySelector('video').pause();
            // this.backgroundVideoContainer.style.display = 'none';
            this.$player.classList.add('is-plays');
            // this.playButton.querySelector('.play__icon').classList.add('pause');
            // this.playButton.querySelector('.play__text').textContent = 'Watch Showreel';
            // this.$player.querySelector('.video__controls').classList.add('played');

            if (this.bgVideo) {
                this.bgVideo.style.display = 'none';
                /* this.bgVideo.pause?.(); // останавливает фоновое видео */
            }
        });
    }

    pause() {
        this.$player.classList.remove('is-plays');
        this.video.pause();
        this.isPlaying = false;
        // this.playButton.querySelector('.play__icon').classList.remove('pause');
        // this.playButton.querySelector('[data-elt="playShowreel"] > span').textContent = 'Watch Showreel';
        // this.$player.querySelector('.video__controls').classList.remove('played');

        /* на проде данная функция не реализована */
        /* if (this.bgVideo) {
            this.bgVideo.style.display = '';
            this.bgVideo.play?.(); //запускает фоновое видео
        } */
    }

    togglePlay() {
        this.isPlaying ? this.pause() : this.play();
    }

    destroy() {
        this.removePlayerListeners();
        this.removeTimelineListeners();
    }
}

export default class PlayerFactory {
    constructor(selector) {
        this.selector = selector;
    }

    create() {
        const players = [...document.querySelectorAll(this.selector)];
        if (players) {
            this.players = players.map((player) => new Player(player));
            this.players.forEach((obj) => obj.init());
        }
    }

    destroy() {
        if (this.players) {
            this.players.forEach((obj) => obj.destroy());
        }
    }
}

// window.players = new PlayerFactory('.video');